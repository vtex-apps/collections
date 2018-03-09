import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { FormattedMessage, FormattedDate } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'
import Input from '@vtex/styleguide/lib/Input'

import Pagination from '../components/Pagination/index'
import Badge from '../components/Badge'
import Card from '../components/Card'
import Status from '../components/Status'

class ListPage extends Component {
  handlePageChange = page => {
    this.props.changePage(page)
  };

  handleOpenCollection = id => {
    window.location.href = `/admin/collections/${id}`
  };

  handleClickNewCollection = () => {
    window.location.href = '/admin/collections/new'
  };

  render() {
    const { data } = this.props

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
              <Button primary onClick={this.handleClickNewCollection}>
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
            : <Card>
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
                              <Status type="active" />
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
                          <Badge
                            type={
                              collection.highlight ? 'active' : 'inactive'
                            }
                          >
                            {collection.highlight ? 'Active' : 'Inactive'}
                          </Badge>
                        </td>
                        <td className="fw4 pv6 bt b--light-gray">
                          <Badge
                            type={
                              collection.searchable ? 'active' : 'inactive'
                            }
                          >
                            {collection.searchable ? 'Active' : 'Inactive'}
                          </Badge>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </Card>}
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