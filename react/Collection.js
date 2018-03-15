import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import debounce from 'debounce'
import reduce from 'lodash/reduce'

import Button from '@vtex/styleguide/lib/Button'
import Config from './components/Config'
import withNavigate from './components/withNavigate'
import Alert from '@vtex/styleguide/lib/Alert'
import Loading from './components/Loading'
import Group from './components/Group'
import AddIcon from './AddIcon'

class Collection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPage: 1,
      searchQuery: props.searchQuery,
      selections: { product: {} },
      groups: this.getGroups(props),
      config: this.mapCollectionConfig(props),
    }
  }

  getGroups(props) {
    return !props.collectionData.loading && props.collectionData.collection && props.collectionData.collection.id
      ? props.collectionData.collection.groups
      : { items: [{
        name: '',
        type: 'I',
        preSale: false,
        release: false,
        brands: [],
        categories: [],
        skus: [],
      }] }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      config: this.mapCollectionConfig(nextProps),
      groups: this.getGroups(nextProps),
    })
  }

  mapCollectionConfig(props) {
    const collection = props.collectionData && !props.collectionData.loading
      ? props.collectionData.collection || {}
      : {}

    return {
      name: collection.name || '',
      dateFrom: collection.dateFrom || new Date().toISOString(),
      dateTo: collection.dateTo || new Date().toISOString(),
      highlight: collection.highlight !== undefined && collection.highlight !== null
        ? collection.highlight
        : false,
      searchable: collection.searchable !== undefined && collection.searchable !== null
        ? collection.searchable
        : false,
    }
  }

  handleChangeConfig = ({ field, value }) => {
    this.setState(prevState => ({
      config: {
        ...prevState.config,
        [field]: value,
      },
    }))
  };

  handleCancel = () => {
    this.props.navigate({ to: '/admin/collections' })
  };

  handleSave = () => {
    if (!this.props.params.id) {
      this.props
        .createCollection({
          variables: {
            ...this.state.config,
            groups: this.state.groups.items,
          },
        })
        .then(() => {
          this.props.navigate({ to: '/admin/collections' })
        })
    } else {
      // TODO update
      this.props.navigate({ to: '/admin/collections' })
    }
  };

  hasNoGroup = () => {
    return !(this.props.collectionData && this.props.collectionData.collection && this.props.collectionData.collection.groups && this.props.collectionData.collection.groups.items.length > 0)
  }

  handleChangeGroup = (groupIndex, data) => {
    this.setState(prevState => ({
      groups: {
        ...prevState.groups,
        items: prevState.groups.items.map((group, index) => {
          if (index === groupIndex) {
            return data
          }
          return group
        }),
      },
    }), () => {
      const group = this.state.groups.items.find((group, index) => {
        if (index === groupIndex) return group
      })

      if (!group) {
        console.log('Opa')
        return
      }

      this.props
        .updateGroup({
          variables: {
            collectionId: this.props.params.id,
            ...group,
          },
        })
        .then(() => {
          this.props.navigate({ to: '/admin/collections' })
        })
    })
  }

  render() {
    return (
      <div className="pv8 ph3 near-black bg-near-white w-100 h-100">
        <div className="w-90 center">
          <div
            className="flex justify-between items-center bb b--light-gray pb6 mb6"
          >
            <div className="fw7 f2">
              Collections
            </div>
            <div>
              <div className="pr5 dib">
                <Button onClick={this.handleCancel}>
                  cancel
                </Button>
              </div>
              <Button primary onClick={this.handleSave}>
                save collection
              </Button>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="w-25">
              {this.props.collectionData.loading
                ? null
                : <Config
                  collection={this.state.config}
                  onChange={this.handleChangeConfig}
                />}
            </div>
            <div className="w-75 ml5 mb5">
              {this.props.collectionData.loading
                ? <div className="flex flex-column items-center pa10">
                  <Loading />
                </div>
                : <div>
                  {this.hasNoGroup() && <div className="mb5 ba b--blue br2">
                    <Alert>
                      Products are added to the collection by groups of conditions.
                    </Alert>
                  </div>}
                  {this.state.groups.items.map(
                    (group, index) => (
                      <Group
                        key={group.id || index}
                        index={index}
                        data={group}
                        collectionId={
                          this.props.collectionData.collection && this.props.collectionData.collection.id || null
                        }
                        onChange={this.handleChangeGroup}
                      />
                    )
                  )}
                  <div className="tc mt7">
                    <Button secondary>
                      <div className="flex items-center">
                        <AddIcon /> <span className="ml2">Add new group</span>
                      </div>
                    </Button>
                  </div>
                </div>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Collection.propTypes = {
  searchQuery: PropTypes.string,
  collectionData: PropTypes.object,
  products: PropTypes.object,
  params: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
  saveCollection: PropTypes.func.isRequired,
}

const createCollection = gql`
  mutation createCollection(
    $name: String
    $searchable: Boolean
    $highlight: Boolean
    $dateFrom: String
    $dateTo: String
  ) {
    createCollection(
      name: $name
      searchable: $searchable
      highlight: $highlight
      dateFrom: $dateFrom
      dateTo: $dateTo
      groups: $groups
    )
  }
`

const updateGroup = gql`
  mutation updateGroup(
    $collectionId: Int
    $name: String
    $type: String
    $preSale: Boolean
    $release: Boolean
    $brands: [Int]
    $categories: [Int]
    $skus: [Int]
  ) {
    updateGroup(
      collectionId: $collectionId
      name: $name
      type: $type
      preSale: $preSale
      release: $release
      brands: $brands
      categories: $categories
      skus: $skus
    )
  }
`

const collectionQuery = gql`
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
      groups {
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
        }
      }
    }
  }
`

const CollectionContainer = compose(
  graphql(collectionQuery, {
    name: 'collectionData',
    options({ params }) {
      return {
        errorPolicy: params.id ? 'all' : 'none',
        variables: {
          id: parseInt(params.id, 10),
          page: 1,
          pageSize: 10,
        },
      }
    },
  }),
  graphql(createCollection, { name: 'createCollection' }),
  graphql(updateGroup, { name: 'updateGroup' }),
  withNavigate()
)(Collection)

CollectionContainer.defaultProps = {
  collectionFrom: 0,
  collectionTo: 9,
  searchQuery: '',
  queryFrom: 0,
  queryTo: 9,
}

export default CollectionContainer
