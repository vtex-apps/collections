import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Card from '../Card'
import Search from './Search'
import Result from './Result/index'
import Pagination from '../Pagination/index'

import Dropdown from '@vtex/styleguide/lib/Dropdown'
import EmptyCollection from '../EmptyStates/EmptyCollection'
import EmptySearch from '../EmptyStates/EmptySearch'
import Loading from '../Loading'

class Items extends Component {
  render() {
    const { products } = this.props
    return (
      <Card>
        <div className="w-90 center">
          <div className="flex justify-between items-center">
            <div className="f4 fw7">
              Items
            </div>
            <div>
              <Pagination
                pages={
                  this.props.query
                    ? products.search.paging.pages
                    : products.collection.paging.pages
                }
                currentPage={this.props.currentPage}
                from={
                  this.props.query
                    ? products.search.paging._from
                    : products.collection.paging._from
                }
                to={
                  this.props.query
                    ? products.search.paging._to
                    : products.collection.paging._to
                }
                onChange={this.props.onChangePage}
              />
            </div>
          </div>
          <div className="flex items-baseline w-100 justify-between">
            <div className="pt6 flex-auto">
              <Search
                value={this.props.query}
                onChange={this.props.onChangeSearch}
              />
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
            {this.props.loading
              ? <div className="flex flex-column items-center pa10">
                <Loading />
              </div>
              : this.props.query &&
                  this.props.query.length > 0 &&
                  this.props.products.variables.searchQuery === this.props.query
                ? products.search.items.length === 0
                  ? <EmptySearch />
                  : <Result
                    isSearch
                    products={products.search.items}
                    selectedSkus={this.props.selectedSkus}
                    selectionState={this.props.selections}
                    onChangeSelection={this.props.onChangeSelection}
                  />
                : this.props.selectedSkus.length > 0 &&
                      products.collection.items.length > 0
                  ? <Result
                    isCollection
                    products={products.collection.items}
                    selectedSkus={this.props.selectedSkus}
                    selectionState={this.props.selections}
                    onChangeSelection={this.props.onChangeSelection}
                  />
                  : <EmptyCollection />}
          </div>
        </div>
      </Card>
    )
  }
}

Items.propTypes = {
  loading: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  selectedSkus: PropTypes.array,
  selections: PropTypes.object,
  query: PropTypes.string,
  products: PropTypes.object.isRequired,
  onChangeSelection: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeSearch: PropTypes.func.isRequired,
}

export default Items
