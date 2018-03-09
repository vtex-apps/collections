import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Input from '@vtex/styleguide/lib/Input'

class Search extends Component {
  render() {
    return (
      <div>
        <Input placeholder="Search by collection name…" />
      </div>
    )
  }
}

Search.propTypes = {}

export default Search
