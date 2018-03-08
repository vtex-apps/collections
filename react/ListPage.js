import React, { Component } from 'react'
import 'vtex-tachyons'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { FormattedMessage, FormattedDate } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'
import Input from '@vtex/styleguide/lib/Input'

class ListPage extends Component {
  handleNextPage = () => {
    this.props.changePage(this.props.data.variables.page + 1)
  };

  handlePreviousPage = () => {
    this.props.changePage(this.props.data.variables.page - 1)
  };

  handleOpenCollection = id => {
    window.location.href = `/admin/collections/${id || 'new'}`
  };

  render() {
    console.log(this.props)
    const { data } = this.props

    return (
      <div className="pv6 ph3 w-90 center">
        <div className="flex justify-between">
          <div className="fw7 f2">
            Collections
          </div>
          <Button primary onClick={this.handleOpenCollection}>
            New collection
          </Button>
        </div>
        <div className="flex justify-between pt6 w-100">
          <div className="w-80">
            <Input htmlProps={{ placeholder: 'Search by collection name…' }} />
          </div>
          <div>
            <div
              className="dib"
              style={{ visibility: data.variables.page === 1 ? 'hidden' : '' }}
            >
              <Button onClick={this.handlePreviousPage}>
                {'<'}
              </Button>
            </div>
            {this.props.data.collections.page}
            <div
              className="dib"
              style={{
                visibility: data.collections.totalPages === data.variables.page
                  ? 'hidden'
                  : '',
              }}
            >
              <Button onClick={this.handleNextPage}>
                {'>'}
              </Button>
            </div>
          </div>
        </div>
        {data.loading
          ? <FormattedMessage id="loading" />
          : <table className="w-100 tl pt6">
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
              {this.props.data.collections.collections.map(collection => {
                return (
                  <tr
                    key={collection.id}
                    className="pointer hover-bg-near-white"
                    onClick={() => this.handleOpenCollection(collection.id)}
                  >
                    <td className="fw7 pv4 bt b--black-10 w-20">
                      {collection.name}
                    </td>
                    <td className="fw4 pv4 bt b--black-10 w-20">
                      <FormattedDate
                        value={new Date(collection.dateFrom)}
                        day="2-digit"
                        month="2-digit"
                        year="2-digit"
                        hour="2-digit"
                        minute="2-digit"
                      />
                    </td>
                    <td className="fw4 pv4 bt b--black-10 w-20">
                      <FormattedDate
                        value={new Date(collection.dateTo)}
                        day="2-digit"
                        month="2-digit"
                        year="2-digit"
                        hour="2-digit"
                        minute="2-digit"
                      />
                    </td>
                    <td className="fw4 pv4 bt b--black-10 w-10">Active</td>
                    <td className="fw4 pv4 bt b--black-10 w-10">
                      {collection.highlight ? 'Active' : 'Inactive'}
                    </td>
                    <td className="fw4 pv4 bt b--black-10 w-10">
                      {collection.searchable ? 'Active' : 'Inactive'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>}
      </div>
    )
  }
}

ListPage.propTypes = {
  changePage: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
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
    },
  }),
}

export default graphql(query, options)(ListPage)
