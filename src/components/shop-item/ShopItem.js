import React from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ShopItem = ({ id, name, price, img }) => (
  <li className={'shop-item shop-item-' + id}>
    <Link to={'/item/' + id}>
      <div className='shop-item-container'>
        <img
          className='shop-item-image'
          src={img}
          alt='shop item'
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

ShopItem.propTypes = {
  id: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  img: propTypes.string.isRequired
}

export default ShopItem
