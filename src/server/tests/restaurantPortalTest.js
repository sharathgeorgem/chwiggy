const io = require('socket.io-client')

const http = require('../utilities/promisifiedHTTP')

const domain = 'http://localhost:8000'

function handleNewOrder (order, socket) {
  console.log('New order is', order)
  setTimeout(() => socket.emit('acceptOrder', order.id), 5000)
}

function onOrderFulfilled (orderId) {
  console.log(`Order ${orderId} fulfilled`)
}

async function initializeConnection () {
  let socket = io.connect(domain)
  let res = await http.getRequest(domain, 'restaurant/dummy')
  socket.emit('identify', res.id)
  socket.on('newOrder', order => handleNewOrder(order, socket))
  socket.on('delivererArrivedRestaurant', (orderId, delivererId) => console.log(`${delivererId} waiting to pick up ${orderId}`))
  socket.on('orderPickedUp', onOrderFulfilled)
}

initializeConnection()
