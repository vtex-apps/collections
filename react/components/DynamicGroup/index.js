import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Card from '../Card'
import Button from '@vtex/styleguide/lib/Button'

class DynamicGroup extends Component {
  render() {
    return (
      <Card>
        <div>
          <div className="f3 fw7 w-50">
            <input
              className="w-auto bn f3 fw7 near-black"
              type="text"
              placeholder="Name your collection"
              defaultValue="Type a name"
              style={{ width: '10em' }}
              onChange={()=>{}}
            />
          </div>
          <div className="w-100 pt7">
            <div className="f6 pb3">
              Include products from the following brands:
            </div>
            <input className="w-100" />
          </div>
          <div className="w-100 pt5">
            <div className="f6 pb3">
              Include products from the following categories:
            </div>
            <input className="w-100" />
          </div>
          <div>
            <div className="pt6 nl5">
              <Button>Save group</Button>
              <Button>Cancel</Button>
            </div>
          </div>
        </div>
      </Card>
    )
  }
}

export default DynamicGroup
