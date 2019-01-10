const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// Connect to database

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Mongoose Connected')
})

// Schemas

function createSchema (contents) {
  let schema = new mongoose.Schema(contents)
  schema.virtual('id').get(function () { return this._id })
  schema.set('toObject', { virtuals: true })
  schema.set('toJSON', { virtuals: true })
  return schema
}

const ItemSchema = createSchema({
  name: String,
  description: String,
  price: Number,
  img: String,
  available: Boolean,
  restaurant: { type: ObjectId, ref: 'Restaurant' }
})
const AddressSchema = createSchema({
  latitude: Number,
  longitude: Number,
  value: String,
  apartment: String,
  landmark: String
})
const OrderSchema = createSchema({
  customer: { type: ObjectId, ref: 'User' },
  restaurant: { type: ObjectId, ref: 'Restaurant' },
  items: [{ item: { type: ObjectId, ref: 'Item' }, quantity: Number }],
  timePlaced: Date,
  accepted: Boolean,
  timeFulfilled: Date,
  timeDelivered: Date,
  deliverer: { type: ObjectId, ref: 'Deliverer' },
  total: Number,
  address: AddressSchema
})
const UserSchema = createSchema({
  name: String,
  cart: [{ item: { type: ObjectId, ref: 'Item' }, quantity: Number }],
  currentOrders: [{ type: ObjectId, ref: 'Order' }],
  pastOrders: [{ type: ObjectId, ref: 'Order' }],
  addresses: { home: AddressSchema, work: AddressSchema, others: [AddressSchema] }
})
const RestaurantSchema = createSchema({
  name: String,
  address: AddressSchema,
  cost: Number,
  score: Number,
  votes: Number,
  thumb: String,
  img: String,
  cuisines: [String],
  menu: [{ category: String, items: [{ type: ObjectId, ref: 'Item' }] }],
  currentOrders: [{ type: ObjectId, ref: 'Order' }],
  pastOrders: [{ type: ObjectId, ref: 'Order' }]
})
const DelivererSchema = createSchema({
  name: String,
  score: Number,
  votes: Number,
  currentOrders: [{ type: ObjectId, ref: 'Order' }]
})

// Models

const Item = mongoose.model('Item', ItemSchema)
const Order = mongoose.model('Order', OrderSchema)
const Address = mongoose.model('Address', AddressSchema)
const User = mongoose.model('User', UserSchema)
const Restaurant = mongoose.model('Restaurant', RestaurantSchema)
const Deliverer = mongoose.model('Deliverer', DelivererSchema)

// Helper functions

function costOfCart (cart) {
  let cost = 0
  for (let itemType of cart) {
    cost += itemType.item.price * itemType.quantity
  }
  return cost
}

function getAddressFromId (user, id) {
  if (user.addresses.home._id.toString() === id) {
    return user.addresses.home
  } if (user.addresses.work._id.toString() === id) {
    return user.addresses.work
  } return user.addresses.others[user.addresses.others.findIndex(obj => obj._id.toString() === id)]
}

// Exported methods

exports.getDummyUser = async function () {
  let users = await User.find()
  return users[0].id
}

exports.getDummyRestaurant = async function () {
  let restaurants = await Restaurant.find()
  return restaurants[0].id
}

exports.getDummyDeliverer = async function () {
  let deliverers = await Deliverer.find()
  return deliverers[0].id
}

exports.addUser = async function (name) {
  let user = new User({ name: name, cart: [], currentOrders: [], pastOrders: [], addresses: { home: {}, work: {}, others: [] } })
  return user.save()
}

exports.addRestaurant = async function (restaurantDetails) {
  let address = new Address(restaurantDetails.address)
  let restaurant = new Restaurant({ name: restaurantDetails.name, address: address, cost: restaurantDetails.cost, score: restaurantDetails.score, votes: restaurantDetails.votes, cuisines: restaurantDetails.cuisines, phone: restaurantDetails.phone, menu: [], currentOrders: [], pastOrders: [] })
  return restaurant.save()
}

exports.addDeliverer = async function (name) {
  let deliverer = new Deliverer({ name: name, score: 0, votes: 0, currentOrders: [] })
  return deliverer.save()
}

