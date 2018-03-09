import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import IconArrowDown from './IconArrowDown'
import IconArrowUp from './IconArrowUp'
import Sku from './Sku'

class Product extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
  }

  handleClickArrow = () => {
    this.setState(prevState => ({ open: !prevState.open }))
  };

  render() {
    const { product } = this.props
    const { open } = this.state

    return (
      <Fragment>
        <div className="flex items-center">
          <label className="container">
            <input type="checkbox"></input>
            <span className="checkmark" style={{ width: '12px', height: '12px'}}></span>
          </label>
          {/*<input type="checkbox" className="mr5" />*/}
          <div
            className={
              `bt bl bb br b--light-gray pa4 flex items-center f6 flex-grow-1 justify-between relative ${open ? 'bg-near-white' : ''}`
            }
          >
            <div className="flex items-center">
              <img
                src={product.items[0].images[0].imageUrl}
                style={{ width: '3rem', height: '3rem' }}
              />
              <div className="ml5">{product.productName}</div>
            </div>
            <div className="flex items-center fw3 justify-end pr7 f6">
              <div className="tl pr9">REF: {product.productReference}</div>
              <div className="tl">ID: {product.productId}</div>
            </div>
            <button
              className="bg-serious-black pa2 br-100 absolute flex items-center bn pointer dim"
              style={{ right: '-0.75rem' }}
              onClick={this.handleClickArrow}
            >
              {open
                ? <IconArrowUp fill="#FFFFFF" width={14} height={14} />
                : <IconArrowDown fill="#FFFFFF" width={14} height={14} />}
            </button>
          </div>
        </div>
        {open
          ? product.items.map(item => <Sku key={item.itemId} sku={item} />)
          : null}
      </Fragment>
    )
  }
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
}

export default Product
