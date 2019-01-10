const model = require('../model')

exports.getDummyUser = async function (req, res) {
  let result = await model.getDummyUser().catch(console.log)
  res.send({ id: result })
}

exports.getDummyRestaurant = async function (req, res) {
  let result = await model.getDummyRestaurant().catch(console.log)
  res.send({ id: result })
}

exports.getDummyDeliverer = async function (req, res) {
  let result = await model.getDummyDeliverer().catch(console.log)
  res.send({ id: result })
}

exports.addUser = async function (req, res) {
  let result = await model.addUser(req.body.name).catch(console.log)
  res.send(result)
}

exports.addRestaurant = async function (req, res) {
  let result = await model.addRestaurant(req.body).catch(console.log)
  res.send(result)
}

exports.addDeliverer = async function (req, res) {
  let result = await model.addDeliverer(req.body.name).catch(console.log)
  res.send(result)
}

exports.addItem = async function (req, res) {
  let result = await model.addItem(req.body.item, req.body.category).catch(console.log)
  res.send(result)
}

exports.getRestaurants = async function (req, res) {
  let result = await model.getRestaurants().catch(console.log)
  res.send(result)
}

exports.getItems = async function (req, res) {
  let result = await model.getItems().catch(console.log)
  res.send({ menu: result })
}

exports.getCart = async function (req, res) {
  let result = await model.getCart(req.params.userId).catch(console.log)
  res.send(result)
}

exports.getAddresses = async function (req, res) {
  let result = await model.getAddresses(req.params.userId).catch(console.log)
  res.send({ addresses: result })
}

exports.addItemToCart = async function (req, res) {
  let result = await model.addToCart(req.params.userId, req.params.itemId).catch(console.log)
  res.send(result)
}

exports.removeItemFromCart = async function (req, res) {
  let result = await model.removeFromCart(req.params.userId, req.params.itemId).catch(console.log)
  res.send(result)
}

exports.addAddress = async function (req, res) { // need to add geocoding as middleware here
  let result = await model.addAddress(req.params.userId, req.params.addressType, req.body.address).catch(console.log)
  res.send({ addresses: result })
}

exports.setCart = async function (req, res) {
  let result = await model.setCart(req.params.userId, req.body.cart).catch(console.log)
  res.send(result)
}
