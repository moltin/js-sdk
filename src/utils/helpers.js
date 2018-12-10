import { pluralize, underscore } from 'inflected'

export function buildRelationshipData(type, ids) {
  let data = []

  if (ids === null || ids.length === 0) return data

  if (typeof ids === 'string') {
    const obj = { type: underscore(type), id: ids }

    if (type === 'main-image') return obj

    return [obj]
  }

  if (Array.isArray(ids)) {
    data = ids.map(id => ({
      type: underscore(type),
      id
    }))
  }

  return data
}

export function formatUrlResource(type) {
  if (type === 'main-image') return type

  return pluralize(type)
}

export function createCartIdentifier() {
  return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, () =>
    ((Math.random() * 16) | 0).toString(16)
  )
}

export function cartIdentifier(storage) {
  const cartId = createCartIdentifier()

  if (storage.get('mcart') !== null) {
    return storage.get('mcart')
  }

  storage.set('mcart', cartId)

  return cartId
}

export function parseJSON(response) {
  return new Promise(resolve => {
    response.text().then(body => {
      let json = '{}'

      if (body !== '') {
        json = JSON.parse(body)
      }

      if (!response.ok) {
        json = { errors: [{ status: response.status }] }
      }

      resolve({
        status: response.status,
        ok: response.ok,
        json
      })
    })
  })
}

function formatFilterString(type, filter) {
  const filterStringArray = Object.keys(filter).map(key => {
    const value = filter[key]
    let queryString = `${key},${value}`

    if (typeof value === 'object')
      queryString = Object.keys(value).map(
        attr => `${key}.${attr},${value[attr]}`
      )

    return `${type}(${queryString})`
  })

  return filterStringArray.join(':')
}

function formatQueryString(key, value) {
  if (key === 'limit' || key === 'offset') {
    return `page${value}`
  }

  if (key === 'filter') {
    const filterValues = Object.keys(value).map(filter =>
      formatFilterString(filter, value[filter])
    )

    return `${key}=${filterValues.join(':')}`
  }

  return `${key}=${value}`
}

function buildQueryParams({ includes, sort, limit, offset, filter }) {
  const query = {}

  if (includes) {
    query.include = includes
  }

  if (sort) {
    query.sort = `${sort}`
  }

  if (limit) {
    query.limit = `[limit]=${limit}`
  }

  if (offset) {
    query.offset = `[offset]=${offset}`
  }

  if (filter) {
    query.filter = filter
  }

  return Object.keys(query)
    .map(k => formatQueryString(k, query[k]))
    .join('&')
}

export function buildURL(endpoint, params) {
  if (
    params.includes ||
    params.sort ||
    params.limit ||
    params.offset ||
    params.filter
  ) {
    const paramsString = buildQueryParams(params)

    return `${endpoint}?${paramsString}`
  }

  return endpoint
}

export function buildRequestBody(body) {
  let parsedBody

  if (body) {
    parsedBody = `{
      "data": ${JSON.stringify(body)}
    }`
  }

  return parsedBody
}

export function buildCartItemData(id, quantity = null, type = 'cart_item') {
  const payload = {
    type
  }

  if (type === 'cart_item') {
    Object.assign(payload, {
      id,
      quantity: parseInt(quantity, 10)
    })
  }

  if (type === 'promotion_item') {
    Object.assign(payload, {
      code: id
    })
  }

  return payload
}

export function buildCartCheckoutData(
  customer,
  billing_address,
  shipping_address
) {
  let parsedCustomer = customer

  if (typeof customer === 'string') parsedCustomer = { id: customer }

  return {
    customer: parsedCustomer,
    billing_address,
    shipping_address
  }
}

export function resetProps(instance) {
  const inst = instance
  ;['includes', 'sort', 'limit', 'offset', 'filter'].forEach(
    e => delete inst[e]
  )
}
