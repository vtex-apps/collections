import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SearchCatalog from '../graphql/SearchCatalog'
import Card from '../Card'
import Search from './Search'
import Result from './Result'

import Dropdown from '@vtex/styleguide/lib/Dropdown'

class Items extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
    }
  }

  handleChangeSearch = e => {
    const value = e.target.value
    this.setState({ search: value })
  };

  render() {
    const { collectionId } = this.props
    const { search } = this.state
    const params = search ? { query: search } : { collection: collectionId }

    return (
      <Card>
        <SearchCatalog {...params}>
          {({ loading, products }) => (
            <div className="w-90 center">
              <div className="f4 fw7">
                Items
              </div>
              <div className="flex items-baseline w-100 justify-between">
                <div className="pt6 w-80">
                  <Search value={search} onChange={this.handleChangeSearch} />
                </div>
                <div className="pl4">
                  <label htmlFor="filter" className="f7 fw3">
                    Filter by
                  </label>
                  <div className="pt3">
                    <Dropdown
                      placeholder="All"
                      options={['Selected', 'Not selected', 'All']}
                      onChange={() => {}}
                      value=""
                      id="filter"
                    />
                  </div>
                </div>
              </div>
              <div className="pt6">
                {loading ? <div>Loading</div> : <Result products={products} />}
              </div>
            </div>
          )}
        </SearchCatalog>
      </Card>
    )
  }
}

Items.propTypes = {
  collectionId: PropTypes.string.isRequired,
}

export default Items
