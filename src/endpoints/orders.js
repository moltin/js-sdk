import Abstract from '../abstract';

class OrdersEndpoint extends Abstract {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'orders';
  }

  Payment(id, data) {
    return this.request.send(`${this.endpoint}/${id}/payments`, 'POST', data);
  }
}

export default OrdersEndpoint;
