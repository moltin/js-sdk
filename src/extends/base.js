import RequestFactory from '../factories/request';
import { buildURL } from '../utils/helpers';

class BaseExtend {
  constructor(config) {
    this.request = new RequestFactory(config);

    this.config = config;
  }

  All() {
    this.call = this.request.send(buildURL(this.endpoint, this.includes, this.sort, this.limit, this.offset), 'GET');

    return this.call;
  }

  Get(id) {
    this.call = this.request.send(buildURL(`${this.endpoint}/${id}`, this.includes), 'GET');

    return this.call;
  }

  Limit(value) {
    this.limit = value;

    return this;
  }

  Offset(value) {
    this.offset = value;

    return this;
  }

  Sort(value) {
    this.sort = value;

    return this;
  }
}

export default BaseExtend;
