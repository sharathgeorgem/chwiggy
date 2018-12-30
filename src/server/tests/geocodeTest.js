const geocode = require('../geocode')

geocode.getAddress(12.961798, 77.644124).then(console.log)
geocode.getLatLong('19th Main Indiranagar Bangalore').then(console.log)
