import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@vtex/styleguide/lib/Button'
import Card from '../Card'
import CategoryAutocomplete from './CategoryAutocomplete'
import BrandAutocomplete from './BrandAutocomplete'

class DynamicGroup extends Component {
  constructor(props) {
    super(props)

    this.state = { ...this.mapPropsToState(props) }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.mapPropsToState(nextProps) })
  }

  mapPropsToState(props) {
    return {
      name: props.name,
      brands: props.brands,
      categories: props.categories,
    }
  }

  handleChangeName = e => {
    this.setState({ name: e.target.value })
  };

  handleChangeCategories = categories => {
    this.setState({ categories })
  };

  handleChangeBrands = brands => {
    this.setState({ brands })
  };

  render() {
    return (
      <Card>
        <div>
          <div className="f3 fw7 w-50">
            <input
              className="w-auto bn f3 fw7 near-black"
              type="text"
              placeholder="Name your collection"
              value={this.state.name}
              style={{ width: '10em' }}
              onChange={this.handleChangeName}
            />
          </div>

          <div className="w-100 pt7">
            <div className="f6 pb3">
              Include products from the following brands:
            </div>
            <BrandAutocomplete
              values={this.state.brands}
              onChange={this.handleChangeBrands}
            />
          </div>

          <div className="w-100 pt5">
            <div className="f6 pb3">
              Include products from the following categories:
            </div>
            <CategoryAutocomplete
              values={this.state.categories}
              onChange={this.handleChangeCategories}
            />
          </div>

          <div>
            <div className="pt6 nl5">
              <Button>Save group</Button>
              <Button>Cancel</Button>
            </div>
          </div>
        </div>
      </Card>
    )
  }
}

DynamicGroup.propTypes = {
  collectionId: PropTypes.string,
  name: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.number),
  brands: PropTypes.arrayOf(PropTypes.number),
  onSave: PropTypes.func.isRequired,
}

export default DynamicGroup
