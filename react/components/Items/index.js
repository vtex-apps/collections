import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Card from '../Card'
import Search from './Search'
import Result from './Result/index'
import Pagination from '../Pagination/index'

import Dropdown from '@vtex/styleguide/lib/Dropdown'
import EmptyCollection from './Result/EmptyCollection'
import Loading from './Result/Loading'

import EmptySearch from './Result/EmptySearch'

class Items extends Component {
  render() {
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
                  this.props.loading
                    ? Infinity
                    : this.props.query
                      ? this.props.productsSearch.paging.pages
                      : this.props.productsCollection.paging.pages
                }
                currentPage={
                  this.props.query
                    ? this.props.productsSearch.paging.page
                    : this.props.productsCollection.paging.page
                }
                from={
                  this.props.query
                    ? this.props.productsSearch.paging._from
                    : this.props.productsCollection.paging._from
                }
                to={
                  this.props.query
                    ? this.props.productsSearch.paging._to
                    : this.props.productsCollection.paging._to
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
              : this.props.query && this.props.query.length > 0
                ? this.props.productsSearch.items.length === 0
                  ? <EmptySearch />
                  : <Result
                    isSearch
                    products={this.props.productsSearch.items}
                    selectedSkus={this.props.selectedSkus}
                    selectionState={this.props.selections}
                    onChangeSelection={this.props.onChangeSelection}
                  />
                : this.props.selectedSkus.length > 0 &&
                      this.props.productsCollection.items.length > 0
                  ? <Result
                    isCollection
                    products={this.props.productsCollection.items}
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
  selectedSkus: PropTypes.array,
  selections: PropTypes.object,
  query: PropTypes.string,
  queryFrom: PropTypes.number,
  queryTo: PropTypes.number,
  collectionFrom: PropTypes.number,
  collectionTo: PropTypes.number,
  productsCollection: PropTypes.object.isRequired,
  productsSearch: PropTypes.object.isRequired,
  onChangeSelection: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeSearch: PropTypes.func.isRequired,
}

export default Items
