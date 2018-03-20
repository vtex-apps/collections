import axios from 'axios'

export function getCategories({ ioContext, name }) {
  console.log(
    `http://${ioContext.account}.vtexcommercebeta.com.br/api/catalog_system/pub/category/list?filter=${name}&parent=`
  )
  return axios({
    url: `http://${ioContext.account}.vtexcommercebeta.com.br/api/catalog_system/pub/category/list?filter=${name}&parent=`,
    method: 'get',
    headers: {
      Authorization: ioContext.authToken,
    },
  }).then(({ data }) => data)
}

export function getBrands({ ioContext, name }) {
  return axios({
    url: `http://${ioContext.account}.vtexcommercebeta.com.br/api/catalog_system/pvt/brand/list/${name}`,
    method: 'get',
    headers: {
      Authorization: ioContext.authToken,
    },
  }).then(({ data }) => data)
}

export function getProductsBySku({ ioContext, ids, from, to }) {
  const idsQuery = ids
    ? ids.reduce((acc, id) => `${acc ? '&' : ''}fq=skuId:${id}`, '')
    : ''
  const fromQuery = from > -1 ? `&_from=${from}` : ''
  const toQuery = to > -1 ? `&_to=${to}` : ''

  return axios({
    url: `http://${ioContext.account}.vtexcommercestable.com.br/api/catalog_system/pub/products/search?${idsQuery}${fromQuery}${toQuery}`,
    method: 'get',
    headers: {
      Authorization: ioContext.authToken,
    },
  }).then(response => {
    return {
      items: response.data,
      paging: getPaging(from, to, response),
    }
  })
}

export function getProducts(
  {
    ioContext,
    query = '',
    category = '',
    specificationFilters,
    priceRange = '',
    collection = '',
    salesChannel = '',
    orderBy = '',
    from = 0,
    to = 9,
  }
) {
  const categoryQuery = category ? `&fq=C:/${category}/` : ''
  const specificationFiltersQuery = specificationFilters
    ? `&${specificationFilters}`
    : ''
  const priceRangeQuery = priceRange ? `&fq=P:[${priceRange}]` : ''
  const collectionQuery = collection
    ? `&fq=productClusterIds:${collection}`
    : ''
  const salesChannelQuery = salesChannel
    ? `&fq=isAvailablePerSalesChannel_${salesChannel}:1`
    : ''
  const orderByQuery = orderBy ? `&O=${orderBy}` : ''
  const fromQuery = from > -1 ? `&_from=${from}` : ''
  const toQuery = to > -1 ? `&_to=${to}` : ''

  return axios({
    url: `http://${ioContext.account}.vtexcommercestable.com.br/api/catalog_system/pub/products/search/${encodeURIComponent(query)}?${categoryQuery}${specificationFiltersQuery}${priceRangeQuery}${collectionQuery}${salesChannelQuery}${orderByQuery}${fromQuery}${toQuery}`,
    method: 'get',
    headers: {
      Authorization: ioContext.authToken,
      'Proxy-Authorization': ioContext.authToken,
    },
  }).then(response => {
    return {
      items: response.data,
      paging: getPaging(from, to, response),
    }
  })
}

function getPaging(from, to, response) {
  const resources = response.headers.resources.split('/')
  const total = resources[1]
  const perPage = to - from + 1

  return {
    total,
    perPage,
    pages: Math.ceil(total / perPage),
    page: Math.ceil(from / perPage) + 1,
    _from: from,
    _to: to,
  }
}
