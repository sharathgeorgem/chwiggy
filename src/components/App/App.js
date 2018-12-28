import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import './App.css'
// import Item from '../Item/Item'

const {
  Router,
  IndexRoute,
  hashHistory
} = BrowserRouter

const App = () => (
  <Router history={hashHistory}>
    <Route path='/' component={HeaderContainer}>
      <IndexRoute component={Shop} />
      <Route path='item/:id' component={ItemContainer} />
      <Route path='cart' component={CartContainer} />
    </Route>
  </Router>
)

export default App
