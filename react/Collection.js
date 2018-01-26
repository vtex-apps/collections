import React, { Component } from 'react'
import 'vtex-tachyons'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'
import Input from '@vtex/styleguide/lib/Input'
import Toggle from './Toggle'

class Collection extends Component {
  constructor(props) {
    super(props)

    this.state = props && props.data && props.data.collection
      ? props.data.collection
      : {}
  }

  componentWillReceiveProps(nextProps) {
    const collection = nextProps.data.collection
    this.setState(collection)
  }

  handleChangeHighlight = () => {
    this.setState({ highlight: !this.state.highlight })
  }

  handleChangeSearchable = (searchable) => {
    this.setState({ searchable: !this.state.searchable })
  }

  handleChangeName = (name) => {
    this.setState({ name })
  }

  backToList() {
    window.location.href = '/admin/collections'
  }

  render() {
    if (this.props.data.loading) {
      return <FormattedMessage id="store-graphql.loading" />
    }

    const collection = this.state

    return (
      <div className="h-100" style={{backgroundColor:'#F2F2F2'}} >
        <div className="w-40-l center pv6">
          <div className="fw7 f2">
            Collection
          </div>
          <div className="bg-white pa6 mt6 br2 shadow-4">
            <div>
              <label for="name">Collection name</label>
              <div className="pt3">
                <Input
                  id="name"
                  onChange={this.handleChangeName}
                  htmlProps={{ placeholder: 'Name', value: collection.name }} />
              </div>
            </div>
            <div className="flex pt5">
              <div className="pr2">
                <Toggle
                  secondary
                  onClick={this.handleChangeHighlight}
                  checked={collection.highlight}>
                  <span className="pl3">Highlight</span>
                </Toggle>
              </div>
            </div>
            <div className="flex">
              <div className="pr2 pt5">
                <Toggle
                  secondary
                  onClick={this.handleChangeSearchable}
                  checked={collection.searchable}>
                  <span className="pl3">Searchable</span>
                </Toggle>
              </div>
            </div>
          </div>
          <div className="bg-white pa6 mt6 br2 shadow-4">
            <span className="pr3">I want to</span>
            <select>
              <option value="include">Include</option>
              <option value="include">Exclude</option>
            </select>
            <span className="ph3">products by</span>
            <select>
              <option value="include">Select</option>
              <option value="include">Category</option>
              <option value="include">Brand</option>
              <option value="include">Specifications</option>
              <option value="include">SKU</option>
            </select>
          </div>
          <div className="flex justify-end pt6">
            <div clasName="pr3">
              <Button secondary>
                Add condition
              </Button>
            </div>
            <div className="mh3"></div>
            <div clasName="pr3">
              <Button secondary htmlProps={{
                onClick: this.backToList,
              }}>
                Cancel
              </Button>
            </div>
            <div className="mh3"></div>
            <div>
              <Button primary>
                Save
              </Button>
            </div>
          </div>
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
    $id: Int
  ) {
    collection(
      id: $id
    ) {
      id
      name
      searchable
      highlight
      dateFrom
      dateTo
      conditions {
        id
        name
        type
        preSale
        release
      }
    }
  }
`

const options = {
  options: ({ id }) => ({
    variables: {
      id,
    },
  }),
}

export default graphql(query, options)(Collection)
