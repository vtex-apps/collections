import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Checkbox from '../../Checkbox'

class Sku extends Component {
  handleChange = () => {
    this.props.onChange({
      skuId: this.props.sku.itemId,
      checked: !this.props.inCollection,
    })
  };

  render() {
    const { sku, inCollection } = this.props

    return (
      <div className="flex items-center" style={{ paddingLeft: '3.75rem' }}>
        <Checkbox checked={inCollection} onChange={this.handleChange} />
        <div
          className="bl br b--light-gray ph4 pv5 flex items-center f6 flex-grow-1 justify-between bg-near-white"
        >
          <div className="flex items-center">
            <div className="ml2">{sku.nameComplete}</div>
          </div>
          <div className="flex items-center fw3 justify-end pr7 f6">
            <div className="tl pr9">REF: {sku.referenceId[0].Value}</div>
            <div className="tl">ID: {sku.itemId}</div>
          </div>
        </div>
      </div>
    )
  }
}

Sku.propTypes = {
  sku: PropTypes.object.isRequired,
  inCollection: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Sku
