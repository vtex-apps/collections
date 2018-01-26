import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'
import Input from '@vtex/styleguide/lib/Input'

class Shelf extends Component {
  render() {
    const { data } = this.props

    return (
      <div className="bg-gray">
        <div className="w-50-l center">
          <div className="fw7 f2">
            New collection
          </div>
          <div className="bg-white pa6">
            <div>
              <label for="name">Collection name</label>
              <div className="pt3">
                <Input id="name" htmlProps={{ placeholder: 'Name' }} />
              </div>
            </div>
            <div>
              <div>
                <label for="start">From</label>
                <div className="flex pt3">
                  <Input id="start" htmlProps={{ placeholder: 'dd/mm/yyyy' }} />
                  <Input htmlProps={{ placeholder: '12:00' }} />
                </div>
              </div>
              <div>
                <label for="end">To</label>
                <div className="flex pt3">
                  <Input id="end" htmlProps={{ placeholder: 'dd/mm/yyyy' }} />
                  <Input htmlProps={{ placeholder: 'Name' }} />
                </div>
              </div>
            </div>
            <div className="flex">
              <span>Highlight</span>
            </div>
            <div className="flex">
              <span>Searchable</span>
            </div>
          </div>
          <div className="bg-white mt6 pv5">
            I want to include products by select
          </div>
          <Button primary>
            Save
          </Button>
        </div>
      </div>
    )
  }
}

Shelf.propTypes = {
  data: PropTypes.object.isRequired,
}

const query = gql`
  {
    collections {
      Page,
      Size,
      TotalRows,
      TotalPage,
      Data {
        Id,
        Name,
        Searchable,
        Highlight,
        DateFrom,
        DateTo,
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

export default graphql(query, options)(Shelf)
