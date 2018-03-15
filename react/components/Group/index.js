import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ManualGroup from '../ManualGroup'
import DynamicGroup from '../DynamicGroup'

class Group extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPage: 1,
      searchQuery: '',
      selections: { product: {} },
    }
  }

  handleChangeSearch = e => {
    const searchQuery = e.target.value
    const newState = { searchQuery, queryFrom: 0, queryTo: 9 }

    this.props.products.refetch({
      variables: {
        ...this.props.products.variables,
        ...newState,
      },
    })

    this.setState(newState)
  };

  handleChangePage = (page, from, to) => {
    this.props.products.refetch({
      variables: {
        ...this.props.products.variables,
        ...(this.state.searchQuery ? { queryFrom: from, queryTo: to } : {}),
      },
    })
    this.setState({ currentPage: page })
  };

  handleSave = () => {};
  handleCancel = () => {};

  render() {
    const { data } = this.props

    return data.skus.length > 0
      ? <ManualGroup
        name={data.name}
        skus={data.skus}
        onSave={this.handleSave}
        onCancel={this.handleCancel}
      />
      : <DynamicGroup
        name={data.name}
        categories={data.categories}
        brands={data.brands}
        onSave={this.handleSave}
        onCancel={this.handleCancel}
      />
  }
}

Group.propTypes = {
  data: PropTypes.object,
}

export default Group
