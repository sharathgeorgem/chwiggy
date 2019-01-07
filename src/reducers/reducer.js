import { combineReducers } from 'redux'
import productReducer from '../state/product/reducer'

export default combineReducers({
  product: productReducer
})
