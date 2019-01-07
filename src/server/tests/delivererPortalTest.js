const io = require('socket.io-client')

const http = require('../utilities/promisifiedHTTP')

const domain = 'http://localhost:8000'

function handleNewOrder (order, id, socket) {
  console.log('New order is', order)
  setTimeout(() => socket.emit('acceptDelivery', id, order.id), 1000)
  setTimeout(() => socket.emit('arrivedAtRestaurant', order.id), 4000)
  setTimeout(() => socket.emit('pickedUp', order.id), 7000)
  setTimeout(() => socket.emit('delivered', order.id), 10000)
}

async function initializeConnection () {
  let socket = io.connect(domain)
  let res = await http.getRequest(domain, 'deliverer/dummy')
  socket.emit('identifyDeliverer', res.id)
  socket.on('newOrder', order => handleNewOrder(order, res.id, socket))
}

initializeConnection()
