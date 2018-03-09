import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@vtex/styleguide/lib/Button'
import Config from './components/Config'
import Items from './components/Items'

class Collection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      collection: {},
      loading: true,
    }
  }

  handleChangeHighlight = () => {
    this.setState({ highlight: !this.state.highlight })
  };

  handleChangeSearchable = () => {
    this.setState({ searchable: !this.state.searchable })
  };

  handleChangeName = e => {
    this.setState({ name: e.target.value })
  };

  handleCancel() {
    window.location.href = '/admin/collections'
  }

  render() {
    const { collection } = this.state

    return (
      <div className="pv8 ph3 near-black bg-near-white w-100 h-100">
        <div className="w-90 center">
          <div
            className="flex justify-between items-center bb b--light-gray pb6"
          >
            <div className="fw7 f2">
              Collections
            </div>
            <div>
              <div className="pr5 dib">
                <Button onClick={this.handleClickNewCollection}>
                  cancel
                </Button>
              </div>
              <Button primary onClick={this.handleClickNewCollection}>
                save
              </Button>
            </div>
          </div>

          <div>
            <Config collection={collection} />
            <Items />
          </div>
        </div>
      </div>
    )
  }
}

Collection.propTypes = {
  params: PropTypes.object.isRequired,
}

export default Collection
