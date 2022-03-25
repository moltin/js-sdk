import { pluralize, underscore } from 'inflected'

export function buildRelationshipData(type, ids, typeModifier = underscore) {
  let data = []

  if (ids === null || ids.length === 0) return data

  if (typeof ids === 'string') {
    const obj = { type: typeModifier(type), id: ids }

    return [obj]
  }

  if (Array.isArray(ids)) {
    data = ids.map(item => {
      if (typeof item === 'object' && item !== null) {
        return {
          type: typeModifier(type),
          ...item
        }
      }
      return {
        type: typeModifier(type),
        id: item
      }
    })
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

  if (storage.get('mcart') !== null && storage.get('mcart') !== undefined) {
    return storage.get('mcart')
  }

  storage.set('mcart', cartId)

  return cartId
}

export function parseJSON(response) {
  return new Promise(resolve => {
    response.text().then(body => {
      resolve({
        status: response.status,
        ok: response.ok,
        json: body !== '' ? JSON.parse(body) : '{}'
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

export function formatQueryParams(query) {
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
    if (body.options) {
      parsedBody = `{
        "data": ${JSON.stringify(body.data)},
        "options" : ${JSON.stringify(body.options)}
      }`
    } else {
      parsedBody = `{
        "data": ${JSON.stringify(body)}
      }`
    }
  }

  return parsedBody
}

export function buildCartItemData(
  id,
  quantity = null,
  type = 'cart_item',
  flows,
  isSku = false
) {
  const payload = {
    type,
    ...flows
  }

  if (type === 'cart_item') {
    if (isSku)
      Object.assign(payload, {
        sku: id,
        quantity: parseInt(quantity, 10)
      })
    else
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

export function getCredentials(storage) {
  return JSON.parse(storage.get('moltinCredentials'))
}

export function tokenInvalid({ storage, client_id, reauth }) {
  const credentials = getCredentials(storage)

  const handleInvalid = message => {
    const logger = reauth ? console.info : console.error
    logger(message)

    return true
  }

  if (!credentials)
    return handleInvalid('Token status: credentials do not exist')

  if (!credentials.access_token)
    return handleInvalid('Token status: credentials missing access_token')

  if (credentials.client_id !== client_id)
    return handleInvalid('Token status: client_id mismatch')

  if (Math.floor(Date.now() / 1000) >= credentials.expires)
    return handleInvalid('Token status: credentials expired')

  return false
}

export function isNode() {
  return (
    typeof process !== 'undefined' &&
    process.versions != null &&
    process.versions.node != null
  )
}
