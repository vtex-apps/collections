import map from 'lodash/map'

export function fixCollection(data) {
  return {
    id: data.Id,
    name: data.Name,
    searchable: data.Searchable,
    highlight: data.Highlight,
    dateFrom: data.DateFrom,
    dateTo: data.DateTo,
  }
}

export function fixCondition(data) {
  return {
    id: data.Id,
    name: data.Name,
    type: data.Type,
    preSale: data.PreSale,
    release: data.Release,
  }
}

export function fixCollections(data) {
  return {
    page: data.Page,
    size: data.Size,
    totalPages: data.TotalPage,
    collections: map(data.Data, fixCollection),
  }
}
