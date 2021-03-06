import { connect } from 'react-redux'
import Item from '../item/Item'

const ItemContainer = connect(
  (state, ownProps) => (
    state.stock.find(item => String(item.id) === ownProps.match.params.id)
  )
)(Item)

export default ItemContainer
