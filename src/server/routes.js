const express = require('express')

const controllers = require('./controllers')

const router = express.Router()

router.get('/items', controllers.getItems)
router.get('/user/cart/:userId', controllers.getCart)
router.get('/user/addresses/:userId', controllers.getAddresses)
router.put('/user/cart/:userId/:itemId', controllers.addItemToCart)
router.delete('/user/cart/:userId/:itemId', controllers.removeItemFromCart)
router.put('/user/addresses/:userId', controllers.addAddress) // send address in body
router.post('/user/cart/:userId', controllers.setCart) // send cart in body

module.exports = router
