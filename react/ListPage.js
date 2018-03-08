import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { FormattedMessage, FormattedDate } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'
import Input from '@vtex/styleguide/lib/Input'

import Pagination from './components/Pagination/index'

class ListPage extends Component {
  handlePageChange = page => {
    this.props.changePage(page)
  };

  handleOpenCollection = id => {
    window.location.href = `/admin/collections/${id || 'new'}`
  };

  render() {
    const { data } = this.props

    return (
      <div className="pv8 ph3 near-black bg-near-white w-100">
        <div className="w-90 center">
          <div
            className="flex justify-between items-center bb b--light-gray pb6"
          >
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
              <Input placeholder="Search by collection name…" />
            </div>
            <Pagination
              currentPage={parseInt(data.variables.page, 10)}
              pages={parseInt(data.collections.totalPages, 10)}
              onChange={this.handlePageChange}
            />
          </div>
          {data.loading
            ? <FormattedMessage id="loading" />
            : <div
              className="w-100 bg-white mt7 pv7 br2"
              style={{ boxShadow: '0 3px 9px 0 rgba(61, 62, 64, 0.2)' }}
            >
              <table className="tl pt4 w-90 center" cellSpacing="0">
                <thead className="">
                  <tr>
                    <th
                      className="fw3 gray pb4 ttu f7 w-40-l w-30-ns mt6 pl6"
                    >
                        Name
                    </th>
                    <th className="fw3 gray pb4 ttu f7 w-20 mt6">Start</th>
                    <th className="fw3 gray pb4 ttu f7 w-20 mt6">End</th>
                    <th className="fw3 gray pb4 ttu f7 w-10 mt6">
                        Highlight
                    </th>
                    <th className="fw3 gray pb4 ttu f7 w-10 mt6">
                        Searchable
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.data.collections.collections.map(collection => {
                    return (
                      <tr
                        key={collection.id}
                        className="pointer hover-bg-near-white"
                        onClick={() =>
                          this.handleOpenCollection(collection.id)}
                      >
                        <td className="fw7 pv6 bt b--light-gray pl4">
                          <div className="flex items-center">
                            <div>
                              <div className="bg-green dib pa2 br-100" />
                            </div>
                            <div className="pl3">{collection.name}</div>
                          </div>
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
                          <div
                            className={
                              `br-pill ${collection.highlight ? 'bg-washed-blue blue' : 'bg-near-white mid-gray'} f6 pv2 ph3 dib fw5`
                            }
                          >
                            {collection.highlight ? 'Active' : 'Inactive'}
                          </div>
                        </td>
                        <td className="fw4 pv6 bt b--light-gray">
                          <div
                            className={
                              `br-pill ${collection.searchable ? 'bg-washed-blue blue' : 'bg-near-white mid-gray'} f6 pv2 ph3 dib fw5`
                            }
                          >
                            {collection.highlight ? 'Active' : 'Inactive'}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>}
        </div>
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
