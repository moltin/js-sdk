import { assert } from 'chai';
import nock from 'nock';
import { gateway as MoltinGateway } from '../../src/moltin';
import { cartItemsArray as items } from '../factories';

const apiUrl = 'https://api.moltin.com/v2';

describe('Moltin cart', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX',
  });

  Moltin.Cart.cartId = '3';

  const order = {
    customer: {
      name: 'John Doe',
      email: 'john@doe.co',
    },
    billing_address: {
      first_name: 'John',
      last_name: 'Doe',
      line_1: '1 Test Street',
      postcode: 'NE1 6UF',
      county: 'Tyne & Wear',
      country: 'UK',
    },
    shipping_address: {
      first_name: 'John',
      last_name: 'Doe',
      line_1: '1 Test Street',
      postcode: 'NE1 6UF',
      county: 'Tyne & Wear',
      country: 'UK',
    },
  };

  it('should return a cart', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .get('/carts/3')
    .reply(200, {
      id: '3',
    });

    return Moltin.Cart.Get()
    .then((response) => {
      assert.propertyVal(response, 'id', '3');
    });
  });

  it('should return a cart with a cart id argument', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .get('/carts/5')
    .reply(200, {
      id: '5',
    });

    return Moltin.Cart.Get('5')
    .then((response) => {
      assert.propertyVal(response, 'id', '5');
    });
  });

  it('should return an array of cart items', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .get('/carts/3/items')
    .reply(200, items);

    return Moltin.Cart.Items()
    .then((response) => {
      assert.lengthOf(response, 4);
    });
  });

  it('should return an array of cart items with a cart id argument', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .get('/carts/5/items')
    .reply(200, items);

    return Moltin.Cart.Items('5')
    .then((response) => {
      assert.lengthOf(response, 4);
    });
  });

  it('should add a product to the cart', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .post('/carts/3/items', {
      data: {
        type: 'cart_item',
        id: '4',
        quantity: 2,
      },
    })
    .reply(201, {
      id: '4',
      quantity: 2,
    });

    return Moltin.Cart.AddProduct('4', 2)
    .then((response) => {
      assert.propertyVal(response, 'id', '4');
      assert.propertyVal(response, 'quantity', 2);
    });
  });

  it('should add a product to the cart with a cart id argument', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .post('/carts/5/items', {
      data: {
        type: 'cart_item',
        id: '4',
        quantity: 2,
      },
    })
    .reply(201, {
      id: '4',
      quantity: 2,
    });

    return Moltin.Cart.AddProduct('4', 2, '5')
    .then((response) => {
      assert.propertyVal(response, 'id', '4');
      assert.propertyVal(response, 'quantity', 2);
    });
  });

  it('should add a product to the cart without quantity paramater', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .post('/carts/3/items', {
      data: {
        type: 'cart_item',
        id: '4',
        quantity: 1,
      },
    })
    .reply(201, {
      id: '4',
      quantity: 1,
    });

    return Moltin.Cart.AddProduct('4')
    .then((response) => {
      assert.propertyVal(response, 'id', '4');
      assert.propertyVal(response, 'quantity', 1);
    });
  });

  it('should add a custom item to the cart', () => {
    const item = {
      name: 'Custom Item',
      sku: '001',
      description: 'A new custom item',
      quantity: 1,
      price: {
        amount: 20,
      },
    };

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .post('/carts/3/items', {
      data: {
        type: 'custom_item',
        name: 'Custom Item',
        sku: '001',
        description: 'A new custom item',
        quantity: 1,
        price: {
          amount: 20,
        },
      },
    })
    .reply(201, {
      name: 'Custom Item',
      quantity: 1,
    });

    return Moltin.Cart.AddCustomItem(item)
    .then((response) => {
      assert.propertyVal(response, 'name', 'Custom Item');
      assert.propertyVal(response, 'quantity', 1);
    });
  });

  it('should add a promotion to the cart', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .post('/carts/3/items', {
      data: {
        type: 'promotion_item',
        code: 'testcode',
      },
    })
    .reply(201, {
      name: 'Custom Item',
      quantity: 1,
    });

    return Moltin.Cart.AddPromotion('testcode')
    .then((response) => {
      assert.propertyVal(response, 'name', 'Custom Item');
      assert.propertyVal(response, 'quantity', 1);
    });
  });

  it('should update the quantity of a cart item', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .put('/carts/3/items/2', {
      data: {
        type: 'cart_item',
        id: '2',
        quantity: 6,
      },
    })
    .reply(200, {
      id: '2',
      quantity: 6,
    });

    return Moltin.Cart.UpdateItemQuantity('2', 6)
    .then((item) => {
      assert.propertyVal(item, 'id', '2');
      assert.propertyVal(item, 'quantity', 6);
    });
  });

  it('should delete a cart item', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .delete('/carts/3/items/2')
    .reply(200, items);

    return Moltin.Cart.RemoveItem('2')
    .then((response) => {
      assert.lengthOf(response, 4);
    });
  });

  it('should delete a cart item with a cart id argument', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .delete('/carts/5/items/2')
    .reply(200, items);

    return Moltin.Cart.RemoveItem('2', '5')
    .then((response) => {
      assert.lengthOf(response, 4);
    });
  });

  it('should delete a cart', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .delete('/carts/3')
    .reply(200, {});

    return Moltin.Cart.Delete()
    .then((response) => {
      assert.deepEqual(response, {});
    });
  });

  it('should delete a cart with a cart id argument', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .delete('/carts/5')
    .reply(200, {});

    return Moltin.Cart.Delete('5')
    .then((response) => {
      assert.deepEqual(response, {});
    });
  });

  it('should create an order', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .post('/carts/3/checkout', {
      data: order,
    })
    .reply(201, {
      id: '1',
      status: 'complete',
    });

    return Moltin.Cart.Checkout(order)
    .then((response) => {
      assert.propertyVal(response, 'id', '1');
      assert.propertyVal(response, 'status', 'complete');
    });
  });

  it('should create an order with a cart id argument', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .post('/carts/5/checkout', {
      data: order,
    })
    .reply(201, {
      id: '1',
      status: 'complete',
    });

    return Moltin.Cart.Checkout(order, '5')
    .then((response) => {
      assert.propertyVal(response, 'id', '1');
      assert.propertyVal(response, 'status', 'complete');
    });
  });
});
