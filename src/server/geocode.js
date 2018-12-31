const https = require('https')

const domain = 'https://nominatim.openstreetmap.org'
const email = 'simba@geekskool.com'

function fetchNominatim (mode, query) {
  console.log('Submitting request')
  return new Promise((resolve, reject) => {
    let req = https.get(`${domain}/${mode}?${query}`)
    req.on('response', res => {
      let data = ''
      res.on('data', chunk => { data += chunk })
      res.on('end', () => resolve(JSON.parse(data)))
    })
    req.on('error', (err) => reject(err))
  })
}

exports.getLatLong = async function (address) {
  let mode = 'search'
  let options = `format=json&limit=1&email=${email}`
  let query = `q=${address.replace(/\s/g, '+')}&`.concat(options)
  let res = await fetchNominatim(mode, query)
  return [Number(res[0].lat), Number(res[0].lon)]
}

exports.getAddress = async function (latitude, longitude) {
  let mode = 'reverse'
  let options = `format=json&zoom=18&email=${email}`
  let query = `lat=${latitude}&lon=${longitude}&`.concat(options)
  let res = await fetchNominatim(mode, query)
  return res.display_name
}
