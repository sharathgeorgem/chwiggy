const http = require('http')

const domain = 'http://localhost:8000'

function serverRequest (mode, route, body) {
  console.log('Submitting request')
  return new Promise((resolve, reject) => {
    let req = http.request(`${domain}/${route}`, { method: mode })
    req.setHeader('Content-Type', 'application/json')
    req.setHeader('Transfer-Encoding', 'chunked')
    req.write(JSON.stringify(body), 'utf8')
    req.end()
    req.on('response', res => {
      let data = ''
      res.on('data', chunk => { data += chunk })
      res.on('end', () => resolve(JSON.parse(data)))
    })
    req.on('error', (err) => reject(err))
  })
}

async function addUser (name) {
  return serverRequest('POST', 'user/new', {name: name})
}

async function addDeliverer (name) {
  return serverRequest('POST', 'deliverer/new', {name: name})
}

async function addRestaurant (details) {
  return serverRequest('POST', 'restaurant/new', details)
}

async function addItem (details) {
  return serverRequest('POST', 'items/new', details)
}

async function setupDummyData () {
  addUser('Hungry Maulik')
  addDeliverer('Jadesh Shetty')

  let res = await addRestaurant({
    name: 'Lassi Shop',
    address: {
      latitude: 12.9714324460,
      longitude: 77.6349125057,
      value: '3217, 13th Cross, Indiranagar, Bangalore',
      apartment: '',
      landmark: ''
    },
    cost: 100,
    cuisines: ['Beverages', 'Juices', 'Ice Cream'],
    phone: ['9739559814']
  })
  
  addItem({
    name: 'Red Red Wine',
    description: 'Goes to your head',
    price: 400,
    img: 'http://i.pinimg.com/736x/3b/68/82/3b688219528458e3eb06783c05c9f22f.jpg',
    available: true,
    restaurant: res.id
  })
  addItem({
    name: 'Coffee',
    description: 'Pa pa ra pa pa ra ra, pa pa ra pa pa ra ra - Nescafe!',
    price: 50,
    img: 'http://www.walkaboutflorence.com/sites/default/files/styles/news_detail/public/Coffee_Caffe__Cappuccino_Latte_Florence_Italy.jpg',
    available: true,
    restaurant: res.id
  })
  addItem({
    name: "Maulik's Chocolate",
    description: '100% Cocoa',
    price: 150,
    img: 'http://www.chocablog.com/wp-content/uploads/2008/09/chocolat-bonnat-2.jpg',
    available: true,
    restaurant: res.id
  })
  addItem({
    name: 'Happy Pizza',
    description: 'Not legal in all territories. Conditions apply.',
    price: 200,
    img: 'http://2.bp.blogspot.com/_Vh8ATwGRVqo/SvACUfs2A-I/AAAAAAAAKVk/KHyl0oKRNRA/s320/happy+pizza.JPG',
    available: true,
    restaurant: res.id
  })
}

setupDummyData()
