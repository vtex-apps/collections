import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Card from '../Card'
import Button from '@vtex/styleguide/lib/Button'
import Badge from '../Badge'

class CollapsedGroup extends Component {
  render() {
    return (
      <Card>
        <div>
          <div className="flex justify-between items-center">
            <div className="f3 fw7 w-50">
              GroupName
            </div>
            <div>
              <Badge type="active">Manual</Badge>
            </div>
          </div>
          <div className="w-100 pt4">
            <div className="f6">
              <span className="fw7">6 skus</span> manually selected
            </div>
          </div>
        </div>
        <div className="pt6 nl5">
          <div>
            <Button>Edit</Button>
            <Button>Delete group</Button>
          </div>
        </div>
      </Card>
    )
  }
}

export default CollapsedGroup
