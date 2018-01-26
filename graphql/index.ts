import axios from 'axios'

export const resolvers = {
  Query: {
    collections: async function(_, { slug: slugParam }, { vtex: ioContext, request }) {
      const { data } = await axios({
        url: `http://${ioContext.account}.vtexcommercestable.com.br/api/catalog/pvt/collection`,
        method: 'get',
        headers: {
          Authorization: `${ioContext.authToken}`,
        },
        params: {
          page: 1,
          size: 20,
        }
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


