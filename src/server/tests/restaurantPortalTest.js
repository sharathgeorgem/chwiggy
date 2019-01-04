const http = require('http')
const io = require('socket.io-client')
const domain = 'http://localhost:8000'

function getId () {
  return new Promise((resolve, reject) => {
    let req = http.get(`${domain}/restaurant/dummy`)
    req.on('response', res => {
      let data = ''
      res.on('data', chunk => { data += chunk })
      res.on('end', () => resolve(JSON.parse(data)))
    })
    req.on('error', (err) => reject(err))
  })
}

async function initializeConnection () {
  let socket = io.connect(domain)
  let id = await getId()
  socket.emit('identify', id)
}

socket.on('', )
