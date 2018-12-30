import AddItem from '../add-item/AddItem'
import { connect } from 'react-redux'
import { updateCartItem, addToCart } from '../../actions/actions'

const addItemGetSelectedValue = (e) => (
  e.target.getElementsByClassName('item-qty')[0].value
)

const AddItemContainer = connect(
  (state, ownProps) => (
    {
      id: ownProps.id,
      count: state.stock.find(item => item.id === ownProps.id).count,
      inCart: state.cart.some(item => item.id === ownProps.id)
    }
  ),
  null,
  (stateProps, dispatchProps, ownProps) => {
    const onSubmit = stateProps.inCart ? updateCartItem : addToCart

    return Object.assign({}, ownProps, stateProps, dispatchProps, {
      onSubmit: (e, id) => {
        dispatchProps.dispatch(onSubmit(id, addItemGetSelectedValue(e)))
      }
    })
  }
)(AddItem)

export default AddItemContainer
