import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Card extends PureComponent {
  render() {
    return (
      <div
        className="w-100 bg-white pa6 br2"
        style={{ boxShadow: '0 3px 9px 0 rgba(61, 62, 64, 0.2)' }}
      >
        {this.props.children}
      </div>
    )
  }
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Card
