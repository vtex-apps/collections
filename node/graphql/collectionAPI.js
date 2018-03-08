import axios from 'axios'
import { fixCollection, fixCollections, fixCondition } from './fixCamelCase'

export function getCollection({ioContext, id}) {
  return axios({
    url: `http://${ioContext.account}.vtexcommercestable.com.br/api/catalog/pvt/collection/${id}`,
    method: 'get',
    headers: {
      Authorization: `${ioContext.authToken}`,
    },
  }).then(({ data }) => {
    return fixCollection(data)
  })
}

export function getSubCollections({ioContext, id}) {
  return axios({
    url: `http://${ioContext.account}.vtexcommercestable.com.br/api/catalog/pvt/collection/${id}/subcollection`,
    method: 'get',
    headers: {
      Authorization: `${ioContext.authToken}`,
    },
  }).then(({ data }) => {
    return data.map(fixCondition)
  })
}

export function getCollections({ioContext, page, size}) {
  return axios({
    url: `http://${ioContext.account}.vtexcommercestable.com.br/api/catalog/pvt/collection`,
    method: 'get',
    headers: {
      Authorization: ioContext.authToken,
    },
    params: {
      page: page == null ? 1 : page,
      size: size == null ? 20 : size,
    }
  }).then(({ data }) => {
    return fixCollections(data)
  })
}
