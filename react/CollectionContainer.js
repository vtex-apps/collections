import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Collection from './pages/Collection'

class CollectionContainer extends Component {
  render() {
    return <Collection id={this.props.params.id} className="h-100" />
  }
}

CollectionContainer.propTypes = {
  params: PropTypes.object.isRequired,
}

export default CollectionContainer
