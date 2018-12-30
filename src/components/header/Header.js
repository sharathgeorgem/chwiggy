import React from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Header = ({ children, cartItems, backButton, cartButton }) => {
  const getBackButton = () => (
    <Link to='/' className='back-button'>
      &lt; Back to shop
    </Link>
  )

  const getCartButton = () => (
    <Link to='/cart' className='cart-button'>
      Cart ({cartItems})
    </Link>
  )

  return (
    <div className='shopping-cart-app'>
      <header className='header'>
        <div className='header-contents'>
          {backButton ? getBackButton() : ''}
          {cartButton ? getCartButton() : ''}
        </div>
      </header>
      <main className='main'>
        {children}
      </main>
    </div>
  )
}

Header.propTypes = {
  cartItems: propTypes.number.isRequired,
  backButton: propTypes.bool.isRequired,
  cartButton: propTypes.bool.isRequired
}

export default Header
