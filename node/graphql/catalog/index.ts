import { ColossusContext } from 'colossus';
import {
  getCategoryByName,
  getBrandByName,
  getProducts,
  getProductsBySku,
  getBrand,
  getCategory,
} from './api';

export const Query = {
  categoriesAutocomplete: async function(
    _,
    data,
    { vtex: ioContext }: ColossusContext
  ) {
    const categories = await getCategoryByName({
      ioContext,
      name: data.name || '',
    });

    return categories;
  },

  brandsAutocomplete: async function(
    _,
    data,
    { vtex: ioContext }: ColossusContext
  ) {
    const brands = await getBrandByName({
      ioContext,
      name: data.name || '',
    });

    return brands;
  },

  getCategories: async (_, data, { vtex: ioContext }: ColossusContext) => {
    const resolvedCategories = await Promise.all(
      data.ids.map(id => getCategory({
        ioContext,
        id,
      }))
    );

    return resolvedCategories;
  },

  getBrands: async (
    _,
    data,
    { vtex: ioContext, request: { headers: { cookie } } }: ColossusContext
  ) => {
    try {
      const resolvedBrands = await Promise.all(
        data.ids.map(id => getBrand({
          ioContext,
          cookie,
          id,
        }))
      );

      return resolvedBrands;
    } catch (e) {
      console.log(e);
    }
  },

  getProductsBySku: async (_, data, { vtex: ioContext }: ColossusContext) => {
    const response = await getProductsBySku({
      ioContext,
      ids: data.ids,
      from: data.from,
      to: data.to,
    });

    return response;
  },

  getProducts: async (_, data, { vtex: ioContext }: ColossusContext) => {
    const response = await getProducts({
      ioContext,
      query: data.query,
      category: data.category,
      specificationFilters: data.specificationFilters,
      priceRange: data.priceRange,
      collection: data.collection,
      salesChannel: data.salesChannel,
      orderBy: data.orderBy,
      from: data.from,
      to: data.to,
    });

    return response;
  },
};
