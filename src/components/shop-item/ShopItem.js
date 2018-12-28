import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ShopItem = ({ id, name, price, img }) => (
  <li className={'shop-item shop-item-' + id}>
    <Link to={'/item/' + id}>
      <div className='shop-item-container'>
        <img
          className='shop-item-image'
          src={img}
        />
        <h1 className='shop-item-name'>
          {name}
        </h1>
        <h2 className='shop-item-price'>
          ${price.toFixed(2)}
        </h2>
      </div>
    </Link>
  </li>
)

ShopItem.PropTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired
}

export default ShopItem
