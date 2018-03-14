import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Card from '../Card'
import Search from './Search'
import Result from './Result/index'
import Pagination from '../Pagination/index'

import Dropdown from '@vtex/styleguide/lib/Dropdown'
import Button from '@vtex/styleguide/lib/Button'
import EmptyCollection from '../EmptyStates/EmptyCollection'
import EmptySearch from '../EmptyStates/EmptySearch'
import Loading from '../Loading'

class Items extends Component {
  getPages() {
    return this.hasData()
      ? this.props.query
        ? this.props.products.search.paging.pages
        : this.props.products.collection.paging.pages
      : Infinity
  }

  getFrom() {
    return this.hasData()
      ? this.props.query
        ? this.props.products.search.paging._from
        : this.props.products.collection.paging._from
      : null
  }

  getTo() {
    return this.hasData()
      ? this.props.query
        ? this.props.products.search.paging._to
        : this.props.products.collection.paging._to
      : null
  }

  hasData() {
    return this.props.products &&
      (this.props.products.search || this.props.products.collection)
  }

  render() {
    const { products } = this.props

    return (
      <Card>
        <div className="w-100 center">
          <div>
            <div className="f3 fw7 w-50">
              Name this group
            </div>
          </div>
          <div className="flex items-end w-100 justify-between pt6">
            <div className="flex-auto">
              <Search
                value={this.props.query}
                onChange={this.props.onChangeSearch}
              />
            </div>
            <div className="ml4">
              <Pagination
                pages={this.getPages()}
                from={this.getFrom()}
                to={this.getTo()}
                currentPage={this.props.currentPage}
                onChange={this.props.onChangePage}
              />
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
          <div className="pt6 nl5">
            <div>
              <Button>Save group</Button>
              <Button>Cancel</Button>
            </div>
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
