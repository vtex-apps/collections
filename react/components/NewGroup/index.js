import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Card from '../Card'
import Button from '@vtex/styleguide/lib/Button'

class NewGroup extends Component {
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
          <form className="pt6">
            <div className="f6 pb3">
              <input type="radio" name="grouptype" id="manual" />
              <label className="pl3" htmlFor="manual">Add products manually</label>
            </div>
            <div className="f6">
              <input type="radio" name="grouptype" id="dynamic" />
              <label className="pl3" htmlFor="dynamic">Add products dynamically based on conditions</label>
            </div>
          </form>
          <div>
            <div className="pt6 nl5">
              <Button>Start group</Button>
              <Button>Cancel</Button>
            </div>
          </div>
        </div>
      </Card>
    )
  }
}

export default NewGroup
