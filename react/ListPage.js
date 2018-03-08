import React, { Component } from 'react'
import 'vtex-tachyons'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { FormattedMessage, FormattedDate } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'
import Toggle from '@vtex/styleguide/lib/Toggle'
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
      <div className="pv6 ph3 w-90 center near-black">
        <div className="flex justify-between items-center">
          <div className="fw7 f2">
            Collections
          </div>
          <div>
            <Button primary onClick={this.handleOpenCollection}>
              New collection
            </Button>
          </div>
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
                <th className="fw3 gray pb2 ttu f7">Name</th>
                <th className="fw3 gray pb2 ttu f7">Start</th>
                <th className="fw3 gray pb2 ttu f7">End</th>
                <th className="fw3 gray pb2 ttu f7">Status</th>
                <th className="fw3 gray pb2 ttu f7">Highlight</th>
                <th className="fw3 gray pb2 ttu f7">Searchable</th>
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
                    <td className="fw7 pv6 bt b--light-gray">
                      {collection.name}
                    </td>
                    <td className="fw4 pv6 bt b--light-gray">
                      <FormattedDate
                        value={new Date(collection.dateFrom)}
                        day="2-digit"
                        month="2-digit"
                        year="2-digit"
                        hour="2-digit"
                        minute="2-digit"
                      />
                    </td>
                    <td className="fw4 pv6 bt b--light-gray">
                      <FormattedDate
                        value={new Date(collection.dateTo)}
                        day="2-digit"
                        month="2-digit"
                        year="2-digit"
                        hour="2-digit"
                        minute="2-digit"
                      />
                    </td>
                    <td className="fw4 pv6 bt b--light-gray">
                      <div>
                        <div className="br-pill bg-washed-blue blue f6 pa2">
                          Active
                        </div>
                      </div>
                    </td>
                    <td className="fw4 pv6 bt b--light-gray">
                      <Toggle checked={collection.highlight} />
                    </td>
                    <td className="fw4 pv6 bt b--light-gray">
                      <Toggle checked={collection.searchable} />
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
