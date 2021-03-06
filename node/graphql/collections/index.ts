import { ColossusContext } from 'colossus'
import {
  getCollection,
  getGroups,
  getCollections,
  collectionContains,
  createCollection,
  createGroup,
  updateGroup,
} from './api'

export const Query = {
  collection: async function(_, data, { vtex: ioContext }: ColossusContext) {
    if (!data.id) return {}

    const collection = await getCollection({ ioContext, id: data.id })
    const groups = await getGroups({
      ioContext,
      collectionId: data.id,
      page: data.page,
      pageSize: data.pageSize,
    })

    return {
      ...collection,
      groups,
    }
  },

  collections: async function(
    _,
    info,
    { vtex: ioContext }: ColossusContext,
    query
  ) {
    let collections
    try {
      collections = await getCollections({
        ioContext,
        searchKey: query.variableValues.searchKey,
        page: query.variableValues.page,
        pageSize: query.variableValues.pageSize,
      })
    } catch (e) {
      console.log({
        statusText: e.response.statusText,
        headers: e.response.headers,
        request: {
          method: e.request.method,
          path: e.request.path,
        },
      })
      return e
    }

    return collections
  },

  collectionContains: async function(
    _,
    data,
    { vtex: ioContext }: ColossusContext
  ) {
    if (!data.collectionId) return {}

    const result = await collectionContains({
      ioContext,
      collectionId: data.collectionId,
      skus: data.skus,
    })

    return result
  },
}

export const Mutation = {
  createCollection: async function(
    _,
    data,
    { vtex: ioContext }: ColossusContext
  ) {
    const collectionId = await createCollection({
      ioContext,
      name: data.name,
      searchable: data.searchable,
      highlight: data.searchable,
      dateFrom: data.dateFrom,
      dateTo: data.dateTo,
    })

    await Promise.all(
      data.groups.map(group => createGroup({
        ioContext,
        collectionId: collectionId,
        name: group.name,
        type: group.type,
        preSale: group.preSale,
        release: group.release,
        brands: group.brands,
        categories: group.categories,
        skus: group.skus,
      }))
    )

    return collectionId
  },

  updateGroup: async function(_, data, { vtex: ioContext }: ColossusContext) {
    const groupId = await updateGroup({
      ioContext,
      collectionId: data.collectionId,
      name: data.name,
      type: data.type,
      preSale: data.preSale,
      release: data.release,
      brands: data.brands,
      categories: data.categories,
      skus: data.skus,
    })

    return true
  },
}
