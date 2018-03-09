import React, { Component } from 'react'
import PropTypes from 'prop-types'

import IconArrowDown from './IconArrowDown'
import IconArrowUp from './IconArrowUp'

class Result extends Component {
  render() {
    return (
      <div>
        <div className="flex items-center">
          <input type="checkbox" className="mr5" />
          <div
            className="bt bl bb br b--light-gray pa4 flex items-center f6 flex-grow-1 justify-between relative bg-near-white"
          >
            <div className="flex items-center">
              <img
                src="http://lojavans.vteximg.com.br/arquivos/ids/168921-1000-1000/IMG_0087.jpg?v=636465293966800000"
                style={{ width: '3rem', height: '3rem' }}
              />
              <div className="ml5">Tênis Sk8 Hi-Pro</div>
            </div>
            <div className="flex items-center fw3 justify-end pr7 f6">
              <div className="tl pr9">REF: VN0A347TOUD</div>
              <div className="tl">ID: 2375</div>
            </div>
            <button
              className="bg-serious-black pa2 br-100 absolute flex items-center bn pointer dim"
              style={{ right: '-0.75rem' }}
            >
              <IconArrowUp fill="#FFFFFF" width={14} height={14} />
            </button>
          </div>
        </div>
        <div className="flex items-center" style={{ paddingLeft: '3.75rem' }}>
          <input type="checkbox" className="mr5" />
          <div
            className="bl bb br b--light-gray ph4 pv5 flex items-center f6 flex-grow-1 justify-between bg-near-white"
          >
            <div className="flex items-center">
              <div className="ml2">Tênis Sk8 Hi-Pro 44</div>
            </div>
            <div className="flex items-center fw3 justify-end pr7 f6">
              <div className="tl pr9">REF: VN0A347TOUD</div>
              <div className="tl">ID: 2375</div>
            </div>
          </div>
        </div>
        <div className="flex items-center" style={{ paddingLeft: '3.75rem' }}>
          <input type="checkbox" className="mr5" />
          <div
            className="bl br b--light-gray ph4 pv5 flex items-center f6 flex-grow-1 justify-between bg-near-white"
          >
            <div className="flex items-center">
              <div className="ml2">Tênis Sk8 Hi-Pro 42</div>
            </div>
            <div className="flex items-center fw3 justify-end pr7 f6">
              <div className="tl pr9">REF: VN0A347TOUD</div>
              <div className="tl">ID: 2375</div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <input type="checkbox" className="mr5" />
          <div
            className="bt bl br b--light-gray pa4 flex items-center f6 flex-grow-1 justify-between relative"
          >
            <div className="flex items-center">
              <img
                src="http://lojavans.vteximg.com.br/arquivos/ids/169798-1000-1000/VN0A36ISQHZ_01.jpg?v=636465356869730000"
                style={{ width: '3rem', height: '3rem' }}
              />
              <div className="ml5">Boné Vans X Peanuts Jockey</div>
            </div>
            <div className="flex items-center fw3 justify-end pr7 f6">
              <div className="tl pr9">REF: VN0A347TOUD</div>
              <div className="tl">ID: 2375</div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <input type="checkbox" className="mr5" />
          <div
            className="bt bl bb br b--light-gray pa4 flex items-center f6 flex-grow-1 justify-between relative"
          >
            <div className="flex items-center">
              <img
                src="http://lojavans.vteximg.com.br/arquivos/ids/167527-1000-1000/VN0A2X3B600_001.jpg?v=636440299842170000"
                style={{ width: '3rem', height: '3rem' }}
              />
              <div className="ml5">Mochila Holder - Tam M</div>
            </div>
            <div className="flex items-center fw3 justify-end pr7 f6">
              <div className="tl pr9">REF: VN0A347TOUD</div>
              <div className="tl">ID: 2375</div>
            </div>
            <button
              className="bg-serious-black pa2 br-100 absolute flex items-center bn pointer dim"
              style={{ right: '-0.75rem' }}
            >
              <IconArrowDown fill="#FFFFFF" width={14} height={14} />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

Result.propTypes = {
  products: PropTypes.array.isRequired,
}

export default Result
