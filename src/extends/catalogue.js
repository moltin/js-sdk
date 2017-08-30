import BaseExtend from './base';

class CatalogueExtend extends BaseExtend {
  Create(body) {
    return this.request.send(`${this.endpoint}`, 'POST', body);
  }

  Delete(id) {
    return this.request.send(`${this.endpoint}/${id}`, 'DELETE');
  }

  Update(id, body) {
    return this.request.send(`${this.endpoint}/${id}`, 'PUT', body);
  }

  With(includes) {
    if (includes) this.includes = includes.toString().toLowerCase();

    return this;
  }
}

export default CatalogueExtend;
