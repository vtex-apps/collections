import { graphql } from 'react-apollo'
import createAutocomplete from '../../Autocomplete'
import BrandName from './BrandName.graphql'
import BrandsAutocomplete from './BrandsAutocomplete.graphql'

const BrandAutocomplete = createAutocomplete({
  graphql: {
    suggestion: graphql(BrandsAutocomplete, {
      options({ inputValue = '' }) {
        return {
          variables: {
            name: inputValue,
          },
        }
      },
    }),
    name: graphql(BrandName, {
      options({ values }) {
        return {
          variables: {
            brands: values,
          },
        }
      },
    }),
  },
})

export default BrandAutocomplete
