import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'
import Input from '@vtex/styleguide/lib/Input'

class ListPage extends Component {
  handleNextPage = () => {
    this.props.changePage(this.props.data.variables.page + 1)
  }

  handlePreviousPage = () => {
    this.props.changePage(this.props.data.variables.page - 1)
  }

  handleNewCollectionClick = () => {
    alert('go to other page')
  }

  render() {
    console.log(this.props)
    const { data } = this.props

    if (data.loading) {
      return <FormattedMessage id="store-graphql.loading" />
    }

    return (
      <div className="pv6 ph3 w-90 center">
        <div className="flex justify-between">
          <div className="fw7 f2">
            Collections
          </div>
          <Button primary htmlProps={{
            onClick: this.handleNewCollectionClick,
          }}>
            New collection
          </Button>
        </div>
        <div className="flex justify-between pt6 w-100">
          <div className="w-90">
            <Input htmlProps={{ placeholder: 'Search by collection name…' }} />
          </div>
          <div>
            Total of pages: {this.props.data.collections.totalPages}
          </div>
        </div>
        <table className="w-100 tl pt6">
          <thead>
            <tr>
              <th className="fw3 gray pb2 ttu">Name</th>
              <th className="fw3 gray pb2 ttu">Start</th>
              <th className="fw3 gray pb2 ttu">End</th>
              <th className="fw3 gray pb2 ttu">Status</th>
              <th className="fw3 gray pb2 ttu">Highlight</th>
              <th className="fw3 gray pb2 ttu">Searchable</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.collections.collections.map((collection) => {
              return (
                <tr key={collection.id}>
                  <td className="fw7 pv4 bt b--black-10 w-20">{collection.name}</td>
                  <td className="fw4 pv4 bt b--black-10 w-20">25/06/2018</td>
                  <td className="fw4 pv4 bt b--black-10 w-20">25/06/2020</td>
                  <td className="fw4 pv4 bt b--black-10 w-10">Active</td>
                  <td className="fw4 pv4 bt b--black-10 w-10">{collection.highlight ? 'Active' : 'Inactive'}</td>
                  <td className="fw4 pv4 bt b--black-10 w-10">{collection.searchable ? 'Active' : 'Inactive'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

ListPage.propTypes = {
  changePage: PropTypes.func.isRequired,
}

const query = gql`
  query Collections(
    $page: Int
    $size: Int
  ) {
    collections(
      page: $page
      size: $size
    ) {
      page,
      size,
      totalPages,
      collections {
        id,
        name,
        searchable,
        highlight,
        dateFrom,
        dateTo,
      }
    }
  }
`

const options = {
  options: ({ page = 1, size = 20 }) => ({
    variables: {
      page,
      size,
    }
  })
}

export default graphql(query, options)(ListPage)
