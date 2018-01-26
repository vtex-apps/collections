import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import 'vtex-tachyons'
import Collection from './Collection'

class CollectionContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    console.log('Container', this.props)

    return (
      <Collection id={this.props.params.id} />
    )
  }
}

export default CollectionContainer
