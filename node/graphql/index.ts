import find from 'lodash/find';
import {
  getCollection,
  getGroups,
  getCollections,
  createCollection,
  createGroup,
  collectionContains,
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

    collectionContains: async function(_, data, { vtex: ioContext, request }) {
      const result = await collectionContains({
        ioContext,
        collectionId: data.collectionId,
        skus: data.skus,
      });

      return result;
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

      return collectionId;
    },

    group: async function(_, data, { vtex: ioContext, request }) {
      const groupId = await createGroup({
        ioContext,
        collectionId: data.collectionId,
        name: data.name,
        type: data.type,
        preSale: data.preSale,
        release: data.release,
        brands: data.brands,
        categories: data.categories,
        skus: data.skus,
      });

      return groupId;
    },
  },
};
