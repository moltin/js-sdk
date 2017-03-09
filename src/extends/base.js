import RequestFactory from '../factories/request';

class BaseExtend {
  constructor(config) {
    this.request = new RequestFactory(config);

    this.config = config;
  }

  Get(id, params) {
    if (params) {
      const includes = params.toString();

      return this.request.send(`${this.endpoint}/${id}?include=${includes}`, 'GET');
    }

    return this.request.send(`${this.endpoint}/${id}`, 'GET');
  }
}

export default BaseExtend;
