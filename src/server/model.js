const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Mongoose Connected')
})

const Items = new mongoose.Schema({
  id: ObjectId,
  name: String,
  description: String,
  price: Number,
  imageURL: String,
  available: Boolean
})
const Orders = new mongoose.Schema({
  items: [{ type: ObjectId, ref: 'Item' }],
  date: Date,
  price: Number,
  address: String
})
const Users = new mongoose.Schema({
  name: String,
  cart: [{ type: ObjectId, ref: 'Item' }],
  currentOrders: [Orders],
  pastOrders: [Orders],
  addresses: [String]
})

const Item = mongoose.model('Item', Items)
const Order = mongoose.model('Order', Orders)
const User = mongoose.model('User', Users)

exports.getItems = async function () {
  return Item.find()
}

exports.getCart = async function (userId) {
  let res = await User.findById(userId).populate('cart')
  return res.cart
}

exports.getAddresses = async function (userId) {
  let res = await User.findById(userId)
  return res.addresses
}

exports.addToCart = async function (userId, item) {
  let user = await User.findById(userId)
  user.cart.push(item)
  let res = await user.save()
  return res.cart
}

exports.removeFromCart = async function (userId, item) {
  let user = await User.findById(userId)
  user.cart.splice(user.cart.indexOf(item), 1)
  let res = await user.save()
  return res.cart
}

exports.addAddress = async function (userId, address) {
  let user = await User.findById(userId)
  user.addresses.push(address)
  let res = await user.save()
  return res.addresses
}

function costOfCart (cart) {
  let cost = 0
  for (let item of cart) {
    cost += item.price
  }
  return cost
}

exports.submitOrder = async function (userId, address) {
  let user = await User.findById(userId).populate('cart')
  let price = costOfCart(user.cart)
  let order = new Order({ items: user.cart, date: Date.now(), price: price, address: address })
  user.cart = []
  user.currentOrders.push(order)
  return user.save()
}
