import { pluralize, underscore } from 'inflected'
import { StorageFactory } from './storage-factory';
import { UrlParams, Filter } from './base';
import { DEFINEME } from './helper';

interface IdType {
  id: string;
  type: string;
}

export function buildRelationshipData(type: string, ids: string | string[]) {
  let data: IdType[] = [];

  if (ids === null || ids.length === 0) {
    return data;
  }

  if (typeof ids === 'string') {
    const obj = { type: underscore(type), id: ids };

    return [obj];
  }

  if (Array.isArray(ids)) {
    data = ids.map(id => ({
      type: underscore(type),
      id
    }));
  }

  return data;
}

export function formatUrlResource(type: string) {
  if (type === 'main-image') return type

  return pluralize(type)
}

export function createCartIdentifier() {
  return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, () =>
    ((Math.random() * 16) | 0).toString(16)
  )
}

export function cartIdentifier(storage: StorageFactory) {
  const cartId = createCartIdentifier()

  if (storage.get('mcart') !== null) {
    return storage.get('mcart')
  }

  storage.set('mcart', cartId)

  return cartId
}

export function parseJSON(response: any) {
  return new Promise(resolve => {
    response.text().then((body: any) => {
      resolve({
        status: response.status,
        ok: response.ok,
        json: body !== '' ? JSON.parse(body) : '{}'
      })
    })
  })
}

function formatFilterString(type: string, filter: { [prop: string]: any }) {
  const filterStringArray = Object.keys(filter).map(key => {
    const value = filter[key];
    let queryString = `${key},${value}`;

    if (typeof value === 'object')
      queryString = Object.keys(value)
        .map(attr => `${key}.${attr},${value[attr]}`)
        .join(',');

    return `${type}(${queryString})`;
  });

  return filterStringArray.join(':');
}

function formatQueryString(key: string, value: string | Filter) {
  if (key === 'limit' || key === 'offset') {
    return `page${value}`
  }

  if (key === 'filter') {
    const filterValues = Object.keys(value).map(filter =>
      formatFilterString(filter, (value as Filter)[filter])
    )

    return `${key}=${filterValues.join(':')}`
  }

  return `${key}=${value}`
}

function buildQueryParams({ includes, sort, limit, offset, filter }: Partial<UrlParams>) {
  const query: {
    include?: string;
    sort?: string;
    limit?: string;
    offset?: string;
    filter?: Filter;
  } = {};

  if (includes) {
    query.include = includes;
  }

  if (sort) {
    query.sort = `${sort}`;
  }

  if (limit) {
    query.limit = `[limit]=${limit}`;
  }

  if (offset) {
    query.offset = `[offset]=${offset}`;
  }

  if (filter) {
    query.filter = filter;
  }

  return Object.keys(query)
    .map(k => {
      const q = (query as any)[k];
      return formatQueryString(k, q);
    })
    .join('&');
}

export function buildURL(endpoint: string, params: Partial<UrlParams>) {
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

export function buildRequestBody(body: any) {
  let parsedBody: any;

  if (body) {
    parsedBody = `{
      "data": ${JSON.stringify(body)}
    }`
  }

  return parsedBody
}

export function buildCartItemData(id: string, quantity: string | null = null, type: string = 'cart_item') {
  const payload = {
    type
  }

  if (type === 'cart_item') {
    Object.assign(payload, {
      id,
      quantity: parseInt(quantity ?? '', 10)
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
  customer: DEFINEME,
  billing_address: DEFINEME,
  shipping_address: DEFINEME
) {
  let parsedCustomer = customer

  if (typeof customer === 'string') {
    parsedCustomer = { id: customer };
  }

  return {
    customer: parsedCustomer,
    billing_address,
    shipping_address
  }
}

export function resetProps(instance: any) {
  const inst = instance;

  ['includes', 'sort', 'limit', 'offset', 'filter'].forEach(
    e => delete inst[e]
  )
}
