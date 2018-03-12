import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Product from './Product'

class Result extends Component {
  render() {
    const {
      selectedSkus,
      products,
      selectionState,
      onChangeSelection,
    } = this.props

    return (
      <div>
        {products.map(product => (
          <Product
            key={product.productId}
            product={product}
            selectedSkus={selectedSkus}
            productState={selectionState.product[product.productId]}
            onChangeSelection={onChangeSelection}
          />
        ))}
      </div>
    )
  }
}

Result.propTypes = {
  selectedSkus: PropTypes.array,
  products: PropTypes.array.isRequired,
  selectionState: PropTypes.object,
  onChangeSelection: PropTypes.func.isRequired,
}

export default Result
