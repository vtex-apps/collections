import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import filter from 'lodash/filter'

import IconArrowDown from './IconArrowDown'
import IconArrowUp from './IconArrowUp'
import Sku from './Sku'
import Checkbox from '../../../Checkbox'

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
    return props.selectedSkus.length === props.product.items.length
  };

  hasOneChecked = props => {
    return props.selectedSkus.length > 0
  };

  handleClickArrow = () => {
    this.setState(prevState => ({ open: !prevState.open }))
  };

  handleChangeSkuSelection = ({ skuId, checked }) => {
    this.props.onChange([{ skuId, checked }])
  };

  handleChangeProductSelection = () => {
    this.props.onChange(
      this.props.product.items.map(item => ({
        skuId: item.itemId,
        checked: !this.state.allSkusChecked,
      }))
    )
  };

  render() {
    const { product, productState, selectedSkus } = this.props
    const { open, allSkusChecked, hasOneChecked } = this.state

    return (
      <Fragment>
        <div className="flex items-center">
          <Checkbox
            checked={allSkusChecked}
            semiChecked={hasOneChecked}
            onChange={this.handleChangeProductSelection}
          />
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
              inCollection={selectedSkus.includes(item.itemId)}
            />
          ))
          : null}
      </Fragment>
    )
  }
}

Product.defaultProps = {
  selectedSkus: [],
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  selectedSkus: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Product
