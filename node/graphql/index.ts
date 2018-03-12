import {
  getCollection,
  getConditions,
  getCollections,
  createCollection,
  createCondition,
} from './collectionAPI';

export const resolvers = {
  Query: {
    collection: async function(_, info, { vtex: ioContext, request }, query) {
      console.log({ info });
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
          searchKey: query.variableValues.searchKey,
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
  Mutation: {
    collection: async function(_, info, { vtex: ioContext, request }, input) {
      const {
        name,
        searchable,
        highlight,
        dateFrom,
        dateTo,
        conditions,
      } = info;

      const collectionId = await createCollection({
        ioContext,
        name,
        searchable,
        highlight,
        dateFrom,
        dateTo,
      });

      await Promise.all(
        conditions.map(condition =>
          createCondition({ ioContext, collectionId, ...condition }))
      );

      return true;
    },
  },
};
