import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@vtex/styleguide/lib/Button'
import AddIcon from './AddIcon'

class NewGroupButon extends Component {
  render() {
    return (
      <div className="tc mt7">
        <Button secondary onClick={this.props.onClick}>
          <div className="flex items-center">
            <AddIcon /> <span className="ml2">Add new group</span>
          </div>
        </Button>
      </div>
    )
  }
}

NewGroupButon.propTypes = {
  onClick: PropTypes.func,
}

export default NewGroupButon
