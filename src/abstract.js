import RequestFactory from './factories/request';

class Abstract {
  constructor(config) {
    this.request = new RequestFactory(config);

    this.config = config;
  }

  Get(id, params) {
    if (this.endpoint === 'carts') {
      return this.request.send(`${this.endpoint}/${this.cartId}`, 'GET');
    }

    if (params) {
      const includes = params.toString();

      return this.request.send(`${this.endpoint}/${id}?include=${includes}`, 'GET');
    }

    return this.request.send(`${this.endpoint}/${id}`, 'GET');
  }

  List(params) {
    if (params) {
      const includes = params.toString();

      return this.request.send(`${this.endpoint}?include=${includes}`, 'GET');
    }

    return this.request.send(`${this.endpoint}`, 'GET');
  }
}

export default Abstract;
