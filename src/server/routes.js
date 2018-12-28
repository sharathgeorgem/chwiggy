const express = require('express')

const controllers = require('./controllers')

var router = express.Router()

router.get('/user/cart/:userId', controllers.getCart)
router.get('/user/addresses/:userId', controllers.getAddresses)
router.put('/user/cart/:userId/:itemId', controllers.addItemToCart)
router.delete('/user/cart/:userId/:itemId', controllers.removeItemFromCart)
router.put('/user/addresses/:userId/:address', controllers.addAddress)
router.post('/user/cart/:userId/:address', controllers.submitOrder)

module.exports = router
