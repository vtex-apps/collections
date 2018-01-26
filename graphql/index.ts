import axios from 'axios'

export const resolvers = {
  Query: {
    collections: async function(_, info, { vtex: ioContext, request }, query) {
      const params = { page: 1, size: 20 }

      if (query.variableValues) {
        if (query.variableValues.page !== undefined) {
          params.page = query.variableValues.page
        }
        if (query.variableValues.size !== undefined) {
          params.size = query.variableValues.size
        }
      }

      const { data } = await axios({
        url: `http://${ioContext.account}.vtexcommercestable.com.br/api/catalog/pvt/collection`,
        method: 'get',
        headers: {
          Authorization: `${ioContext.authToken}`,
        },
        params,
      })

      if (data) {
        return data
      } else {
        const error = {
          message: `accounts not found`,
          response: { status: 404 },
        }
        throw error
      }
    },
  }
}


