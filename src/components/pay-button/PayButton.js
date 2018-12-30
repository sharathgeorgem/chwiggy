import React from 'react'
import propTypes from 'prop-types'

const PayButton = ({ onPayClick }) => (
  <button
    type='button'
    className='cart-pay-button'
    onClick={() => onPayClick()}
  >
    Pay now
  </button>
)

PayButton.propTypes = {
  onPayClick: propTypes.func.isRequired
}

export default PayButton
