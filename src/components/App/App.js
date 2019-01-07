import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../../state/product/actions'
import MenuGrid from '../menu-grid/MenuGrid'

// import { BrowserRouter as Router, Route } from 'react-router-dom'

// import HeaderContainer from '../header-container/HeaderContainer'
// import Shop from '../shop/Shop'
// import ItemContainer from '../item-container/ItemContainer'
// import CartContainer from '../cart-container/CartContainer'

import './App.scss'

class App extends Component {
  componentWillMount () {
    this.props.fetchProducts()
  }
  render () {
    const {
      isProductsLoading,
      menu } = this.props.products
    console.log('CHECEESFSDF', menu)
    if (isProductsLoading) {
      return (<h2>Loading...</h2>)
    }
    return (
      <div>
        <h1>Restaurant</h1>
        <MenuGrid menu={menu} />
      </div>
    )
  }
}

// Takes redux state and treats it as an object to be added to a component via props
const mapStateToProps = (state) => ({
  isProductsLoading: state.product.isLoading,
  products: state.product.products
})

// Object of actions passed to the component
const mapDispatchToProps = {
  fetchProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

// {/* <Router>
//   <div>
//     <Route path='/' component={HeaderContainer} />
//     <Route exact path='/' component={Shop} />
//     <Route path='/item/:id' component={ItemContainer} />
//     <Route path='/cart' component={CartContainer} />
//   </div>
// </Router> */}
