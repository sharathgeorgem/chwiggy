const http = require('http')
const https = require('https')

const modeDict = { 'http': http, 'https': https }
const formatDict = { 'json': JSON.parse, 'string': String }

exports.getRequest = function (mode, format, domain, route, headers) {
  return new Promise((resolve, reject) => {
    let req = modeDict[mode].request(`${domain}/${route}`, { method: 'GET' })
    if (headers) {
      Object.entries(headers).forEach(([key, val]) => req.setHeader(key, val))
    }
    req.end()
    req.on('response', res => {
      let data = ''
      res.on('data', chunk => { data += chunk })
      res.on('end', () => resolve(formatDict[format](data)))
    })
    req.on('error', (err) => reject(err))
  })
}

exports.request = function (mode, method, domain, route, body, headers) {
  return new Promise((resolve, reject) => {
    let req = modeDict[mode].request(`${domain}/${route}`, { method: method })
    if (body) {
      req.setHeader('Content-Type', 'application/json')
      req.setHeader('Transfer-Encoding', 'chunked')
      req.write(JSON.stringify(body), 'utf8')
    }
    if (headers) {
      Object.entries(headers).forEach(([key, val]) => req.setHeader(key, val))
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
