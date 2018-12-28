const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

mongoose.connect('mongodb://localhost/test')
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Mongoose Connected')
})

var Items = new mongoose.Schema({
  id: ObjectId,
  name: String,
  price: Number
})
var Orders = new mongoose.Schema({
  items: [{ type: ObjectId, ref: 'Item' }],
  date: Date,
  price: Number,
  address: String
})
var Users = new mongoose.Schema({
  name: String,
  cart: [{ type: ObjectId, ref: 'Item' }],
  currentOrders: [Orders],
  pastOrders: [Orders],
  addresses: [String]
})
var Item = mongoose.model('Item', Items)
var Order = mongoose.model('Order', Orders)
var User = mongoose.model('User', Users)

exports.getCart = async function (userId) {
  let res = await User.findById(userId)
  return res.cart
}

exports.getAddresses = async function (userId) {
  let res = await User.findById(userId)
  return res.addresses
}

exports.addToCart = async function (userId, item) {
  let user = await User.findById(userId)
  user.cart.push(item)
  user.save(function (err, res) {
    if (err) return false
    return res.cart
  })
}

exports.removeFromCart = async function (userId, item) {
  let user = await User.findById(userId)
  user.cart.splice(user.cart.indexOf(item), 1)
  user.save(function (err, res) {
    if (err) return false
    return res.cart
  })
}

exports.addAddress = async function (userId, address) {
  let user = await User.findById(userId)
  user.addresses.push(address)
  user.save(function (err, res) {
    if (err) return false
    return res.addresses
  })
}

exports.submitOrder = async function (userId, address) {
  let user = await User.findById(userId)
  let order = new Order({ items: user.cart, date: Date.now(), price: 0, address: address })
  user.cart = []
  user.currentOrders.push(order)
  user.save(function (err, res) {
    if (err) return false
    return res.currentOrders
  })
}
