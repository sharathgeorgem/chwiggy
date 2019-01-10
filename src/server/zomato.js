const http = require('./utilities/promisifiedHTTP')

const key = '10a6760a0a87faec6c36ce16cd426eb6'
const domain = 'http://localhost:8000'

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
    cuisines: r.restaurant.cuisines,
    cost: r.restaurant.average_cost_for_two,
    score: r.restaurant.user_rating['aggregate rating'] * r.restaurant.user_rating.votes,
    votes: r.restaurant.user_rating.votes,
    thumb: r.restaurant.thumb,
    img: r.restaurant.featured_image
  }))
}

async function addRestaurantsToDB (start) {
  let data = await getRestaurantData(12.9615365, 77.6419672, start)
  formatRestaurantData(data).forEach(addRestaurant)
}

addRestaurantsToDB(0)
