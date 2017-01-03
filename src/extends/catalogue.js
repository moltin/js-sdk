import BaseExtend from './base';

import { mergeBodyObject } from '../utils/helpers';

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
    return this.request.send(`${this.endpoint}/${id}`, 'PUT', body);
  }
}

export default CatalogueExtend;
