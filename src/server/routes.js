const express = require('express')

const controllers = require('./controllers/routeControllers')

const router = express.Router()

// only for development
router.get('/user/dummy', controllers.getDummyUser)
router.get('/restaurant/dummy', controllers.getDummyRestaurant)
router.get('/deliverer/dummy', controllers.getDummyDeliverer)
// ---

router.get('/restaurant', controllers.getRestaurants)
router.get('/items', controllers.getItems)
router.get('/user/cart/:userId', controllers.getCart)
router.get('/user/addresses/:userId', controllers.getAddresses)
router.put('/user/cart/:userId/:itemId', controllers.addItemToCart)
router.delete('/user/cart/:userId/:itemId', controllers.removeItemFromCart)
router.put('/user/addresses/:userId/:addressType', controllers.addAddress) // send address in body
router.post('/user/cart/:userId', controllers.setCart) // send cart in body

router.post('/user/new', controllers.addUser)
router.post('/restaurant/new', controllers.addRestaurant)
router.post('/deliverer/new', controllers.addDeliverer)
router.post('/items/new', controllers.addItem)

module.exports = router
