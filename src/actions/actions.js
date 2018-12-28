const addToCart = (id, count) => (
  {
    type: 'ADD_TO_CART',
    id,
    count
  }
)

const removeFromCart = (id) => (
  {
    type: 'REMOVE_FROM_CART',
    id
  }
)

const updateCartItem = (id, count) => (
  {
    type: 'UPDATE_CART_ITEM',
    id,
    count
  }
)

const removeStockItem = (id, count) => (
  {
    type: 'REMOVE_STOCK_ITEM',
    id,
    count
  }
)
