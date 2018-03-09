import { getCollection, getConditions, getCollections } from './collectionAPI';

export const resolvers = {
  Query: {
    collection: async function(_, info, { vtex: ioContext, request }, query) {
      if (!query.variableValues || !query.variableValues.id) {
        return null;
      }

      const id = query.variableValues.id;
      const page = query.variableValues.page;
      const pageSize = query.variableValues.pageSize;

      const collection = await getCollection({ ioContext, id });
      const conditions = await getConditions({ ioContext, id, page, pageSize });

      return {
        ...collection,
        conditions,
      };
    },

    collections: async function(_, info, { vtex: ioContext, request }, query) {
      let collections;
      try {
        collections = await getCollections({
          ioContext,
          key: query.variableValues.key,
          page: query.variableValues.page,
          pageSize: query.variableValues.pageSize,
        });
      } catch (e) {
        console.log({
          statusText: e.response.statusText,
          headers: e.response.headers,
          request: {
            method: e.request.method,
            path: e.request.path,
          },
        });
        return e;
      }

      return collections;
    },
  },
};
