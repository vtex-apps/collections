import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Card from '../Card'
import Search from './Search'
import Result from './Result'

import Dropdown from '@vtex/styleguide/lib/Dropdown'

class Items extends Component {
  render() {
    return (
        <Card>
          <div className="w-90 center">
            <div className="f4 fw7">
              Items
            </div>
            <div className="flex items-baseline w-100 justify-between">
              <div className="pt6 w-80">
                <Search />
              </div>
              <div className="pl4">
                <Dropdown
                  placeholder='Filter by'
                  options={['Selected', 'Not selected', 'All']}
                  onChange={() => {}}
                  value=""
                />
              </div>
            </div>
            <div className="pt6">
              <Result />
            </div>
          </div>
        </Card>
    )
  }
}

Items.propTypes = {}

export default Items
