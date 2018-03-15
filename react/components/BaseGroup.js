import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from './Card'
import Button from '@vtex/styleguide/lib/Button'

class BaseGroup extends Component {
  render() {
    return (
      <Card>
        <div className="w-100 center">
          <div>
            <div className="f3 fw7 w-50">
              <input
                className="w-auto bn f3 fw7 near-black"
                type="text"
                placeholder="Name your collection"
                value={this.props.name}
                style={{ width: '10em' }}
                onChange={this.props.onChangeName}
              />
            </div>
          </div>
          {this.props.children}
          <div className="pt6 nl5">
            <div>
              <Button onClick={this.props.onSave}>Save group</Button>
              <Button onClick={this.props.onCancel}>Cancel</Button>
            </div>
          </div>
        </div>
      </Card>
    )
  }
}

BaseGroup.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default BaseGroup
