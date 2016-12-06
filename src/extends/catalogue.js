import BaseExtend from './base';

class CatalogueExtend extends BaseExtend {
  List(params) {
    if (params) {
      const includes = params.toString();

      return this.request.send(`${this.endpoint}?include=${includes}`, 'GET');
    }

    return this.request.send(`${this.endpoint}`, 'GET');
  }

  Create(body) {
    return this.request.send(`${this.endpoint}`, 'POST', body);
  }

  Delete(id) {
    return this.request.send(`${this.endpoint}/${id}`, 'DELETE');
  }

  Update(id, body) {
    let parsedBody = body;

    // Add `id` key to `body` object if not included
    if (!('id' in body)) {
      parsedBody = Object.assign(body, {
        id: id
      });
    }

    return this.request.send(`${this.endpoint}/${id}`, 'PUT', parsedBody);
  }
}

export default CatalogueExtend;
