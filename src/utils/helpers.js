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

export function parseJSON(response) {
  return new Promise(resolve => response.json()
    .then(json => resolve({
      status: response.status,
      ok: response.ok,
      json,
    })));
}

export function setHeaderContentType(uri, method) {
  let contentType = 'application/json';

  if (uri === 'files' && method === 'POST') {
    contentType = 'multipart/form-data';
  }

  return contentType;
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
  if (body) {
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
