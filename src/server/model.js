const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

mongoose.connect('mongodb://localhost/test')

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  var Items = new mongoose.Schema({
    id: ObjectId,
    name: String
  })
  var Orders = new mongoose.Schema({
    items: [Items],
    date: Date,
    price: Number
  })
  var Users = new mongoose.Schema({
    name: String,
    currentOrders: [Orders],
    pastOrders: [Orders],
    addresses: [String]
  })
  var Item = mongoose.model('Item', Items)
  var Order = mongoose.model('Order', Orders)
  var User = mongoose.model('User', Users)

  var Jadesh = new User({ name: 'Jadesh Shetty', currentOrders: [], pastOrders: [], addresses: ['2698, 19th Main, 5th Cross, Indiranagar HAL 2nd Stage, Bangalore - 560008'] })

  Jadesh.save(function (err, Jadesh) {
    if (err) return console.error(err)
    console.log(Jadesh)
  })
})
