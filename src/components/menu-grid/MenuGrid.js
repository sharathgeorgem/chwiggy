import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: gray;
`

const ProductWrapper = styled.div`
  flex-basis: 24%;
  margin-bottom: 20px;
  background-color: orange;
  border-radius: 5px;
`

const ProductImage = styled.img`
  width: 100%;
`

const ProductName = styled.h1`
  font-size:1em;
  margin: 10px 0;
  color: blue;
`

const ProductDescription = styled.div`
  margin: 10px 0;
  color: yellow;
`

const MenuGrid = ({ menu }) => (
  menu
    ? <Wrapper>
      {menu.map(menu => (
        <ProductWrapper key={menu._id}>
          <ProductName src={menu.name} />
          <h2>{menu.name}</h2>
          <ProductImage src={'https://' + menu.imageURL} />
          <h4>{menu.description}</h4>
          <ProductDescription src={menu.description} />
        </ProductWrapper>
      ))}
    </Wrapper>
    : <h1>Welcome</h1>
)

MenuGrid.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })).isRequired
}

export default MenuGrid
