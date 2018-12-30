import React from 'react'
import CartItems from '../cart-items/CartItems'
import Total from '../total/Total'
import PayButton from '../pay-button/PayButton'
import propTypes from 'prop-types'

const Cart = ({ cart, onQtyChange, onRemoveClick, onPayClick }) => (
  <div className='cart'>
    <h1 className='main-header cart-header'>My Cart</h1>
    <CartItems
      cart={cart}
      onQtyChange={onQtyChange}
      onRemoveClick={onRemoveClick}
    />
    <Total cart={cart} />
    <PayButton onPayClick={onPayClick} />
  </div>
)

Cart.propTypes = {
  cart: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    price: propTypes.number.isRequired,
    img: propTypes.string.isRequired,
    count: propTypes.number.isRequired,
    stockCount: propTypes.number.isRequired
  }).isRequired).isRequired,
  onQtyChange: propTypes.func.isRequired,
  onRemoveClick: propTypes.func.isRequired,
  onPayClick: propTypes.func.isRequired
}

export default Cart
