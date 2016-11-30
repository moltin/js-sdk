import Abstract from '../abstract';
import StorageFactory from '../factories/storage';

class CartEndpoint extends Abstract {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'carts';
    this.storage = new StorageFactory();
    this.cartId = this.identifier();
  }

  identifier(reset = false, id = false) {
    const storage = this.storage;

    if (!reset && !id && storage.get('mcart') !== null) {
      return storage.get('mcart');
    }

    if (!id) {
      id = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16));
    }

    storage.set('mcart', id);

    return id;
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

  Complete(data) {
    return this.request.send(`${this.endpoint}/${this.cartId}/checkout`, 'POST', data);
  }

  Delete() {
    return this.request.send(`${this.endpoint}/${this.cartId}`, 'DELETE');
  }
}

export default CartEndpoint;
