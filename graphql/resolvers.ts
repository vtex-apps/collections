import axios from 'axios'

export default {
  Query: {
    products: async function (ctx) {
      return [{name: 'Banana'}]
    }
  }
}
