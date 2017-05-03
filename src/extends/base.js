import RequestFactory from '../factories/request';
import { buildURL } from '../utils/helpers';

class BaseExtend {
  constructor(config) {
    this.request = new RequestFactory(config);

    this.config = config;
  }

  All() {
    this.call = this.request.send(buildURL(this.endpoint, this.includes, this.sort), 'GET');

    return this.call;
  }

  Get(id) {
    this.call = this.request.send(buildURL(`${this.endpoint}/${id}`, this.includes), 'GET');

    return this.call;
  }


  Sort(value) {
    this.sort = value;

    return this;
  }
}

export default BaseExtend;
