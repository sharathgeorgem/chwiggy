import Header from '../header/Header'
import { connect } from 'react-redux'

const showBackButton = (pathname) => (
  pathname !== '/' ? true : false
)

const showCartButton = (pathname) => (
  !pathname.includes('cart') ? true : false
)

const HeaderContainer = connect(
  (state, ownProps) => (
    {
      children: ownProps.children,
      cartItems: state.cart.length,
      backButton: showBackButton(ownProps.history.location.pathname),
      cartButton: showCartButton(ownProps.history.location.pathname)
    }
  )
)(Header)

export default HeaderContainer
