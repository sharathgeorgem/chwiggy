const model = require('./model')

exports.placeOrder = async function (userId, addressId, connections) {
  let order = await model.submitOrder(userId, addressId)
  connections[order.restaurant].emit('newOrder', order)
}

exports.acceptOrder = async function (orderId, connections) {
  // set order to accepted
  // emit to nearby deliverers
}

exports.acceptDelivery = async function (delivererId, orderId, connections) {
  // set deliverer in order if no deliverer
  // emit to customer of order
  // else emit to deliverer too bad
}

exports.arrivedRestaurant = async function (orderId, connections) {
  // emit to restaurant and customer
}

exports.pickedUp = async function (orderId, connections) {
  // update time fulfilled in order, move to restaurant past orders
  // emit to customer
}

exports.delivered = async function (orderId, connections) {
  // update db regarding order
  // emit to customer
}

exports.updateLocation = async function (delivererId, location, connections) {
  // emit to all relevant customers
}
