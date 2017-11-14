import RequestFactory from '../factories/request';
import { buildURL } from '../utils/helpers';

class BaseExtend {
  constructor(config) {
    this.request = new RequestFactory(config);

    this.config = config;
  }

  All(token = null) {
    const { includes, sort, limit, offset, filter } = this;

    this.call = this.request.send(buildURL(this.endpoint, {
      includes,
      sort,
      limit,
      offset,
      filter,
    }), 'GET', undefined, token);

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
