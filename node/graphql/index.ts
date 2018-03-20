import {
  Query as CollectionsQuery,
  Mutation as CollectionsMutation,
} from './collections';
import { Query as CatalogQuery } from './catalog';

export const resolvers = {
  Query: {
    ...CollectionsQuery,
    ...CatalogQuery,
  },
  Mutation: {
    ...CollectionsMutation,
  },
};
