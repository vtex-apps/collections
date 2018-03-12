import React, { Component } from 'react'
import EmptyStateIcon from './EmptyStateIcon'

class EmptyCollection extends Component {
  render() {
    return (
      <div
        className="pa10 tc flex flex-column items-center justify-center mw7 center"
      >
        <EmptyStateIcon />
        <div className="pt5 f4">
          Your collection is empty!
        </div>
        <div className="pt4 f6">
          Search and select some products to compose your collection
        </div>
      </div>
    )
  }
}

export default EmptyCollection
