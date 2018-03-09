import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Product from './Product'

class Result extends Component {
  render() {
    const { products } = this.props

    return (
      <div>
        {products.map(product => (
          <Product product={product} key={product.productId} />
        ))}
      </div>
    )
  }
}

Result.propTypes = {
  products: PropTypes.array.isRequired,
}

export default Result