exports.addItem = async function (itemDetails, category) {
  let item = new Item(itemDetails)
  await item.save()
  let restaurant = await Restaurant.findById(itemDetails.restaurant)
  let index = restaurant.menu.findIndex(val => val.category === category)
  if (index >= 0) {
    restaurant.menu[index].items.push(item.id)
  } else restaurant.menu.push({ category: category, items: [item.id] })
  await restaurant.save()
  return item
}

exports.getRestaurants = async function () {
  return Restaurant.find()
}

exports.getItems = async function () {
  let res = await Restaurant.find().populate('menu.items')
  return res[0].menu
}

exports.getCart = async function (userId) {
  let res = await User.findById(userId).populate('cart.item')
  return { cart: res.cart, total: costOfCart(res.cart) }
}

exports.getAddresses = async function (userId) {
  let res = await User.findById(userId)
  return res.addresses
}

exports.getDelivererName = async function (delivererId) {
  let res = await Deliverer.findById(delivererId)
  return res.name
}

exports.getOrderDetails = async function (orderId) {
  return Order.findById(orderId)
}

exports.addToCart = async function (userId, item) {
  let user = await User.findById(userId)
  let index = user.cart.findIndex(itemType => itemType.item === item)
  if (index < 0) {
    user.cart.push({ item: item, quantity: 1 })
  } else {
    user.cart[index].quantity++
  }
  let res = await user.save().populate('cart.item')
  return { cart: res.cart, total: costOfCart(res.cart) }
}

exports.removeFromCart = async function (userId, item) {
  let user = await User.findById(userId)
  let index = user.cart.findIndex(itemType => itemType.item === item)
  if (user.cart[index].quantity > 1) {
    user.cart[index].quantity--
  } else {
    user.cart.splice(index, 1)
  }
  let res = await user.save().populate('cart.item')
  return { cart: res.cart, total: costOfCart(res.cart) }
}

exports.setCart = async function (userId, cartContents) {
  let user = await User.findOneAndUpdate({ _id: userId }, { cart: cartContents }).populate('cart.item')
  return { cart: user.cart, total: costOfCart(user.cart) }
}

exports.addAddress = async function (userId, addressType, addressDetails) {
  let address = new Address(addressDetails)
  await address.save()
  let user = await User.findById(userId)
  if (addressType === 'home' || addressType === 'work') {
    user.addresses[addressType] = address
  } else user.addresses.others.push(address)
  let res = await user.save()
  return res.addresses
}

exports.submitOrder = async function (userId, addressId) {
  let user = await User.findById(userId).populate('cart.item')
  let price = costOfCart(user.cart)
  let address = getAddressFromId(user, addressId)

  let restaurantId = user.cart[0].item.restaurant
  let order = new Order({ customer: userId, restaurant: restaurantId, items: user.cart, timePlaced: Date.now(), accepted: false, total: price, address: address })
  await order.save()

  user.cart = []
  user.currentOrders.push(order)
  user = await user.save()

  let restaurant = await Restaurant.findById(restaurantId)
  restaurant.currentOrders.push(order)
  restaurant = await restaurant.save()

  return order
}

exports.acceptOrder = async function (orderId) {
  return Order.findOneAndUpdate({ _id: orderId }, { accepted: true })
}

exports.acceptDelivery = async function (deliverer, orderId) {
  let order = await Order.findById(orderId)
  if (order.deliverer) return false
  order['deliverer'] = deliverer
  return order.save()
}

exports.pickedUp = async function (orderId) {
  let order = await Order.findOneAndUpdate({ _id: orderId }, { timeFulfilled: Date.now() })
  let restaurant = await Restaurant.findById(order.restaurant)
  restaurant.currentOrders.splice(restaurant.currentOrders.indexOf(orderId), 1)
  restaurant.pastOrders.push(order)
  await restaurant.save()
  return order
}

exports.delivered = async function (orderId) {
  let order = await Order.findOneAndUpdate({ _id: orderId }, { timeDelivered: Date.now() })
  let user = await User.findById(order.customer)
  user.currentOrders.splice(user.currentOrders.indexOf(orderId), 1)
  user.pastOrders.push(order)
  await user.save()

  let deliverer = await Deliverer.findById(order.deliverer)
  deliverer.currentOrders.splice(deliverer.currentOrders.indexOf(orderId), 1)
  await deliverer.save()

  return order
}
