import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, withGraphQl } from 'react-apollo'
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'
import ListPage from './ListPage'
import 'vtex-tachyons'

class ListPageContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 1,
      size: 20,
    }
  }

  handleChangePage = (page) => {
    this.setState({ page })
  }

  render() {
    const { page, size } = this.state

    return (
      <ListPage page={page} size={size} changePage={this.handleChangePage} />
    )
  }
}

export default ListPageContainer
