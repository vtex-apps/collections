import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'
import Config from '../components/Config'
import Items from '../components/Items'

class Collection extends Component {
  constructor(props) {
    super(props)

    this.state = props && props.data && props.data.collection
      ? {
        ...props.data.collection,
      }
      : {}
  }

  componentWillReceiveProps(nextProps) {
    const collection = nextProps.data.collection
    this.setState(collection)
  }

  handleChangeHighlight = () => {
    this.setState({ highlight: !this.state.highlight })
  };

  handleChangeSearchable = () => {
    this.setState({ searchable: !this.state.searchable })
  };

  handleChangeName = e => {
    this.setState({ name: e.target.value })
  };

  handleCancel() {
    window.location.href = '/admin/collections'
  }

  render() {
    if (this.props.data.loading) {
      return <FormattedMessage id="store-graphql.loading" />
    }

    const collection = this.state

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
              <div className="pr5 dib">
                <Button onClick={this.handleClickNewCollection}>
                  cancel
                </Button>
              </div>
              <Button primary onClick={this.handleClickNewCollection}>
                save
              </Button>
            </div>
          </div>
          <Config collection={collection} />
          <Items />
        </div>
      </div>
    )
  }
}

Collection.propTypes = {
  data: PropTypes.object.isRequired,
}

const query = gql`
  query Collection(
    $id: Int,
    $page: Int,
    $pageSize: Int,
  ) {
    collection(
      id: $id,
      page: $page,
      pageSize: $pageSize,
    ) {
      id
      name
      searchable
      highlight
      dateFrom
      dateTo
      conditions {
        paging {
          page
          perPage
          total
          pages
        }
        items {
          id
          name
          type
          preSale
          release
          brands
          categories
          skus
          products
        }
      }
    }
  }
`

const options = {
  options: ({ id, page, pageSize }) => ({
    variables: {
      id,
      page,
      pageSize,
    },
  }),
}

export default graphql(query, options)(Collection)
