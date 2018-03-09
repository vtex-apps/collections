import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Input from '@vtex/styleguide/lib/Input'

class Search extends Component {
  render() {
    return (
      <div>
        <label htmlFor="search" className="f7 fw3">Search</label>
        <div className="pt3">
          <Input placeholder="Search by collection name…" id="search" />
        </div>
      </div>
    )
  }
}

Search.propTypes = {}

export default Search
