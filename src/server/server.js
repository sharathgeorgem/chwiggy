const express = require('express')
const cors = require('cors')
const io = require('./socket.io')

const router = require('./routes')

const port = 8000
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', router)

const server = app.listen(port, function () {
  console.log(`Server listening on port ${port}`)
})

io.listen(server)

var connections = {}

function addConnection (id, client) {
  connections[id] = client
}

io.on('connection', client => {
  console.log('Connection made')
  client.on('identify', id => addConnection(id, client))
  client.on('acceptOrder') // set order to accepted, emit event to deliverers
  client.on('acceptDelivery')
  client.on('arrivedAtRestaurant')
  client.on('pickedUp')
  client.on('delivered')
  client.on('updateLocation')
})
