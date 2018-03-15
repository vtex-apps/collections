import axios from 'axios'

export function getCategories({ ioContext, name }) {
  console.log(
    `http://${ioContext.account}.vtexcommercebeta.com.br/api/catalog_system/pub/category/list?filter=${name}&parent=`
  )
  return axios({
    url: `http://${ioContext.account}.vtexcommercebeta.com.br/api/catalog_system/pub/category/list?filter=${name}&parent=`,
    method: 'get',
    headers: {
      Authorization: `${ioContext.authToken}`,
    },
  }).then(({ data }) => data)
}

export function getBrands({ ioContext, name }) {
  return axios({
    url: `http://${ioContext.account}.vtexcommercebeta.com.br/api/catalog_system/pvt/brand/list/${name}`,
    method: 'get',
    headers: {
      Authorization: `${ioContext.authToken}`,
    },
  }).then(({ data }) => data)
}
