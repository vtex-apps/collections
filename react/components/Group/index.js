import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ManualGroup from '../ManualGroup'
import DynamicGroup from '../DynamicGroup'

class Group extends Component {
  handleSave = data => {
    this.props.onChange(this.props.index, data)
  };

  render() {
    const { data, collectionId } = this.props

    return true // eslint-disable-line
      ? <ManualGroup
        collectionId={collectionId}
        name={data.name}
        skus={data.skus}
        onSave={this.handleSave}
      />
      : <DynamicGroup
        collectionId={collectionId}
        name={data.name}
        categories={data.categories}
        brands={data.brands}
        onSave={this.handleSave}
      />
  }
}

Group.propTypes = {
  index: PropTypes.number.isRequired,
  data: PropTypes.object,
  collectionId: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default Group
