import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Result extends Component {
  render() {
    return (
      <div>
        <div className="flex items-center">
          <input type="checkbox" className="mr5"></input>
          <div className="bt bl bb br b--light-gray pa4 flex items-center w-100">
            <div className="w-50 flex items-center">
              <div className="bg-light-gray" style={{ width: '48px', height: '48px' }}></div>
              <div className="ml5">Tênis Sk8 Hi-Pro</div>
            </div>
            <div className="w-50 flex items-center fw3">
              <div className="w-two-thirds tl">REF: VN0A347TOUD</div>
              <div className="w-third tl">ID: 2375</div>
            </div>
            <div className="bg-serious-black pa4 br-100 relative" style={{ right: '-1.5rem' }}></div>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <input type="checkbox" className="mr5"></input>
          <div className="bl bb br b--light-gray pa4 flex items-center w-90">
            <div className="pl6 w-50">Tênis Sk8 Hi-Pro</div>
            <div className="pl6 w-30">REF: VN0A347TOUD</div>
            <div className="pl6 w-20">ID: 2375</div>
            <div className="bg-serious-black pa4 br-100 relative" style={{ right: '-1.5rem' }}></div>
          </div>
        </div>
        <div className="flex items-center">
          <input type="checkbox" className="mr5"></input>
          <div className="bt bl bb br b--light-gray pa4 flex items-center w-100">
            <div className="bg-light-gray" style={{ width: '48px', height: '48px' }}></div>
            <div className="pl6 w-50">Tênis Sk8 Hi-Pro</div>
            <div className="pl6 w-30">REF: VN0A347TOUD</div>
            <div className="pl6 w-20">ID: 2375</div>
            <div className="bg-serious-black pa4 br-100 relative" style={{ right: '-1.5rem' }}></div>
          </div>
        </div>
      </div>
    )
  }
}

Result.propTypes = {}

export default Result
