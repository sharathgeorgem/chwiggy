// import mockProducts from './products.mock'

export const fetchAll = async () =>
  fetch('http://localhost:8000/items')
    .then(res => (res.json()))
