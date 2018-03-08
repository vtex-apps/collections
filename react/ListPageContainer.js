import React, { Component } from 'react'
import ListPage from './ListPage'

class ListPageContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 1,
      size: 20,
    }
  }

  handleChangePage = page => {
    this.setState({ page })
  };

  render() {
    const { page, size } = this.state

    return (
      <ListPage page={page} size={size} changePage={this.handleChangePage} className="h-100" />
    )
  }
}

export default ListPageContainer
