const http = require('../utilities/promisifiedHTTP')

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
    name: 'Heineken',
    description: 'Probably the best beer in the world',
    price: 450,
    img: 'https://www.underconsideration.com/brandnew/archives/heineken_00_hero_shot_02.jpg',
    available: true,
    restaurant: res.id
  }, 'Beverages')
  await addItem({
    name: 'Ramune',
    description: 'Finely aged for the better part of a decade',
    price: 1073,
    img: 'https://www.domechan.com/shop/1424-thickbox_default/ramune-working-lemonade-japanese-taste-pineapple-200-ml.jpg',
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
    name: 'Choco Cornet',
    description: 'Which side will YOU eat it from?',
    price: 125,
    img: 'https://images.japancentre.com/images/pics/12217/large/3566-chocolate-cornet-side.jpg?1469571297',
    available: true,
    restaurant: res.id
  }, 'Snacks')
  await addItem({
    name: 'Microwaved Banana',
    description: 'Delivered from the future just for you',
    price: 25,
    img: 'https://img-global.cpcdn.com/001_recipes/5325406057005056/640x640sq70/photo.jpg',
    available: true,
    restaurant: res.id
  }, 'Snacks')
  await addItem({
    name: 'Soy Buttered Potatoes',
    description: '',
    price: 50,
    img: 'http://justhungry.com/files/images/shinjagashouyubutter.jpg',
    available: true,
    restaurant: res.id
  }, 'Snacks')
  await addItem({
    name: 'Cheese Lemon Custard Chiffon Pie',
    description: 'Now with separate custard cream and cheese lemon chiffon layers!',
    price: 225,
    img: 'https://www.kcet.org/sites/kl/files/atoms/article_atoms/www.kcet.org/living/food/assets/images/lemonchiffonpie.png',
    available: true,
    restaurant: res.id
  }, 'Dessert')
  await addItem({
    name: 'Tomato Sorbet',
    description: 'Made with leftover fresh garden tomatoes',
    price: 125,
    img: 'http://tendingmygarden.com/wp-content/uploads/2010/08/L1690384tomsherbet-in-small-crystal.png',
    available: true,
    restaurant: res.id
  }, 'Dessert')
  await addItem({
    name: 'The Cake',
    description: '...is a lie',
    price: 750,
    img: 'https://i.kym-cdn.com/photos/images/original/000/115/357/portal-cake.jpg',
    available: false,
    restaurant: res.id
  }, 'Dessert')
  await addItem({
    name: 'Herring and Pumpkin Pie',
    description: "Grandma's secret recipe",
    price: 650,
    img: 'http://comicpoplibrary.com/wp-content/uploads/2011/06/herring-and-pumpkin-pie.jpg',
    available: false,
    restaurant: res.id
  }, 'Dessert')
  await addItem({
    name: 'Omurice',
    description: 'Omelette rice with ketchup. Made with love!',
    price: 100,
    img: 'https://sociorocketnewsen.files.wordpress.com/2014/06/kr-7.png',
    available: true,
    restaurant: res.id
  }, 'Main Courses')
  await addItem({
    name: 'Chocolate Curry Rice',
    description: 'Made with beloved turmeric, green jalapenos, cinnamon & cardamom, impossible paprika, green coriander, and now garam masala. We present to you delicious curry!',
    price: 300,
    img: 'https://japanesecurry.weebly.com/uploads/1/4/6/5/14652372/5502478_orig.jpg?0',
    available: true,
    restaurant: res.id
  }, 'Main Courses')
  await addItem({
    name: 'Happy Pizza',
    description: 'Not legal in all territories. Conditions apply. Happiness not guaranteed.',
    price: 200,
    img: 'http://2.bp.blogspot.com/_Vh8ATwGRVqo/SvACUfs2A-I/AAAAAAAAKVk/KHyl0oKRNRA/s320/happy+pizza.JPG',
    available: true,
    restaurant: res.id
  }, 'Main Courses')
}

setupDummyData()
