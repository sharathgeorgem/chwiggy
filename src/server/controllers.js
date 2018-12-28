const model = require('./model')

exports.getItems = async function (req, res) {
  let result = await model.getItems()
  res.send(result)
}

exports.getCart = async function (req, res) {
  let result = await model.getCart(req.params.userId)
  res.send(result)
}

exports.getAddresses = async function (req, res) {
  let result = await model.getAddresses(req.params.userId)
  res.send(result)
}

exports.addItemToCart = async function (req, res) {
  let result = await model.addToCart(req.params.userId, req.params.itemId)
  res.send(result)
}

exports.removeItemFromCart = async function (req, res) {
  let result = await model.removeFromCart(req.params.userId, req.params.itemId)
  res.send(result)
}

exports.addAddress = async function (req, res) {
  let result = await model.addAddress(req.params.userId, req.params.address)
  res.send(result)
}

exports.submitOrder = async function (req, res) {
  let result = await model.submitOrder(req.params.userId, req.params.address)
  res.send(result)
}
