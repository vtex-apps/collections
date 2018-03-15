import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Product from './Product'

class Result extends Component {
  render() {
    const {
      selectedSkus,
      products,
      onChange,
    } = this.props

    return (
      <div>
        {products.map(product => {
          const productSelectedSkus = selectedSkus.filter(
            skuId =>
              product.items.find(
                item => parseInt(item.itemId) === parseInt(skuId)
              )
          )

          return (
            <Product
              key={
                `${product.productId}-${JSON.stringify(productSelectedSkus) || ''}`
              }
              product={product}
              selectedSkus={productSelectedSkus}
              onChange={onChange}
            />
          )
        })}
      </div>
    )
  }
}

Result.propTypes = {
  selectedSkus: PropTypes.array,
  products: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Result
