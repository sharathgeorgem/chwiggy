const express = require('express')
const cors = require('cors')
const io = require('socket.io')

const router = require('./routes')
const eventControllers = require('./controllers/eventControllers')

const port = 8000
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', router)

const server = app.listen(port, function () {
  console.log(`Server listening on port ${port}`)
})

let serverSocket = io.listen(server)

var connections = {
  deliverers: {}
}

function addConnection (id, client) {
  connections[id] = client
}

function addDeliverer (id, client) {
  connections.deliverers[id] = client
}

serverSocket.on('connection', client => {
  console.log('Connection made')
  client.on('identify', id => addConnection(id, client))
  client.on('identifyDeliverer', id => addDeliverer(id, client))
  client.on('placeOrder', (userId, addressId) => eventControllers.placeOrder(userId, addressId, connections))
  client.on('acceptOrder', (orderId) => eventControllers.acceptOrder(orderId, connections))
  client.on('acceptDelivery', (delivererId, orderId) => eventControllers.acceptDelivery(delivererId, orderId, connections))
  client.on('arrivedAtRestaurant', (orderId) => eventControllers.arrivedRestaurant(orderId, connections))
  client.on('pickedUp', (orderId) => eventControllers.pickedUp(orderId, connections))
  client.on('delivered', (orderId) => eventControllers.delivered(orderId, connections))
  client.on('updateLocation', (delivererId, location) => eventControllers.updateLocation(delivererId, location, connections))
})
