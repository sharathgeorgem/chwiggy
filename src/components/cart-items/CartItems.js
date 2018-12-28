import CartItem from '../cart-item/CartItem'
import PropTypes from 'prop-types'

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

CartItems.PropTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    stockCount: PropTypes.number.isRequired
  }).isRequired).isRequired,
  onQtyChange: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired
}

export default CartItems
