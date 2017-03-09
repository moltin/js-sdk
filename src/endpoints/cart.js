import BaseExtend from '../extends/base';

import { cartIdentifier } from '../utils/helpers';

class CartEndpoint extends BaseExtend {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'carts';
    this.cartId = cartIdentifier();
  }

  Get(cartId = this.cartId) {
    return this.request.send(`${this.endpoint}/${cartId}`, 'GET');
  }

  Items(cartId = this.cartId) {
    return this.request.send(`${this.endpoint}/${cartId}/items`, 'GET');
  }

  AddProduct(productId, quantity = 1, cartId = this.cartId) {
    const productObject = {
      id: productId,
      type: 'cart_item',
      quantity: parseInt(quantity)
    };

    return this.request.send(`${this.endpoint}/${cartId}/items`, 'POST', productObject);
  }

  AddCustomItem(body, cartId = this.cartId) {
    const itemObject = Object.assign(body, {
      type: 'custom_item'
    });

    return this.request.send(`${this.endpoint}/${cartId}/items`, 'POST', itemObject);
  }

  RemoveItem(productId, cartId = this.cartId) {
    return this.request.send(`${this.endpoint}/${cartId}/items/${productId}`, 'DELETE');
  }

  UpdateItemQuantity(productId, quantity, cartId = this.cartId) {
    const productObject = {
      quantity: parseInt(quantity)
    };

    return this.request.send(`${this.endpoint}/${cartId}/items/${productId}`, 'PUT', productObject);
  }

  Checkout(body, cartId = this.cartId) {
    return this.request.send(`${this.endpoint}/${cartId}/checkout`, 'POST', body);
  }

  Delete(cartId = this.cartId) {
    return this.request.send(`${this.endpoint}/${cartId}`, 'DELETE');
  }
}

export default CartEndpoint;
