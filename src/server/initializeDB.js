const http = require('./utilities/promisifiedHTTP')

const domain = 'http://localhost:8000'

async function addUser (name) {
  return http.request('http', 'POST', domain, 'user/new', { name: name })
}

async function addDeliverer (name) {
  return http.request('http', 'POST', domain, 'deliverer/new', { name: name })
}

async function addRestaurant (details) {
  return http.request('http', 'POST', domain, 'restaurant/new', details)
}

async function addItem (details, category) {
  return http.request('http', 'POST', domain, 'items/new', { item: details, category: category })
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
    cuisines: ['Beverages', 'Juices', 'Ice Cream']
  })

  await addItem({
    name: 'Red Red Wine',
    description: 'Goes to your head',
    price: 400,
    img: 'http://i.pinimg.com/736x/3b/68/82/3b688219528458e3eb06783c05c9f22f.jpg',
    available: true,
    restaurant: res.id
  }, 'Beverages')
  await addItem({
    name: 'Coffee',
    description: 'Pa pa ra pa pa ra ra, pa pa ra pa pa ra ra - Nescafe!',
    price: 50,
    img: 'http://www.walkaboutflorence.com/sites/default/files/styles/news_detail/public/Coffee_Caffe__Cappuccino_Latte_Florence_Italy.jpg',
    available: true,
    restaurant: res.id
  }, 'Beverages')
  await addItem({
    name: "Maulik's Chocolate",
    description: '100% Cocoa',
    price: 150,
    img: 'http://www.chocablog.com/wp-content/uploads/2008/09/chocolat-bonnat-2.jpg',
    available: true,
    restaurant: res.id
  }, 'Snacks')
  await addItem({
    name: 'Happy Pizza',
    description: 'Not legal in all territories. Conditions apply.',
    price: 200,
    img: 'http://2.bp.blogspot.com/_Vh8ATwGRVqo/SvACUfs2A-I/AAAAAAAAKVk/KHyl0oKRNRA/s320/happy+pizza.JPG',
    available: true,
    restaurant: res.id
  }, 'Main Courses')
}

setupDummyData()
