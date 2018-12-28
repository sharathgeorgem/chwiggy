const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

mongoose.connect('mongodb://localhost/test')

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  var Items = new mongoose.Schema({
    id: ObjectId,
    name: String,
    price: Number
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

  var Wine = new Item({ name: 'Wine', price: 400 })
  var Jadesh = new User({ name: 'Jadesh Shetty', cart: [], currentOrders: [], pastOrders: [], addresses: ['2698, 19th Main, 5th Cross, Indiranagar HAL 2nd Stage, Bangalore - 560008'] })

  Wine.save(function (err, Wine) {
    if (err) return console.error(err)
    console.log(Wine)
  })
  Jadesh.save(function (err, Jadesh) {
    if (err) return console.error(err)
    console.log(Jadesh)
  })
})
