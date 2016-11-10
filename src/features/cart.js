class Cart extends Abstract {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'carts';
    this.cartId = this.Identifier();
  }

  Identifier(reset = false, id = false) {

    if (!reset && !id && this.m.Storage.get('mcart') !== null) {
      return this.m.Storage.get('mcart');
    }

    if (!id) {
      id = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16));
    }

    this.m.Storage.set('mcart', id);

    this.cartId = id;

    return id;
  }

  Contents(callback, error) {
    return this.m.Request(`${this.endpoint}/${this.cartId}/items`, 'GET', callback, error);
  }

  Insert(product, quantity, callback, error) {
    let quantityInt = parseInt(quantity);

    if (product.constructor === Array) {
      return this.m.Request(`${this.endpoint}/${this.cartId}/items`, 'POST', product, callback, error);
    }

    return this.m.Request(`${this.endpoint}/${this.cartId}/items`, 'POST', [{
      id: product,
      quantity: quantityInt || 1
    }], callback, error);
  }

  Remove(id, callback, error) {
    return this.m.Request(`${this.endpoint}/${this.cartId}/items/${id}`, 'DELETE', callback, error);
  }

  Quantity(id, quantity, callback, error) {
    let quantityInt = parseInt(quantity);

    return this.m.Request(`${this.endpoint}/${this.cartId}/items/${id}`, 'PUT', [{
      id: id,
      quantity: quantityInt
    }], callback, error);
  }

  Complete(data, callback, error) {
    return this.m.Request(`${this.endpoint}/${this.cartId}/checkout`, 'POST', data, callback, error);
  }

  Delete(callback, error) {
    return this.m.Request(`${this.endpoint}/${this.cartId}`, 'DELETE', callback, error);
  }
}
