import StorageFactory from '../factories/storage';

export function buildRelationshipData(type, ids) {
  let data = [];

  if (ids === null || ids.length === 0) {
    return null;
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

export function cartIdentifier(reset = false, id = false) {
  const storage = new StorageFactory();

  if (!reset && !id && storage.get('mcart') !== null) {
    return storage.get('mcart');
  }

  if (!id) {
    id = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16));
  }

  storage.set('mcart', id);

  return id;
}

export function setHeaderContentType(uri, method) {
  let contentType = 'application/json';

  if (uri === 'files' && method === 'POST') {
    contentType = 'multipart/form-data';
  }

  return contentType;
}

function formatQueryString(key, value) {
  if (key === 'limit' || key === 'offset') {
    return `page${(value)}`;
  }

  return `${key}=${value}`;
}

function buildQueryParams(includes, sort, limit, offset) {
  const params = {};

  if (includes) {
    params.include = includes;
  }

  if (sort) {
    params.sort = `(${sort})`;
  }

  if (limit) {
    params.limit = `[limit]=${limit}`;
  }

  if (offset) {
    params.offset = `[offset]=${offset}`;
  }

  return Object.keys(params).map(k => formatQueryString(k, params[k])).join('&');
}

export function buildURL(endpoint, includes = null, sort = null, limit = null, offset = null) {
  if (includes || sort || limit || offset) {
    const params = buildQueryParams(includes, sort, limit, offset);

    return `${endpoint}?${params}`;
  }

  return endpoint;
}


export function buildRequestBody(method, body) {
  if (method !== 'GET') {
    return `{"data":${JSON.stringify(body)}}`;
  }

  return null;
}

export function buildCartItemData(product, quantity, type = 'cart_item') {
  return {
    id: product,
    type,
    quantity: parseInt(quantity, 10),
  };
}
