const express = require('express')
const cors = require('cors')

const router = require('./routes')

const port = 8000
const server = express()

server.listen(port, function () {
  console.log(`Server listening on port ${port}`)
})
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use('/', router)
