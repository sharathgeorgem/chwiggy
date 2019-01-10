const http = require('../utilities/promisifiedHTTP')

const key = '10a6760a0a87faec6c36ce16cd426eb6'
const domain = 'http://localhost:8000'
const placeholder = 'https://www.engel-vimbuch.de/images/placeholder/restaurant_raeume/restaurant_raeume_schnapsstueble.jpg'

async function addRestaurant (details) {
  return http.request('http', 'POST', domain, 'restaurant/new', details)
}

async function getRestaurantData (lat, lon, start) {
  return http.getRequest('https', 'json', 'https://developers.zomato.com/api/v2.1',
    `search?sort=real_distance&lat=${lat}&lon=${lon}&start=${start}`, { 'user-key': key })
}

function formatRestaurantData (data) {
  return data.restaurants.map(r => Object.assign({}, {
    name: r.restaurant.name,
    address: {
      latitude: r.restaurant.location.latitude,
      longitude: r.restaurant.location.longitude,
      value: r.restaurant.location.address,
      apartment: '',
      landmark: r.restaurant.location.locality
    },
    cuisines: r.restaurant.cuisines.split(', '),
    cost: r.restaurant.average_cost_for_two,
    score: Math.round(Number(r.restaurant.user_rating.aggregate_rating) * Number(r.restaurant.user_rating.votes)),
    votes: Number(r.restaurant.user_rating.votes),
    thumb: r.restaurant.thumb || placeholder,
    img: r.restaurant.featured_image || placeholder
  }))
}

async function addRestaurantsToDB (start) {
  let data = await getRestaurantData(12.9615365, 77.6419672, start)
  formatRestaurantData(data).forEach(addRestaurant)
}

addRestaurantsToDB(0)
