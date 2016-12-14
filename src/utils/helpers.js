import StorageFactory from '../factories/storage';

export function parseRelationshipType(type) {
  let parsedType = `${type}s`;

  if (type === 'category') {
    parsedType = 'categories';
  }

  return parsedType;
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

export function mergeBodyObject(body, key, value) {
  let mergedBody = body;

  if (!(key in body)) {
    mergedBody = Object.assign(body, {
      key: value
    });
  }

  return mergedBody;
}
