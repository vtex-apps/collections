import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Deny from '@vtex/styleguide/lib/icon/Deny'
import config from 'vtex-tachyons/config.json'

class Badge extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { hover: false }
  }

  handleMouseEnter = () => this.setState({ hover: true });
  handleMouseLeave = () => this.setState({ hover: false });

  render() {
    return (
      <span
        className="dib bg-washed-blue blue br-pill pv3 ph4 hover-bg-light-silver pointer"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.props.onClick}
      >
        {this.props.children}
        {' '}
        <span className="pt2">
          <Deny
            color={this.state.hover ? config.colors.red : config.colors.blue}
          />
        </span>
      </span>
    )
  }
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
}

export default Badge
