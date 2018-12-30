import { combineReducers } from 'redux'

const cartItem = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        id: action.id,
        count: action.count
      }
    case 'REMOVE_FROM_CART':
      return state.id !== action.id
    case 'UPDATE_CART_ITEM':
      if (state.id !== action.id) {
        return state
      }

      return Object.assign(
        {},
        state,
        {
          count: action.count
        }
      )
    default:
      return state
  }
}

const cart = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [
        ...state,
        cartItem(undefined, action)
      ]
    case 'REMOVE_FROM_CART':
      return state.filter(item => cartItem(item, action))
    case 'UPDATE_CART_ITEM':
      return state.map(item => cartItem(item, action))
    default:
      return state
  }
}

const stockItem = (state, action) => {
  switch (action.type) {
    case 'REMOVE_STOCK_ITEM':
      if (state.id !== action.id) {
        return state
      }

      return Object.assign(
        {},
        state,
        {
          count: state.count - action.count
        }
      )
    default:
      return state
  }
}

const stock = (state = [], action) => {
  switch (action.type) {
    case 'REMOVE_STOCK_ITEM':
      return state.map(item => stockItem(item, action))
    default:
      return state
  }
}

export const reducers = combineReducers({
  cart,
  stock
})
