import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Product from './Product'

class Result extends Component {
  render() {
    const { products, collection } = this.props

    return (
      <div>
        {products.map(product => (
          <Product
            product={product}
            key={product.productId}
            productInCollection={collection.find(
              item => item.productId === product.productId
            )}
          />
        ))}
      </div>
    )
  }
}

Result.propTypes = {
  products: PropTypes.array.isRequired,
  collection: PropTypes.array.isRequired,
}

export default Result
