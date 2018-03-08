
import { getCollection, getCollections, getSubCollections } from './collectionAPI'

export const resolvers = {
  Query: {
    collection: async function(_, info, { vtex: ioContext, request }, query) {
      if (!query.variableValues || !query.variableValues.id) {
        return null
      }

      const id = query.variableValues.id

      const collection = await getCollection({ioContext, id})
      const conditions = await getSubCollections({ioContext, id})

      return {
        ...collection,
        conditions,
      }
    },

    collections: async function(_, info, { vtex: ioContext, request }, query) {
      let collections
      try {
        collections = await getCollections({
          ioContext,
          page: query.variableValues.page,
          size: query.variableValues.size,
        })
      } catch (e) {
        console.log({
          statusText: e.response.statusText,
          headers: e.response.headers,
          request: {
            method: e.request.method,
            path: e.request.path,
          }
        })
        return e
      }

      return collections
    },
  }
}


