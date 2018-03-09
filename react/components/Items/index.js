import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Card from '../Card'
import Search from './Search'
import Result from './Result'

class Items extends Component {
  render() {
    return (
      <Card>
        <Search />
        <Result />
      </Card>
    )
  }
}

Items.propTypes = {}

export default Items
