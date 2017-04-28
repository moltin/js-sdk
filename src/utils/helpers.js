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

export function buildURL(endpoint, resources = null) {
  if (resources) {
    return `${endpoint}?include=${resources}`;
  }

  return `${endpoint}`;
}
