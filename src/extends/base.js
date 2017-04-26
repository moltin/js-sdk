import RequestFactory from '../factories/request';
import { buildURL } from '../utils/helpers';

class BaseExtend {
  constructor(config) {
    this.request = new RequestFactory(config);

    this.config = config;
  }

  All() {
    this.call = this.request.send(buildURL(this.endpoint, this.resources), 'GET');

    return this.call;
  }

  Get(id) {
    this.call = this.request.send(buildURL(`${this.endpoint}/${id}`, this.resources), 'GET');

    return this.call;
  }
}

export default BaseExtend;
