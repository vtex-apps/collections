import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'react-dates/initialize'
import moment from 'moment'

import Toggle from './Toggle/index'
import DatePicker from './DatePicker/index'
import TimePicker from './TimePicker/index'
import Card from './Card'

class Config extends Component {
  handleChangeName = e => {
    this.props.onChange({ field: 'name', value: e.target.value })
  };

  handleChangeDateFrom = date => {
    const dateFrom = moment(new Date(date))
    const timeFrom = moment(new Date(this.props.collection.dateFrom))

    const newDate = dateFrom
      .hour(timeFrom.hour())
      .minute(timeFrom.minute())
      .toDate()
      .toISOString()

    this.props.onChange({ field: 'dateFrom', value: newDate })
  };

  handleChangeDateTo = date => {
    const dateTo = moment(new Date(date))
    const timeTo = moment(new Date(this.props.collection.dateTo))

    const newDate = dateTo
      .hour(timeTo.hour())
      .minute(timeTo.minute())
      .toDate()
      .toISOString()

    this.props.onChange({ field: 'dateTo', value: newDate })
  };

  handleChangeTimeFrom = time => {
    const dateFrom = moment(new Date(this.props.collection.dateFrom))
    const timeFrom = moment(new Date(time))

    const newDate = dateFrom
      .hour(timeFrom.hour())
      .minute(timeFrom.minute())
      .toDate()
      .toISOString()

    this.props.onChange({ field: 'dateFrom', value: newDate })
  };

  handleChangeTimeTo = time => {
    const dateTo = moment(new Date(this.props.collection.dateTo))
    const timeTo = moment(new Date(time))

    const newDate = dateTo
      .hour(timeTo.hour())
      .minute(timeTo.minute())
      .toDate()
      .toISOString()

    this.props.onChange({ field: 'dateTo', value: newDate })
  };

  handleChangeActive = () => {
    this.props.onChange({
      field: 'active',
      value: !this.props.collection.active,
    })
  };

  handleChangeHighlight = () => {
    this.props.onChange({
      field: 'highlight',
      value: !this.props.collection.highlight,
    })
  };

  handleChangeSearchable = () => {
    this.props.onChange({
      field: 'searchable',
      value: !this.props.collection.searchable,
    })
  };

  render() {
    const collection = this.props.collection || {}

    return (
      <Card>
        <div className="center">
          <div className="mb6">
            <div>
              <input
                className="w-auto bn f3 fw7 near-black"
                type="text"
                placeholder="Name your collection"
                defaultValue={collection.name}
                style={{ width: '10em' }}
                onChange={this.handleChangeName}
              />
            </div>
          </div>
          <div>
            <div>
              <span className="f6 fw7 near-black">Start</span>
              <div className="pt2 pb3">
                <DatePicker
                  value={collection.dateFrom}
                  onChange={this.handleChangeDateFrom}
                />
                <TimePicker
                  value={collection.dateFrom}
                  onChange={this.handleChangeTimeFrom}
                />
              </div>
              <div>
                <span className="f6 fw7 near-black pr5 ">End</span>
                <div className="pt2">
                  <DatePicker
                    value={collection.dateTo}
                    onChange={this.handleChangeDateTo}
                  />
                  <TimePicker
                    value={collection.dateTo}
                    onChange={this.handleChangeTimeTo}
                  />
                </div>
              </div>
            </div>
            <div className="flex pt6 pb4">
              <Toggle
                secondary
                id="active-toggle"
                onClick={this.handleChangeActive}
                checked={collection.active}
              />
              <span className="pl3 f6">Active</span>
            </div>
            <div className="flex dib pb4">
              <Toggle
                secondary
                id="hightlight-toggle"
                onClick={this.handleChangeHighlight}
                checked={collection.highlight}
              />
              <span className="pl3 f6 pr6">Highlight</span>
            </div>
            <div className="flex dib">
              <Toggle
                secondary
                id="searchable-toggle"
                onClick={this.handleChangeSearchable}
                checked={collection.searchable}
              />
              <span className="pl3 f6">Searchable</span>
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
