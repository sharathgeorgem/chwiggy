const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Mongoose Connected')
})

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
  available: Boolean
})
const AddressSchema = createSchema({
  latitude: Number,
  longitude: Number,
  value: String,
  apartment: Number,
  landmark: String
})
const OrderSchema = createSchema({
  restaurant: { type: ObjectId, ref: 'Restaurant' },
  items: [{ type: ObjectId, ref: 'Item' }],
  timePlaced: Date,
  accepted: Boolean,
  timeFulfilled: Date,
  deliverer: { type: ObjectId, ref: 'Deliverer' },
  price: Number,
  address: AddressSchema
})
const UserSchema = createSchema({
  name: String,
  cart: [{ type: ObjectId, ref: 'Item' }],
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
  cuisines: [String],
  phone: [String],
  menu: [{ type: ObjectId, ref: 'Item' }],
  currentOrders: [{ type: ObjectId, ref: 'Order' }],
  pastOrders: [{ type: ObjectId, ref: 'Order' }]
})
const DelivererSchema = createSchema({
  name: String,
  score: Number,
  votes: Number
})

const Item = mongoose.model('Item', ItemSchema)
const Order = mongoose.model('Order', OrderSchema)
// const Address = mongoose.model('Address', AddressSchema)
const User = mongoose.model('User', UserSchema)
const Restaurant = mongoose.model('Restaurant', RestaurantSchema)
const Deliverer = mongoose.model('Deliverer', DelivererSchema)

function costOfCart (cart) {
  let cost = 0
  for (let item of cart) {
    cost += item.price
  }
  return cost
}

exports.getItems = async function () {
  return Item.find()
}

exports.getCart = async function (userId) {
  let res = await User.findById(userId).populate('cart')
  return { cart: res.cart, total: costOfCart(res.cart) }
}

exports.getAddresses = async function (userId) {
  let res = await User.findById(userId)
  return res.addresses
}

exports.addToCart = async function (userId, item) {
  let user = await User.findById(userId)
  user.cart.push(item)
  let res = await user.save().populate('cart')
  return { cart: res.cart, total: costOfCart(res.cart) }
}

exports.removeFromCart = async function (userId, item) {
  let user = await User.findById(userId)
  user.cart.splice(user.cart.indexOf(item), 1)
  let res = await user.save().populate('cart')
  return { cart: res.cart, total: costOfCart(res.cart) }
}

exports.addAddress = async function (userId, address) { // need to change
  let user = await User.findById(userId)
  user.addresses.push(address)
  let res = await user.save()
  return res.addresses
}

exports.submitOrder = async function (userId, address) {
  let user = await User.findById(userId).populate('cart')
  let price = costOfCart(user.cart)
  let order = new Order({ items: user.cart, date: Date.now(), total: price, address: address })
  user.cart = []
  user.currentOrders.push(order)
  return user.save()
}
