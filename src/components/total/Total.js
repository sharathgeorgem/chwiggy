import React from 'react'
import propTypes from 'prop-types'

const Total = ({ cart }) => (
  <div className='cart-total'>
    <span className='cart-total-label'>
      Total:
    </span>
    <span className='cart-total-value'>
      ${cart.length ? cart.reduce((acc, item) => (
        acc + item.price * item.count
      ), 0).toFixed(2) : Number(0).toFixed(2)}
    </span>
  </div>
)

Total.propTypes = {
  cart: propTypes.arrayOf(propTypes.shape({
    price: propTypes.number.isRequired,
    count: propTypes.number.isRequired
  }).isRequired).isRequired
}

export default Total
