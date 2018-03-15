import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Search extends Component {
  render() {
    return (
      <div className="">
        <label htmlFor="search" className="f7 fw3">Search</label>
        <div className="pt3 flex flex-auto">
          <input placeholder={this.props.placeholder} id="search" value={this.props.value} onChange={this.props.onChange} className="flex flex-auto ba b--light-gray bw1 pa4 f6 br2 ma0 border-box outline-0 near-black bg-white" />
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default Search
