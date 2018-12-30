import React from 'react'
import AddItemContainer from '../add-item-container/AddItemContainer'
import propTypes from 'prop-types'

const Item = ({ id, name, description, price, img }) => (
  <div className={'item item-' + id}>
    <img
      className='item-image'
      src={img}
      alt='Item'
    />
    <div className='item-details'>
      <h1 className='item-name'>
        {name}
      </h1>
      <h2 className='item-price'>
        ₹{price.toFixed(2)}
      </h2>
      <p className='item-desc'>
        {description}
      </p>
      <AddItemContainer id={id} />
    </div>
  </div>
)

Item.propTypes = {
  id: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  img: propTypes.string.isRequired
}

export default Item
