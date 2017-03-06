import BaseExtend from '../extends/base';

class OrdersEndpoint extends BaseExtend {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'orders';
  }

  List() {
    return this.request.send(`${this.endpoint}`, 'GET');
  }

  Items(id) {
    return this.request.send(`${this.endpoint}/${id}/items`, 'GET');
  }

  Payment(id, body) {
    return this.request.send(`${this.endpoint}/${id}/payments`, 'POST', body);
  }
}

export default OrdersEndpoint;
