import axios from 'axios'

export function getCollection({ ioContext, id }) {
  return axios({
    url: `http://${ioContext.account}.vtexcommercebeta.com.br/api/catalog_system/pvt/collection/${id}`,
    method: 'get',
    headers: {
      Authorization: `${ioContext.authToken}`,
    },
  }).then(({ data }) => data)
}

export function getGroups({ ioContext, collectionId, page, pageSize }) {
  return axios({
    url: `http://${ioContext.account}.vtexcommercebeta.com.br/api/catalog_system/pvt/collection/${collectionId}/groups`,
    method: 'get',
    headers: {
      Authorization: `${ioContext.authToken}`,
    },
    params: {
      page: page == null ? 1 : page,
      pageSize: pageSize == null ? 20 : pageSize,
    },
  }).then(({ data }) => data)
}

export function getCollections({ ioContext, searchKey = '', page, pageSize }) {
  return axios({
    url: `http://${ioContext.account}.vtexcommercebeta.com.br/api/catalog_system/pvt/collection/search/${searchKey}`,
    method: 'get',
    headers: {
      Authorization: ioContext.authToken,
    },
    params: {
      page: page == null ? 1 : page,
      pageSize: pageSize == null ? 20 : pageSize,
    },
  }).then(({ data }) => data)
}

export function createCollection(
  { ioContext, name, searchable, highlight, dateFrom, dateTo }
) {
  return axios({
    url: `http://${ioContext.account}.vtexcommercebeta.com.br/api/catalog_system/pvt/collection/`,
    method: 'post',
    headers: {
      Authorization: ioContext.authToken,
    },
    data: {
      name,
      searchable,
      highlight,
      dateFrom,
      dateTo,
    },
  }).then(({ data }) => data)
}

export function createGroup(
  {
    ioContext,
    collectionId,
    name,
    type,
    preSale,
    release,
    brands,
    categories,
    skus,
  }
) {
  return axios({
    url: `http://${ioContext.account}.vtexcommercebeta.com.br/api/catalog_system/pvt/collection/group`,
    method: 'post',
    headers: {
      Authorization: ioContext.authToken,
    },
    data: {
      collectionId,
      name,
      type,
      preSale,
      release,
      brands,
      categories,
      skus,
    },
  }).then(({ data }) => data)
}
