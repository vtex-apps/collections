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
    this.productsRefetch = debounce(this.productsRefetch.bind(this), 400)
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
      dateFrom: collection.dateFrom || new Date(),
      dateTo: collection.dateTo || new Date(),
      highlight: collection.highlight !== undefined
        ? collection.highlight
        : false,
      searchable: collection.searchable !== undefined
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

  handleChangeSearch = e => {
    const searchQuery = e.target.value
    const newState = { searchQuery, queryFrom: 0, queryTo: 9 }

    this.productsRefetch({
      ...this.props.products.variables,
      ...newState,
    })

    this.setState(newState)
  };

  productsRefetch(variables) {
    this.props.products.refetch(variables)
  }

  handleChangePage = (page, from, to) => {
    this.props.products.refetch({
      ...this.props.products.variables,
      ...(this.state.searchQuery
        ? { queryFrom: from, queryTo: to }
        : { collectionFrom: from, collectionTo: to }),
    })
    this.setState({ currentPage: page })
  };

  handleChangeSelection = changes => {
    this.setState(prevState => changes.reduce(this.doChange, prevState))
  };

  doChange = (prevState, change) => {
    return {
      ...prevState,
      selections: {
        ...prevState.selections,
        product: {
          ...prevState.selections.product,
          [change.productId]: {
            ...(prevState.selections.product[change.productId] || {}),
            skus: {
              ...((prevState.selections.product[change.productId] &&
                prevState.selections.product[change.productId].skus) || {}),
              ...(change.type === 'SKU'
                ? { [change.skuId]: { checked: change.checked } }
                : {}),
            },
          },
        },
      },
    }
  };

  save = () => {
    this.props
      .saveCollection({
        variables: {
          ...this.state.config,
          groups: [
            {
              name: 'Foobar I',
              type: 'I',
              preSale: false,
              release: false,
              brands: [],
              categories: [],
              skus: reduce(
                this.state.selections.product,
                (acc, product) => {
                  return acc.concat(
                    reduce(product.skus, (acc, _, skuId) => acc.concat(skuId), [
                    ])
                  )
                },
                []
              ),
            },
          ],
        },
      })
      .then(() => {
        this.props.collectionData.refetch()
      })
  };

  handleCancel = () => {
    this.props.navigate({ to: '/admin/collections' })
  };

  handleSave = () => {
    this.save()
  };

  handleChangeCategory = category => {
    this.setState({ category })
  };

  hasNoGroup = () => {
    return !(this.props.collectionData && this.props.collectionData.collection && this.props.collectionData.collection.groups && this.props.collectionData.collection.groups.items.length > 0)
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
                        data={group}
                        collectionId={
                          this.props.collectionData.collection && this.props.collectionData.collection.id || null
                        }
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

const collectionMutation = gql`
  mutation collection(
    $name: String
    $searchable: Boolean
    $highlight: Boolean
    $dateFrom: String
    $dateTo: String
    $groups: [GroupInput]
  ) {
    collection(
      name: $name
      searchable: $searchable
      highlight: $highlight
      dateFrom: $dateFrom
      dateTo: $dateTo
      groups: $groups
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
  graphql(collectionMutation, { name: 'saveCollection' }),
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
