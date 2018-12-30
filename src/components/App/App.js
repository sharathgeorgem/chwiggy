import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import HeaderContainer from '../header-container/HeaderContainer'
import Shop from '../shop/Shop'
import ItemContainer from '../item-container/ItemContainer'
import CartContainer from '../cart-container/CartContainer'

import './App.scss'

const App = () => (
  <Router>
    <div>
      <Route path='/' component={HeaderContainer} />
      <Route exact path='/' component={Shop} />
      <Route path='/item/:id' component={ItemContainer} />
      <Route path='/cart' component={CartContainer} />
    </div>
  </Router>
)

export default App
