const io = require('socket.io-client')

const http = require('../utilities/promisifiedHTTP')

const domain = 'http://localhost:8000'

async function makeOrder (id, socket) {
  let res = await http.getRequest(domain, 'items')
  let cart = res.menu.map(item => Object.assign({}, { item: item.id, quantity: 1 }))
  res = await http.request('POST', domain, `user/cart/${id}`, { cart: cart } )
  let address = {
    latitude: 12.972240,
    longitude: 77.646410,
    value: '2698, 19th Main Rd, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008',
    apartment: 'Downstairs lobby',
    landmark: 'Near temple'
  }
  res = await http.request('PUT', domain, `user/addresses/${id}/home`, { address: address})
  socket.emit('placeOrder', id, res.addresses.home.id)
}

async function initializeConnection () {
  let socket = io.connect(domain)
  let res = await http.getRequest(domain, 'user/dummy')
  socket.emit('identify', res.id)
  setTimeout(() => makeOrder(res.id, socket), 1000)
  socket.on('orderAccepted', () => console.log('Order Accepted'))
  socket.on('delivererAssigned', () => console.log('Deliverer Assigned'))
  socket.on('delivererArrivedRestaurant', () => console.log('Deliverer Arrived at Restaurant'))
  socket.on('orderPickedUp', () => console.log('Order picked up, tasty food is on its way!'))
  socket.on('orderDelivered', () => console.log('Order delivered, enjoy!'))
}

initializeConnection()
