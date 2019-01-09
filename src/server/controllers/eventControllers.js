const model = require('../model')

exports.placeOrder = async function (userId, addressId, connections) {
  let order = await model.submitOrder(userId, addressId).catch(console.log)
  connections[order.restaurant].emit('newOrder', order)
}

exports.acceptOrder = async function (orderId, connections) {
  console.log('Order accepted')
  let order = await model.acceptOrder(orderId).catch(console.log)
  Object.keys(connections.deliverers).forEach(id => connections.deliverers[id].emit('newOrder', order)) // change to nearby deliverers
  connections[order.customer].emit('orderAccepted', orderId)
}

exports.acceptDelivery = async function (delivererId, orderId, connections) {
  console.log('Delivery accepted')
  let order = await model.acceptDelivery(delivererId, orderId).catch(console.log)
  if (order) {
    let deliverer = await model.getDelivererName(delivererId).catch(console.log)
    connections[order.customer].emit('delivererAssigned', orderId, deliverer)
    Object.entries(connections.deliverers).forEach(([key, value]) => value.emit('orderTaken'))
    // only emit event to previously messaged deliverers
  }
}

exports.arrivedRestaurant = async function (orderId, connections) {
  let order = await model.getOrderDetails(orderId).catch(console.log)
  connections[order.restaurant].emit('delivererArrivedRestaurant', orderId, order.deliverer)
  connections[order.customer].emit('delivererArrivedRestaurant', orderId)
}

exports.pickedUp = async function (orderId, connections) {
  console.log('Order picked up')
  let order = await model.pickedUp(orderId).catch(console.log)
  connections[order.customer].emit('orderPickedUp', orderId)
  connections[order.restaurant].emit('orderPickedUp', orderId)
}

exports.delivered = async function (orderId, connections) {
  console.log('Order delivered')
  let order = await model.delivered(orderId).catch(console.log)
  connections[order.customer].emit('orderDelivered', orderId)
}

exports.updateLocation = async function (delivererId, location, connections) {
  // store in connections and emit to all relevant customers
}
