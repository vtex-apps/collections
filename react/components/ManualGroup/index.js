import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseGroup from '../BaseGroup'
import Items from './Items'

class ManualGroup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      group: {
        name: props.name,
        skus: props.skus,
        type: 'I',
        preSale: false,
        release: false,
        brands: [],
        categories: [],
      },
      currentPage: 1,
      queryFrom: 0,
      queryTo: 9,
      query: '',
    }
  }

  handleChangeName = e => {
    const name = e.target.value
    this.setState(prevState => ({ group: {...prevState.group, name} }))
  };

  handleSave = () => {
    this.props.onSave(this.state.group)
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
      this.state.group.skus
    )

    this.setState(prevState => ({ group: {...prevState.group, skus} }))
  };

  handleChangeSearch = newState => {
    this.setState(newState)
  }

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
          query={this.state.query}
          currentPage={this.state.currentPage}
          queryFrom={this.state.queryFrom}
          queryTo={this.state.queryTo}
          collectionId={this.props.collectionId}
          skus={this.state.group.skus}
          onChange={this.handleChangeSearch}
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
