import React, { Component } from 'react'
import 'vtex-tachyons'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { FormattedMessage, FormattedDate } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'
import Toggle from '@vtex/styleguide/lib/Toggle'
import Input from '@vtex/styleguide/lib/Input'

import ArrowLeft from './images/small-left.svg'
import ArrowRight from './images/small-right.svg'

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
          <div className="flex">
            <div className="flex bt bl bb b--light-gray bw1 br2 br--left" style={{ visibility: data.variables.page === 1 ? '' : '' }}>
              <button onClick={this.handlePreviousPage} className="bn f6 pv3 ph4 pointer hover-bg-washed-blue flex items-center">
                <img src={ArrowLeft} />
              </button>
            </div>
            <div className="dib">
              <input className="ba b--light-gray f6 pa3 bw1 dib w2 tc" value={this.props.data.collections.page} />
            </div>
            <div className="flex bt br bb b--light-gray bw1 br2 br--right" style={{ visibility: data.collections.totalPages === data.variables.page ? '' : '' }}>
              <button onClick={this.handleNextPage} className="bn f6 pv3 ph4 pointer hover-bg-washed-blue flex items-center">
                <img src={ArrowRight} />
              </button>
            </div>
          </div>
        </div>
        {data.loading
          ? <FormattedMessage id="loading" />
          : <div className="w-100">
              <table className="tl pt6 w-100" cellSpacing="0">
              <thead className="">
                <tr>
                  <th className="fw3 gray pb2 ttu f7 w-40">Name</th>
                  <th className="fw3 gray pb2 ttu f7 w-20">Start</th>
                  <th className="fw3 gray pb2 ttu f7 w-20">End</th>
                  <th className="fw3 gray pb2 ttu f7 w-10">Highlight</th>
                  <th className="fw3 gray pb2 ttu f7 w-10">Searchable</th>
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
                      <td className="fw7 pv6 bt b--light-gray pl4">
                        <div className="flex items-center">
                          <div>
                            <div className="bg-green dib pa2 br-100"></div>
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
                        <div className={`br-pill ${collection.highlight ? 'bg-washed-blue blue' : 'bg-near-white mid-gray'} f6 pv2 ph3 dib fw5`} >
                          {collection.highlight ? 'Active' : 'Inactive'}
                        </div>
                      </td>
                      <td className="fw4 pv6 bt b--light-gray">
                        <div className={`br-pill ${collection.searchable ? 'bg-washed-blue blue' : 'bg-near-white mid-gray'} f6 pv2 ph3 dib fw5`} >
                          {collection.highlight ? 'Active' : 'Inactive'}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        }
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
