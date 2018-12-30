import React from 'react'
import CartItem from '../cart-item/CartItem'
import propTypes from 'prop-types'

const CartItems = ({ cart, onQtyChange, onRemoveClick }) => {
  if (!cart.length) {
    return <p className='empty-cart'>Cart is empty</p>
  }

  return (
    <ul className='cart-items'>
      {cart.map(item =>
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          img={item.img}
          count={item.count}
          stockCount={item.stockCount}
          onQtyChange={(e, id) => onQtyChange(e, id)}
          onRemoveClick={(e, id) => onRemoveClick(e, id)}
        />
      )}
    </ul>
  )
}

CartItems.propTypes = {
  cart: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    price: propTypes.number.isRequired,
    img: propTypes.string.isRequired,
    count: propTypes.number.isRequired,
    stockCount: propTypes.number.isRequired
  }).isRequired).isRequired,
  onQtyChange: propTypes.func.isRequired,
  onRemoveClick: propTypes.func.isRequired
}

export default CartItems
