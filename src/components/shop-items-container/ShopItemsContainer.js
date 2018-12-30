import ShopItems from '../shop-items/ShopItems'
import { connect } from 'react-redux'

const ShopItemsContainer = connect(
  (state) => (
    {
      items: state.stock
    }
  )
)(ShopItems)

export default ShopItemsContainer
