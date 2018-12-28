import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import './index.css'

import './actions/actions'
import './functions/functions'
import { reducers } from './reducers/index'
import App from './components/App/App'

const initialState = {
  cart: [],
  stock: [
    {
      id: 0,
      name: 'TC 2017 LS',
      description: 'VC FlexLight Jersey with spot sublimated Team Canada 2017 logo, from our Team Canada Collection.',
      price: 34.95,
      count: 12,
      img: 'https://cdn.shopify.com/s/files/1/0340/2849/products/TC2017_LS_Mens_grande.jpg?v=1485541617'
    }, {
      id: 1,
      name: 'TC 2017 Shorts',
      description: 'VC FlexLight Shorts with spot sublimated Team Canada 2017 logo, from our Team Canada Collection.',
      price: 25.00,
      count: 7,
      img: 'https://cdn.shopify.com/s/files/1/0340/2849/products/TC2017_Shorts_White_grande.jpg?v=1485541580'
    }, {
      id: 2,
      name: 'TC 2016 Red SS',
      description: 'VC Ultimate\'s fully sublimated performance jersey, a replica of one of the two official dark jerseys of 2016 Team Canada teams! Sublimated jerseys are made with VC\'s FlexLight performance material – soft, lightweight and moisture wicking.',
      price: 74.00,
      count: 11,
      img: 'https://cdn.shopify.com/s/files/1/0340/2849/products/TC2016_red_SS_front_grande.jpg?v=1468602448'
    }
  ]
}

const store = createStore(reducers, initialState)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
)
