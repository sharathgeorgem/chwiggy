const model = require('../model')

exports.placeOrder = async function (userId, addressId, connections) {
  let order = await model.submitOrder(userId, addressId)
  connections[order.restaurant].emit('newOrder', order)
}

exports.acceptOrder = async function (orderId, connections) {
  let order = await model.acceptOrder(orderId)
  Object.keys(connections.deliverers).forEach(id => connections.deliverers[id].emit('newOrder', order)) // change to nearby deliverers
  connections[order.customer].emit('orderAccepted', orderId)
}

exports.acceptDelivery = async function (delivererId, orderId, connections) {
  let order = await model.acceptDelivery(delivererId, orderId)
  if (order) {
    let deliverer = await model.getDelivererName(delivererId)
    connections[order.customer].emit('delivererAssigned', orderId, deliverer)
  } else connections.deliverers[delivererId].emit('orderAlreadyAssigned')
}

exports.arrivedRestaurant = async function (orderId, connections) {
  let order = model.getOrderDetails(orderId)
  connections[order.restaurant].emit('delivererArrivedRestaurant', orderId, order.deliverer)
  connections[order.customer].emit('delivererArrivedRestaurant', orderId)
}

exports.pickedUp = async function (orderId, connections) {
  let order = model.pickedUp(orderId)
  connections[order.customer].emit('orderPickedUp', orderId)
}

exports.delivered = async function (orderId, connections) {
  let order = model.delivered(orderId)
  connections[order.customer].emit('orderDelivered', orderId)
}

exports.updateLocation = async function (delivererId, location, connections) {
  // store in connections and emit to all relevant customers
}
