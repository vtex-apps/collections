import { graphql } from 'react-apollo'
import createAutocomplete from '../../Autocomplete'
import CategoryName from './CategoryName.graphql'
import CategoriesAutocomplete from './CategoriesAutocomplete.graphql'

const CategoryAutocomplete = createAutocomplete({
  graphql: {
    suggestion: graphql(CategoriesAutocomplete, {
      options({ inputValue = '' }) {
        return {
          variables: {
            name: inputValue,
          },
        }
      },
    }),
    name: graphql(CategoryName, {
      options({ values }) {
        return {
          variables: {
            categories: values,
          },
        }
      },
    }),
  },
})

export default CategoryAutocomplete
