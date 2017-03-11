/* jshint node: true */

const assert = require('chai').assert;
const nock = require('nock');
const moltin = require('../../dist/moltin.cjs.js');
const items = require('../factories').cartItemsArray;
const store = moltin.gateway({
  client_id: 'XXX'
});

const apiUrl = 'https://api.moltin.com/v2';

describe('Moltin cart', () => {
  beforeEach(() => {
    store.Cart.cartId = '3';

    cartId = store.Cart.cartId;

    order = {
      customer: {
        name: 'John Doe',
        email: 'john@doe.co'
      },
      billing_address: {
        first_name: 'John',
        last_name: 'Doe',
        line_1: '1 Test Street',
        postcode: 'NE1 6UF',
        county: 'Tyne & Wear',
        country: 'UK'
      },
      shipping_address: {
        first_name: 'John',
        last_name: 'Doe',
        line_1: '1 Test Street',
        postcode: 'NE1 6UF',
        county: 'Tyne & Wear',
        country: 'UK'
      }
    };
  });

  it('should return a cart', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .get(`/carts/${cartId}`)
    .reply(200, {
      id: '3'
    });

    return store.Cart.Get().then((cart) => {
      assert.propertyVal(cart, 'id', '3');
    });
  });

  it('should return a cart with a cart id argument', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .get(`/carts/5`)
    .reply(200, {
      id: '5'
    });

    return store.Cart.Get('5').then((cart) => {
      assert.propertyVal(cart, 'id', '5');
    });
  });

  it('should return an array of cart items', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .get(`/carts/${cartId}/items`)
    .reply(200, items);

    return store.Cart.Items().then((items) => {
      assert.lengthOf(items, 4);
    });
  });

  it('should return an array of cart items with a cart id argument', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .get(`/carts/5/items`)
    .reply(200, items);

    return store.Cart.Items('5').then((items) => {
      assert.lengthOf(items, 4);
    });
  });

  it('should add a product to the cart', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .post(`/carts/${cartId}/items`, {
      data: {
        type: 'cart_item',
        quantity: 2
      }
    })
    .reply(201, {
      product_id: '4',
      quantity: 2
    });

    return store.Cart.AddProduct('4', 2).then((item) => {
      assert.propertyVal(item, 'product_id', '4');
      assert.propertyVal(item, 'quantity', 2);
    });
  });

  it('should add a product to the cart with a cart id argument', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .post('/carts/5/items', {
      data: {
        type: 'cart_item',
        quantity: 2
      }
    })
    .reply(201, {
      product_id: '4',
      quantity: 2
    });

    return store.Cart.AddProduct('4', 2, '5').then((item) => {
      assert.propertyVal(item, 'product_id', '4');
      assert.propertyVal(item, 'quantity', 2);
    });
  });

  it('should add a product to the cart without quantity paramater', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .post(`/carts/${cartId}/items`, {
      data: {
        type: 'cart_item',
        quantity: 1
      }
    })
    .reply(201, {
      product_id: '4',
      quantity: 1
    });

    return store.Cart.AddProduct('4').then((item) => {
      assert.propertyVal(item, 'product_id', '4');
      assert.propertyVal(item, 'quantity', 1);
    });
  });

  it('should add a custom item to the cart', () => {
    const item = {
      name: 'Custom Item',
      sku: '001',
      description: 'A new custom item',
      quantity: 1,
      price: {
        amount: 20
      }
    };

    // Intercept the API request
    nock(apiUrl)
    .post(`/carts/${cartId}/items`, {
      data: {
        type: 'custom_item',
        name: 'Custom Item',
        sku: '001',
        description: 'A new custom item',
        quantity: 1,
        price: {
          amount: 20
        }
      }
    })
    .reply(201, {
      name: 'Custom Item',
      quantity: 1
    });

    return store.Cart.AddCustomItem(item).then((item) => {
      assert.propertyVal(item, 'name', 'Custom Item');
      assert.propertyVal(item, 'quantity', 1);
    });
  });

  it('should update the quantity of a cart item', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .put(`/carts/${cartId}/items/2`)
    .reply(200, {
      product_id: '2',
      quantity: 6
    });

    return store.Cart.UpdateItemQuantity('2', 6).then((item) => {
      assert.propertyVal(item, 'product_id', '2');
      assert.propertyVal(item, 'quantity', 6);
    });
  });

  it('should delete a cart item', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .delete(`/carts/${cartId}/items/2`)
    .reply(200, items);

    return store.Cart.RemoveItem('2').then((items) => {
      assert.lengthOf(items, 4);
    });
  });

  it('should delete a cart item with a cart id argument', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .delete('/carts/5/items/2')
    .reply(200, items);

    return store.Cart.RemoveItem('2', '5').then((items) => {
      assert.lengthOf(items, 4);
    });
  });

  it('should delete a cart', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .delete(`/carts/${cartId}`)
    .reply(200, {});

    return store.Cart.Delete().then((cart) => {
      assert.deepEqual(cart, {});
    });
  });

  it('should delete a cart with a cart id argument', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .delete('/carts/5')
    .reply(200, {});

    return store.Cart.Delete('5').then((cart) => {
      assert.deepEqual(cart, {});
    });
  });

  it('should create an order', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .post(`/carts/${cartId}/checkout`, {
      data: this.order
    })
    .reply(201, {
      id: '1',
      status: 'complete'
    });

    return store.Cart.Checkout(this.order).then((order) => {
      assert.propertyVal(order, 'id', '1');
      assert.propertyVal(order, 'status', 'complete');
    });
  });

  it('should create an order with a cart id argument', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .post('/carts/5/checkout', {
      data: this.order
    })
    .reply(201, {
      id: '1',
      status: 'complete'
    });

    return store.Cart.Checkout(this.order, '5').then((order) => {
      assert.propertyVal(order, 'id', '1');
      assert.propertyVal(order, 'status', 'complete');
    });
  });
});
