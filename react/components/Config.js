import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'react-dates/initialize'

import Toggle from './Toggle/index'
import Button from '@vtex/styleguide/lib/Button'
import Icon from '@vtex/styleguide/lib/Icon'
import DatePicker from './DatePicker/index'
import TimePicker from './TimePicker/index'
import Card from './Card'

class Config extends Component {
  render() {
    const { collection } = this.props

    return (
      <Card>
        <div className="ph7">
          <div className="mb3">
            <input className="w-auto bn f4 fw7 near-black" type="text" placeholder="Name your collection" style={{width: '10em'}}></input>
            <Button><Icon type="edit" fill="#368DF7" width={12} /></Button> 
          </div>
          <div className="flex justify-between">
            <div className="flex">
              <div className= "pr5">
                <span className="f6 fw7 near-black pr5 ">Start</span>
                <DatePicker value={collection.dateFrom} onChange={() => {}} />
                <TimePicker value={collection.dateFrom} onChange={() => {}} />
              </div>
              <div>
                <span className="f6 fw7 near-black pr5 ">End</span>
                <DatePicker value={collection.dateTo} onChange={() => {}} />
                <TimePicker value={collection.dateTo} onChange={() => {}} />
              </div>
            </div>
            <div className="bl bw1 b--silver pl5 dib near-black">
              <div className="flex dib pb3">
                <Toggle semantic
                  secondary
                  id="hightlight-toggle"
                  onClick={this.handleChangeHighlight}
                  checked={true}> 
                </Toggle>
              <span className="pl3">Active</span>
              </div>
              <div className="flex dib pb3">
                <Toggle
                  secondary
                  id="hightlight-toggle"
                  onClick={this.handleChangeHighlight}
                  checked={true}> 
                </Toggle>
              <span className="pl3">Highlight</span>
              </div>
              <div className="flex dib pb3">
                <Toggle
                  secondary
                  id="searchable-toggle"
                  onClick={this.handleChangeSearchable}
                  checked={collection.searchable}>      
                </Toggle>
                <span className="pl3">Searchable</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }
}

Config.propTypes = {
  collection: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Config
