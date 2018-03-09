import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'react-dates/initialize'

import Toggle from '@vtex/styleguide/lib/Toggle'
import DatePicker from './DatePicker/index'
import TimePicker from './TimePicker/index'
import Card from './Card'

class Config extends Component {
  render() {
    const { collection } = this.props

    return (
      <Card>
        <DatePicker value={collection.dateFrom} onChange={() => {}} />
        <TimePicker value={collection.dateFrom} onChange={() => {}} />
        <DatePicker value={collection.dateTo} onChange={() => {}} />
        <TimePicker value={collection.dateTo} onChange={() => {}} />
        <div className="flex pt5">
          <div className="pr2">
            <Toggle
              secondary
              id="hightlight-toggle"
              onClick={this.handleChangeHighlight}
              checked={collection.highlight}
            >
              <span className="pl3">Highlight</span>
            </Toggle>
          </div>
        </div>
        <div className="flex">
          <div className="pr2 pt5">
            <Toggle
              secondary
              id="searchable-toggle"
              onClick={this.handleChangeSearchable}
              checked={collection.searchable}
            >
              <span className="pl3">Searchable</span>
            </Toggle>
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
