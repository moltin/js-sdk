import uuidv4 from 'uuid/v4';
import StorageFactory from '../factories/storage';

export function buildRelationshipData(type, ids) {
  let data = [];

  if (ids === null || ids.length === 0) {
    return [];
  }

  if (typeof ids === 'string') {
    return [{
      type,
      id: ids,
    }];
  }

  if (Array.isArray(ids)) {
    data = ids.map(id => ({
      type,
      id,
    }));
  }

  return data;
}

export function cartIdentifier() {
  const storage = new StorageFactory();
  const cartId = uuidv4();

  if (storage.get('mcart') !== null) {
    return storage.get('mcart');
  }

  storage.set('mcart', cartId);

  return cartId;
}

export function parseJSON(response) {
  if (response.status === 204) {
    return new Promise((resolve) => {
      resolve({
        status: response.status,
        ok: response.ok,
        json: '{}',
      });
    });
  }

  return new Promise(resolve => response.json()
  .then(json => resolve({
    status: response.status,
    ok: response.ok,
    json,
  })));
}

function formatFilterString(type, filter) {
  const filterStringArray = Object.keys(filter).map((key) => {
    const value = filter[key];

    return `${type}(${key},${value})`;
  });

  return filterStringArray.join(':');
}

function formatQueryString(key, value) {
  if (key === 'limit' || key === 'offset') {
    return `page${(value)}`;
  }

  if (key === 'filter') {
    const filterValues = Object.keys(value).map(
      filter => formatFilterString(filter, value[filter]));

    return `${key}=${filterValues.join(':')}`;
  }

  return `${key}=${value}`;
}

function buildQueryParams({ includes, sort, limit, offset, filter }) {
  const query = {};

  if (includes) {
    query.include = includes;
  }

  if (sort) {
    query.sort = `(${sort})`;
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

  return Object.keys(query).map(k => formatQueryString(k, query[k])).join('&');
}

export function buildURL(endpoint, params) {
  if (params.includes || params.sort || params.limit || params.offset || params.filter) {
    const paramsString = buildQueryParams(params);

    return `${endpoint}?${paramsString}`;
  }

  return endpoint;
}

export function buildRequestBody(body) {
  let parsedBody;

  if (body) {
    parsedBody = `{
      "data": ${JSON.stringify(body)}
    }`;
  }

  return parsedBody;
}

export function buildCartItemData(id, quantity = null, type = 'cart_item') {
  const payload = {
    type,
  };

  if (type === 'cart_item') {
    Object.assign(payload, {
      id,
      quantity: parseInt(quantity, 10),
    });
  }

  if (type === 'promotion_item') {
    Object.assign(payload, {
      code: id,
    });
  }

  return payload;
}
