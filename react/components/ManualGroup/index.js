import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseGroup from '../BaseGroup'
import Items from './Items'

class ManualGroup extends Component {
  handleChangeSelection = data => {
    console.log(data)
  };

  handleChangeName = () => {};

  handleSave = () => {};

  handleCancel = () => {};

  render() {
    return (
      <BaseGroup
        name={this.props.name}
        onChangeName={this.handleChangeName}
        onSave={this.handleSave}
        onCancel={this.handleCancel}
      >
        <Items
          collectionId={this.props.collectionId}
          selections={{ product: {} }}
          skus={this.props.skus}
          onChangeSelection={this.handleChangeSelection}
        />
      </BaseGroup>
    )
  }
}

ManualGroup.propTypes = {
  collectionId: PropTypes.string.isRequired,
  name: PropTypes.string,
  skus: PropTypes.array.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default ManualGroup
