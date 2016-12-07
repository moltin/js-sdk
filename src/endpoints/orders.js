import BaseExtend from '../extends/base';

class OrdersEndpoint extends BaseExtend {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'orders';
  }

  List() {
    return this.request.send(`${this.endpoint}`, 'GET');
  }

  Payment(id, body) {
    let parsedBody = body;

    // Add `id` key to `body` object if not included
    if (!('method' in body)) {
      parsedBody = Object.assign(body, {
        method: 'purchase'
      });
    }

    return this.request.send(`${this.endpoint}/${id}/payments`, 'POST', parsedBody);
  }
}

export default OrdersEndpoint;
