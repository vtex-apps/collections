import find from 'lodash/find';
import {
  getCollection,
  getGroups,
  getCollections,
  createCollection,
  createCondition,
} from './collectionAPI';
import { getCategories, getBrands } from './catalogAPI';

export const resolvers = {
  Query: {
    collection: async function(_, data, { vtex: ioContext, request }) {
      const collection = await getCollection({ ioContext, id: data.id });
      const groups = await getGroups({
        ioContext,
        collectionId: data.id,
        page: data.page,
        pageSize: data.pageSize,
      });

      return {
        ...collection,
        groups,
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

    categoriesAutocomplete: async function(
      _,
      data,
      { vtex: ioContext, request }
    ) {
      const categories = await getCategories({
        ioContext,
        name: data.name || '',
      });

      console.log({ categories });

      return categories;
    },

    brandsAutocomplete: async function(_, data, { vtex: ioContext, request }) {
      const brands = await getBrands({
        ioContext,
        name: data.name || '',
      });

      return brands;
    },
  },
  Mutation: {
    collection: async function(_, data, { vtex: ioContext, request }) {
      const collectionId = await createCollection({
        ioContext,
        name: data.name,
        searchable: data.searchable,
        highlight: data.searchable,
        dateFrom: data.dateFrom,
        dateTo: data.dateTo,
      });

      await Promise.all(
        data.groups.map(group =>
          createCondition({ ioContext, collectionId, ...group }))
      );

      return true;
    },
  },
};
