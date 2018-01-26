import React, { Component } from 'react'
import 'vtex-tachyons'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'
import Input from '@vtex/styleguide/lib/Input'

class Collection extends Component {
  render() {
    console.log('Collection', this.props)
    const { data } = this.props

    return (
      <div className="h-100" style={{backgroundColor:'#F2F2F2'}} >
        <div className="w-40-l center pv6">
          <div className="fw7 f2">
            New collection
          </div>
          <div className="bg-white pa6 mt6 br2 shadow-4">
            <div>
              <label for="name">Collection name</label>
              <div className="pt3">
                <Input id="name" htmlProps={{ placeholder: 'Name' }} />
              </div>
            </div>
            <div classNamme="flex">
              <div className="mt4">
                <label for="start">From</label>
                <div className="flex pt3">
                  <div>
                    <Input id="start" htmlProps={{ placeholder: 'dd/mm/yyyy' }} />
                  </div>
                  <div className="ml3">
                    <Input htmlProps={{ placeholder: '12:00' }} />
                  </div>
                </div>
              </div>
              <div className="mt4">
                <label for="end">To</label>
                <div className="flex pt3">
                  <div>
                    <Input id="end" htmlProps={{ placeholder: 'dd/mm/yyyy' }} />
                  </div>
                  <div className="ml3">
                    <Input htmlProps={{ placeholder: 'Name' }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="pr2">breno bota o toggle</div>
              <span>Highlight</span>
            </div>
            <div className="flex">
              <div className="pr2">breno bota o toggle</div>
              <span>Searchable</span>
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
              <Button secondary>
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
