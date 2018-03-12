import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'react-dates/initialize'

import Toggle from './Toggle/index'
import DatePicker from './DatePicker/index'
import TimePicker from './TimePicker/index'
import Card from './Card'

class Config extends Component {
  render() {
    const collection = this.props.collection || {}

    return (
      <Card>
        <div className="w-90 center">
          <div className="mb5">
            <input
              className="w-auto bn f4 fw7 near-black"
              type="text"
              placeholder="Name your collection"
              defaultValue={collection.name || 'Type a name'}
              style={{ width: '10em' }}
            />
          </div>
          <div className="flex justify-between">
            <div className="flex">
              <div className="pr5">
                <span className="f6 fw7 near-black pr5 ">Start</span>
                <DatePicker
                  value={collection.dateFrom || new Date()}
                  onChange={() => {}}
                />
                <TimePicker
                  value={collection.dateFrom || new Date()}
                  onChange={() => {}}
                />
              </div>
              <div>
                <span className="f6 fw7 near-black pr5 ">End</span>
                <DatePicker
                  value={collection.dateTo || new Date()}
                  onChange={() => {}}
                />
                <TimePicker
                  value={collection.dateTo || new Date()}
                  onChange={() => {}}
                />
              </div>
            </div>
            <div className="bl b--light-gray pl7 dib near-black">
              <div className="flex dib pb3">
                <Toggle
                  semantic
                  secondary
                  id="hightlight-toggle"
                  onClick={this.handleChangeHighlight}
                  checked
                />
                <span className="pl3">Active</span>
              </div>
              <div className="flex dib pb3">
                <Toggle
                  secondary
                  id="hightlight-toggle"
                  onClick={this.handleChangeHighlight}
                  checked
                />
                <span className="pl3">Highlight</span>
              </div>
              <div className="flex dib pb3">
                <Toggle
                  secondary
                  id="searchable-toggle"
                  onClick={this.handleChangeSearchable}
                  checked={collection.searchable}
                />
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
}

export default Config
