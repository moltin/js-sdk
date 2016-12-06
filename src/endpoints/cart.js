import BaseExtend from '../extends/base';

import { cartIdentifier } from '../utils/helpers';

class CartEndpoint extends BaseExtend {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'carts';
    this.cartId = cartIdentifier();
  }

  Contents() {
    return this.request.send(`${this.endpoint}/${this.cartId}/items`, 'GET');
  }

  Insert(id, quantity) {
    const productObject = {
      id: id,
      quantity: parseInt(quantity) || 1
    };

    return this.request.send(`${this.endpoint}/${this.cartId}/items`, 'POST', productObject);
  }

  Remove(id) {
    return this.request.send(`${this.endpoint}/${this.cartId}/items/${id}`, 'DELETE');
  }

  Quantity(id, quantity) {
    const productObject = {
      quantity: parseInt(quantity)
    };

    return this.request.send(`${this.endpoint}/${this.cartId}/items/${id}`, 'PUT', productObject);
  }

  Complete(body) {
    return this.request.send(`${this.endpoint}/${this.cartId}/checkout`, 'POST', body);
  }

  Delete() {
    return this.request.send(`${this.endpoint}/${this.cartId}`, 'DELETE');
  }
}

export default CartEndpoint;
