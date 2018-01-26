
import { getCollection, getCollections, getSubCollections } from './collectionAPI'

export const resolvers = {
  Query: {
    collection: async function(_, info, { vtex: ioContext, request }, query) {
      if (!query.variableValues || !query.variableValues.id)
        throw new Error('No id was specified to get a collection')

      const id = query.variableValues.id

      const collection = await getCollection({ioContext, id})
      const conditions = await getSubCollections({ioContext, id})

      return {
        ...collection,
        conditions,
      }
    },

    collections: async function(_, info, { vtex: ioContext, request }, query) {
      const collections = await getCollections({
        ioContext,
        page: query.variableValues.page,
        size: query.variableValues.size,
      })

      return collections
    },
  }
}


