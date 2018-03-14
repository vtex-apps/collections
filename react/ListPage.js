import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedDate } from 'react-intl'
import withNavigate from './components/withNavigate'

import Button from '@vtex/styleguide/lib/Button'
import Input from '@vtex/styleguide/lib/Input'

import Pagination from './components/Pagination/index'
import Badge from './components/Badge'
import Card from './components/Card'
import Status from './components/Status'
import Loading from './components/Loading'
import SearchCollections from './components/graphql/SearchCollections'
import EmptyCollectionSearch
  from './components/EmptyStates/EmptyCollectionSearch'

class ListPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchKey: '',
      page: 1,
    }
  }

  handleChangePage = page => {
    this.setState({ page })
  };

  handleChangeSearchKey = e => {
    const value = e.target.value
    this.setState({ searchKey: value, page: 1 })
  };

  handleOpenCollection = id => {
    this.props.navigate({ to: `/admin/collections/${id}` })
  };

  handleClickNewCollection = () => {
    this.props.navigate({ to: '/admin/collections/new' })
  };

  render() {
    return (
      <SearchCollections
        searchKey={this.state.searchKey}
        page={this.state.page}
      >
        {({ loading, collections }) => {
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
                    <Input
                      type="search"
                      placeholder="Search by collection's name or ID…"
                      value={this.state.searchKey}
                      onChange={this.handleChangeSearchKey}
                    />
                  </div>
                  <Pagination
                    onChange={this.handleChangePage}
                    currentPage={parseInt(this.state.page, 10)}
                    pages={
                      collections && collections.paging
                        ? parseInt(collections.paging, 10)
                        : Infinity
                    }
                  />
                </div>
                {loading
                  ? <Card>
                    <div className="flex flex-column items-center pa10">
                      <Loading />
                    </div>
                  </Card>
                  : collections && collections.items.length === 0
                    ? <Card><EmptyCollectionSearch /></Card>
                    : <Card>
                      <table className="tl pt4 w-90 center" cellSpacing="0">
                        <thead className="">
                          <tr>
                            <th
                              className="fw3 gray pb4 ttu f7 w-40-l w-30-ns mt6 pl6"
                            >
                                  Name
                            </th>
                            <th className="fw3 gray pb4 ttu f7 w-20 mt6">
                                  Start
                            </th>
                            <th className="fw3 gray pb4 ttu f7 w-20 mt6">
                                  End
                            </th>
                            <th className="fw3 gray pb4 ttu f7 w-10 mt6">
                                  Highlight
                            </th>
                            <th className="fw3 gray pb4 ttu f7 w-10 mt6">
                                  Searchable
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {collections &&
                                collections.items.length > 0 &&
                                collections.items.map(collection => {
                                  return (
                                    <tr
                                      key={collection.id}
                                      className="pointer hover-bg-near-white"
                                      onClick={() =>
                                        this.handleOpenCollection(
                                          collection.id
                                        )}
                                    >
                                      <td
                                        className="fw7 pv6 bt b--light-gray pl4"
                                      >
                                        <div className="flex items-center">
                                          <div>
                                            <Status type="active" />
                                          </div>
                                          <div className="pl3">
                                            {collection.name}
                                          </div>
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
                                            collection.highlight
                                              ? 'active'
                                              : 'inactive'
                                          }
                                        >
                                          {collection.highlight
                                            ? 'Active'
                                            : 'Inactive'}
                                        </Badge>
                                      </td>
                                      <td className="fw4 pv6 bt b--light-gray">
                                        <Badge
                                          type={
                                            collection.searchable
                                              ? 'active'
                                              : 'inactive'
                                          }
                                        >
                                          {collection.searchable
                                            ? 'Active'
                                            : 'Inactive'}
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
        }}
      </SearchCollections>
    )
  }
}

ListPage.propTypes = {
  navigate: PropTypes.func.isRequired,
  query: PropTypes.object,
}

export default withNavigate()(ListPage)
