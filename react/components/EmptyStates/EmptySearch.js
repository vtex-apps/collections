import React, { Component } from 'react'
import EmptySearchIcon from './EmptySearchIcon'

class EmptySearch extends Component {
  render() {
    return (
      <div
        className="pa10 tc flex flex-column items-center justify-center mw7 center"
      >
        <EmptySearchIcon />
        <div className="pt5 f4">
          There's no product or SKU with that name
        </div>
        <div className="pt4 f6">
          Try another name or check if your product is in your catalog
        </div>
      </div>
    )
  }
}

export default EmptySearch
