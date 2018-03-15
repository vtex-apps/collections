import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ManualGroup from '../ManualGroup'
import DynamicGroup from '../DynamicGroup'

class Group extends Component {
  handleSave = () => {};
  handleCancel = () => {};

  render() {
    const { data, collectionId } = this.props

    return data.skus.length > 0
      ? <ManualGroup
        collectionId={collectionId}
        name={data.name}
        skus={data.skus}
        onSave={this.handleSave}
        onCancel={this.handleCancel}
      />
      : <DynamicGroup
        collectionId={collectionId}
        name={data.name}
        categories={data.categories}
        brands={data.brands}
        onSave={this.handleSave}
        onCancel={this.handleCancel}
      />
  }
}

Group.propTypes = {
  data: PropTypes.object,
  collectionId: PropTypes.string,
}

export default Group
