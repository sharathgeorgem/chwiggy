const http = require('http')

exports.getRequest = function (domain, route) {
  return new Promise((resolve, reject) => {
    let req = http.get(`${domain}/${route}`)
    req.on('response', res => {
      let data = ''
      res.on('data', chunk => { data += chunk })
      res.on('end', () => resolve(JSON.parse(data)))
    })
    req.on('error', (err) => reject(err))
  })
}

exports.request = function (mode, domain, route, body) {
  return new Promise((resolve, reject) => {
    let req = http.request(`${domain}/${route}`, { method: mode })
    if (body) {
      req.setHeader('Content-Type', 'application/json')
      req.setHeader('Transfer-Encoding', 'chunked')
      req.write(JSON.stringify(body), 'utf8')
    }
    req.end()
    req.on('response', res => {
      let data = ''
      res.on('data', chunk => { data += chunk })
      res.on('end', () => resolve(JSON.parse(data)))
    })
    req.on('error', (err) => reject(err))
  })
}
