import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from '@vtex/styleguide/lib/Button'
import AddIcon from './AddIcon'
import config from 'vtex-tachyons/config.json'

class NewGroupButon extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { hover: false }
  }

  handleMouseEnter = () => {
    this.setState({ hover: true })
  };

  handleMouseLeave = () => {
    this.setState({ hover: false })
  };
  render() {
    return (
      <div className="tc mt7">
        <Button
          secondary
          onClick={this.props.onClick}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <div className="flex items-center">
            <AddIcon
              color={
                this.state.hover ? config.colors.white : config.colors.blue
              }
            />
            {' '}
            <span className="ml2">Add new group</span>
          </div>
        </Button>
      </div>
    )
  }
}

NewGroupButon.propTypes = {
  onClick: PropTypes.func,
}

export default NewGroupButon
