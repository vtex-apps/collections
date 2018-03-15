import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseGroup from '../BaseGroup'
import Items from './Items'

class ManualGroup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: props.name,
      skus: props.skus,
      type: 'I',
      preSale: false,
      release: false,
      brands: [],
      categories: [],
    }
  }

  handleChangeName = e => {
    const name = e.target.value
    this.setState({ name })
  };

  handleSave = () => {
    this.props.onSave(this.state)
  };

  handleCancel = () => {};

  handleChangeSkus = changes => {
    const skus = changes.reduce(
      (acc, change) => {
        if (change.checked && !acc.includes(change.skuId)) {
          return this.addSku(acc, change.skuId)
        }
        if (!change.checked && acc.includes(change.skuId)) {
          return this.removeSku(acc, change.skuId)
        }
        return acc
      },
      this.state.skus
    )

    this.setState({ skus })
  };

  removeSku(skus, skuId) {
    return skus.filter(sku => sku === skuId)
  }

  addSku(skus, skuId) {
    return skus.concat(skuId)
  }

  render() {
    return (
      <BaseGroup
        name={this.state.name}
        onChangeName={this.handleChangeName}
        onSave={this.handleSave}
        onCancel={this.handleCancel}
      >
        <Items
          collectionId={this.props.collectionId}
          skus={this.state.skus}
          onChangeSkus={this.handleChangeSkus}
        />
      </BaseGroup>
    )
  }
}

ManualGroup.propTypes = {
  collectionId: PropTypes.string,
  name: PropTypes.string,
  skus: PropTypes.array.isRequired,
  onSave: PropTypes.func.isRequired,
}

export default ManualGroup
