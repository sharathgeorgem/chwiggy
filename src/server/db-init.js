const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

mongoose.connect('mongodb://localhost/test')

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  var Items = new mongoose.Schema({
    id: ObjectId,
    name: String,
    description: String,
    price: Number,
    imageURL: String
  })
  var Orders = new mongoose.Schema({
    items: [{ type: ObjectId, ref: 'Item' }],
    date: Date,
    price: Number,
    address: String
  })
  var Users = new mongoose.Schema({
    name: String,
    cart: [{ type: ObjectId, ref: 'Item' }],
    currentOrders: [Orders],
    pastOrders: [Orders],
    addresses: [String]
  })
  var Item = mongoose.model('Item', Items)
  var Order = mongoose.model('Order', Orders)
  var User = mongoose.model('User', Users)

  var Wine = new Item({ name: 'Red Red Wine', description: 'Goes to your head', price: 400, imageURL: 'i.pinimg.com/736x/3b/68/82/3b688219528458e3eb06783c05c9f22f.jpg' })
  var Coffee = new Item({ name: 'Coffee', description: 'The taste of morning', price: 50, imageURL: 'www.walkaboutflorence.com/sites/default/files/styles/news_detail/public/Coffee_Caffe__Cappuccino_Latte_Florence_Italy.jpg' })
  var Chocolate = new Item({ name: "Maulik's Chocolate", description: '100% Cocoa', price: 100, imageURL: 'www.chocablog.com/wp-content/uploads/2008/09/chocolat-bonnat-2.jpg' })
  var Pizza = new Item({ name: 'Happy Pizza', description: 'Not legal in all territories, conditions apply', price: 200, imageURL: '2.bp.blogspot.com/_Vh8ATwGRVqo/SvACUfs2A-I/AAAAAAAAKVk/KHyl0oKRNRA/s320/happy+pizza.JPG' })
  var Jadesh = new User({ name: 'Jadesh Shetty', cart: [], currentOrders: [], pastOrders: [], addresses: ['2698, 19th Main, 5th Cross, Indiranagar HAL 2nd Stage, Bangalore - 560008'] })

  Wine.save().then(console.log)
  Coffee.save().then(console.log)
  Chocolate.save().then(console.log)
  Pizza.save().then(console.log)
  Jadesh.save().then(console.log)
})
