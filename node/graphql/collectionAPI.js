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

export function getConditions({ ioContext, id, page, pageSize }) {
  return axios({
    url: `http://${ioContext.account}.vtexcommercebeta.com.br/api/catalog_system/pvt/collection/${id}/conditions`,
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
