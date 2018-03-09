import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import filter from 'lodash/filter'

import IconArrowDown from './IconArrowDown'
import IconArrowUp from './IconArrowUp'
import Sku from './Sku'

class Product extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      allSkusChecked: this.areAllSkusSelected(props),
      hasOneChecked: this.hasOneChecked(props),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      allSkusChecked: this.areAllSkusSelected(nextProps),
      hasOneChecked: this.hasOneChecked(nextProps),
    })
  }

  areAllSkusSelected = props => {
    return props.productState
      ? filter(props.productState.skus, sku => sku.checked).length ===
          props.product.items.length
      : props.productInCollection &&
          props.product.items.filter(
            item =>
              !!props.productInCollection.items.find(
                sku => sku.itemId === item.itemId
              )
          ).length === props.product.items.length
  };

  hasOneChecked = props => {
    return props.productState
      ? filter(props.productState.skus, sku => sku.checked).length > 0
      : props.productInCollection &&
          props.product.items.filter(
            item =>
              !!props.productInCollection.items.find(
                sku => sku.itemId === item.itemId
              )
          ).length > 0
  };

  handleClickArrow = () => {
    this.setState(prevState => ({ open: !prevState.open }))
  };

  handleChangeSkuSelection = ({ skuId, checked }) => {
    this.props.onChangeSelection([
      {
        type: 'SKU',
        productId: this.props.product.productId,
        skuId,
        checked,
      },
    ])
  };

  handleChangeProductSelection = () => {
    this.props.onChangeSelection(
      this.props.product.items.map(item => ({
        type: 'SKU',
        productId: this.props.product.productId,
        skuId: item.itemId,
        checked: !this.state.allSkusChecked,
      }))
    )
  };

  render() {
    const { product, productState, productInCollection } = this.props
    const { open, allSkusChecked, hasOneChecked } = this.state

    return (
      <Fragment>
        <div className="flex items-center">
          <label className="container">
            <input
              type="checkbox"
              checked={allSkusChecked}
              onChange={this.handleChangeProductSelection}
            />
            <span
              className={`checkmark ba bw1 ${hasOneChecked ? 'b--blue' : 'b--light-gray'}`}
              style={{ width: '12px', height: '12px' }}
            />
          </label>
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
          ? product.items.map(item => (
            <Sku
              key={item.itemId}
              sku={item}
              onChange={this.handleChangeSkuSelection}
              inCollection={
                productState && productState.skus[item.itemId]
                  ? productState.skus[item.itemId].checked
                  : productInCollection &&
                        !!productInCollection.items.find(
                    sku => sku.itemId === item.itemId
                  )
              }
            />
          ))
          : null}
      </Fragment>
    )
  }
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  productState: PropTypes.object,
  productInCollection: PropTypes.object,
  onChangeSelection: PropTypes.func.isRequired,
}

export default Product
