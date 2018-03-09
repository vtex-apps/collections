import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Button from '@vtex/styleguide/lib/Button'
import Config from './components/Config'
import Items from './components/Items'

class EditCollection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      collection: props.collection,
      loading: props.loading,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      collection: nextProps.collection,
      loading: nextProps.loading,
    })
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
    const { loading, collection } = this.state

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

          {loading
            ? <div>Loading</div>
            : <div>
              <Config collection={collection} />
              <Items collectionId={collection.id} />
            </div>}
        </div>
      </div>
    )
  }
}

EditCollection.propTypes = {
  loading: PropTypes.bool.isRequired,
  collection: PropTypes.object,
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
  options: ({ params }) => ({
    variables: {
      id: params.id,
    },
  }),
  props: ({ data: { loading, collection } }) => {
    return {
      loading,
      collection,
    }
  },
}

export default graphql(query, options)(EditCollection)
