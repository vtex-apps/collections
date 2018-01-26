import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

class Shelf extends Component {
  render() {
    const { data } = this.props

    return (
      <div className="pa4 w-90 center">
        <div className="flex justify-between">
          <div className="fw7 f2">
            Collections
          </div>
          <button>
            NEW COLLECTION
          </button>
        </div>
        <div className="flex justify-between pt5">
          <div>
            Search by collection's name or ID
          </div>
          <div>
            Total of pages: 125
          </div>
        </div>
        <table className="w-100 tl pt5">
          <thead>
            <tr>
              <th className="fw3 gray pb2">NAME</th>
              <th className="fw3 gray pb2">START</th>
              <th className="fw3 gray pb2">END</th>
              <th className="fw3 gray pb2">PRODUCTS</th>
              <th className="fw3 gray pb2">STATUS</th>
              <th className="fw3 gray pb2">HIGHLIGHT</th>
              <th className="fw3 gray pb2">SEARCHABLE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="fw7 pv4 bt b--black-10 w-20">Winter 2018</td>
              <td className="fw4 pv4 bt b--black-10 w-20">25/06/2018</td>
              <td className="fw4 pv4 bt b--black-10 w-20">25/06/2018</td>
              <td className="fw4 pv4 bt b--black-10 w-10">65</td>
              <td className="fw4 pv4 bt b--black-10 w-10">Active</td>
              <td className="fw4 pv4 bt b--black-10 w-10">Active</td>
              <td className="fw4 pv4 bt b--black-10 w-10">Inactive</td>
            </tr>
            <tr>
              <td className="fw7 pv4 bt b--black-10">Winter 2018</td>
              <td className="fw4 pv4 bt b--black-10">25/06/2018</td>
              <td className="fw4 pv4 bt b--black-10">25/06/2018</td>
              <td className="fw4 pv4 bt b--black-10">65</td>
              <td className="fw4 pv4 bt b--black-10">Active</td>
              <td className="fw4 pv4 bt b--black-10">Active</td>
              <td className="fw4 pv4 bt b--black-10">Inactive</td>
            </tr>
            <tr>
              <td className="fw7 pv4 bt b--black-10">Winter 2018</td>
              <td className="fw4 pv4 bt b--black-10">25/06/2018</td>
              <td className="fw4 pv4 bt b--black-10">25/06/2018</td>
              <td className="fw4 pv4 bt b--black-10">65</td>
              <td className="fw4 pv4 bt b--black-10">Active</td>
              <td className="fw4 pv4 bt b--black-10">Active</td>
              <td className="fw4 pv4 bt b--black-10">Inactive</td>
            </tr>
            <tr>
              <td className="fw7 pv4 bt b--black-10">Winter 2018</td>
              <td className="fw4 pv4 bt b--black-10">25/06/2018</td>
              <td className="fw4 pv4 bt b--black-10">25/06/2018</td>
              <td className="fw4 pv4 bt b--black-10">65</td>
              <td className="fw4 pv4 bt b--black-10">Active</td>
              <td className="fw4 pv4 bt b--black-10">Active</td>
              <td className="fw4 pv4 bt b--black-10">Inactive</td>
            </tr>
            <tr>
              <td className="fw7 pv4 bt b--black-10">Winter 2018</td>
              <td className="fw4 pv4 bt b--black-10">25/06/2018</td>
              <td className="fw4 pv4 bt b--black-10">25/06/2018</td>
              <td className="fw4 pv4 bt b--black-10">65</td>
              <td className="fw4 pv4 bt b--black-10">Active</td>
              <td className="fw4 pv4 bt b--black-10">Active</td>
              <td className="fw4 pv4 bt b--black-10">Inactive</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

Shelf.propTypes = {
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
