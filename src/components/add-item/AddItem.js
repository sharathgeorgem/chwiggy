import getOptionsArray from '../../functions/functions'
import PropTypes from 'prop-types'

const AddItem = ({ id, count, onSubmit }) => {
  if (!count) {
    return (
      <p className='item-sold-out'>
        Sold out!
      </p>
    )
  }

  return (
    <form
      className='item-add-form'
      onSubmit={e => {
        e.preventDefault()
        onSubmit(e, id)
      }}
    >
      <span className='item-qty-label'>
        Qty:
      </span>
      <select className='item-qty'>
        {getOptionsArray(count).map(num =>
          <option
            key={num}
            value={num}
          >
            {num}
          </option>
        )}
      </select>
      <button
        className='item-add-button'
        type='submit'
      >
        Add to cart
      </button>
    </form>
  )
}

AddItem.PropTypes = {
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}
