import PropTypes from 'prop-types'

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

Total.PropTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired
  }).isRequired).isRequired
}

export default Total
