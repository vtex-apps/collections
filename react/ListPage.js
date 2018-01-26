import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'

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
      <div className="pa4 w-90 center">
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
        <div className="flex justify-between pt5">
          <div>
            Search by collection's name or ID
          </div>
          <div>
            Total of pages: {this.props.data.collections.TotalPage}
          </div>
        </div>
        <table className="w-100 tl pt5">
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
            {this.props.data.collections.Data.map((collection) => {
              return (
                <tr key={collection.Id}>
                  <td className="fw7 pv4 bt b--black-10 w-20">{collection.Name}</td>
                  <td className="fw4 pv4 bt b--black-10 w-20">25/06/2018</td>
                  <td className="fw4 pv4 bt b--black-10 w-20">25/06/2020</td>
                  <td className="fw4 pv4 bt b--black-10 w-10">Active</td>
                  <td className="fw4 pv4 bt b--black-10 w-10">{collection.Highlight ? 'Active' : 'Inactive'}</td>
                  <td className="fw4 pv4 bt b--black-10 w-10">{collection.Searchable ? 'Active' : 'Inactive'}</td>
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
      Page,
      Size,
      TotalRows,
      TotalPage,
      Data {
        Id,
        Name,
        Searchable,
        Highlight,
        DateFrom,
        DateTo,
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
