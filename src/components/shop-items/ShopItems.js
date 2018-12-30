import React from 'react'
import ShopItem from '../shop-item/ShopItem'
import propTypes from 'prop-types'

const ShopItems = ({ items }) => {
  if (!items.length) {
    return <p className='no-shop-items'>No items</p>
  }

  return (
    <ul className='shop-item-list'>
      {items.map(item =>
        <ShopItem
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          img={item.img}
        />
      )}
    </ul>
  )
}

ShopItems.propTypes = {
  items: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    price: propTypes.number.isRequired,
    count: propTypes.number.isRequired
  }).isRequired).isRequired
}

export default ShopItems
