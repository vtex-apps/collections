import React, { Component } from 'react'
import EmptySearchIcon from './EmptySearchIcon'

class EmptyCollectionSearch extends Component {
  render() {
    return (
      <div
        className="pa10 tc flex flex-column items-center justify-center mw7 center"
      >
        <EmptySearchIcon />
        <div className="pt5 f4">
          There's no collection with that name or ID
        </div>
      </div>
    )
  }
}

export default EmptyCollectionSearch
