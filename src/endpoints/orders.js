import BaseExtend from '../extends/base';

import { mergeBodyObject } from '../utils/helpers';

class OrdersEndpoint extends BaseExtend {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'orders';
  }

  List() {
    return this.request.send(`${this.endpoint}`, 'GET');
  }

  Payment(id, body) {
    return this.request.send(`${this.endpoint}/${id}/payments`, 'POST', mergeBodyObject(body, 'method', 'purchase'));
  }
}

export default OrdersEndpoint;
