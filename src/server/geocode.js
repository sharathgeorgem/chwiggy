const http = require('./utilities/promisifiedHTTP')

const domain = 'https://nominatim.openstreetmap.org'
const email = 'simba@geekskool.com'

exports.getLatLong = async function (address) {
  let mode = 'search'
  let options = `format=json&limit=1&email=${email}`
  let query = `q=${address.replace(/\s/g, '+')}&`.concat(options)
  let res = await http.getRequest('https', 'json', domain, `${mode}?${query}`)
  return [Number(res[0].lat), Number(res[0].lon)]
}

exports.getAddress = async function (latitude, longitude) {
  let mode = 'reverse'
  let options = `format=json&zoom=18&email=${email}`
  let query = `lat=${latitude}&lon=${longitude}&`.concat(options)
  let res = await http.getRequest('https', 'json', domain, `${mode}?${query}`)
  return res.display_name
}
