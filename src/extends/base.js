import RequestFactory from '../factories/request';
import { buildURL } from '../utils/helpers';

class BaseExtend {
  constructor(config) {
    this.request = new RequestFactory(config);

    this.config = config;
  }

  All() {
    this.call = this.request.send(buildURL(this.endpoint, {
      includes: this.includes,
      sort: this.sort,
      limit: this.limit,
      offset: this.offset,
      filter: this.filter,
    }), 'GET');

    return this.call;
  }

  Get(id) {
    this.call = this.request.send(buildURL(`${this.endpoint}/${id}`, {
      includes: this.includes,
    }), 'GET');

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
