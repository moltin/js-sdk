import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'
import {
  cartItemsArray as items,
  customCartData as customData
} from '../factories'

const apiUrl = 'https://api.moltin.com/v2'

describe('Moltin cart', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX'
  })

  Moltin.cartId = '3'

  const customerId = {
    id: '1'
  }

  const customerEmail = {
    email: 'john@doe.com',
    name: 'John Doe'
  }

  const billing_address = {
    first_name: 'John',
    last_name: 'Doe',
    line_1: '1 Test Street',
    postcode: 'NE1 6UF',
    county: 'Tyne & Wear',
    country: 'UK'
  }

  const shipping_address = {
    first_name: 'John',
    last_name: 'Doe',
    line_1: '1 Moltin Street',
    postcode: 'NE1 6UF',
    county: 'Tyne & Wear',
    country: 'UK'
  }

  it('should return a cart', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/carts/3')
      .reply(200, {
        id: '3'
      })

    return Moltin.Cart()
      .Get()
      .then(response => {
        assert.propertyVal(response, 'id', '3')
      })
  })

  it('should return a cart with a cart id argument', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/carts/5')
      .reply(200, {
        id: '5'
      })

    return Moltin.Cart('5')
      .Get()
      .then(response => {
        assert.propertyVal(response, 'id', '5')
      })
  })

  it('should return an array of cart items', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/carts/3/items')
      .reply(200, items)

    return Moltin.Cart()
      .Items()
      .then(response => {
        assert.lengthOf(response, 4)
      })
  })

  it('should return an array of cart items with a cart id argument', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/carts/5/items')
      .reply(200, items)

    return Moltin.Cart('5')
      .Items()
      .then(response => {
        assert.lengthOf(response, 4)
      })
  })

  it('should add a product to the cart', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/carts/3/items', {
        data: {
          type: 'cart_item',
          id: '4',
          quantity: 2
        }
      })
      .reply(201, {
        id: '4',
        quantity: 2
      })

    return Moltin.Cart()
      .AddProduct('4', 2)
      .then(response => {
        assert.propertyVal(response, 'id', '4')
        assert.propertyVal(response, 'quantity', 2)
      })
  })

  it('should add a product to the cart with a cart id argument', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/carts/5/items', {
        data: {
          type: 'cart_item',
          id: '4',
          quantity: 2
        }
      })
      .reply(201, {
        id: '4',
        quantity: 2
      })

    return Moltin.Cart('5')
      .AddProduct('4', 2)
      .then(response => {
        assert.propertyVal(response, 'id', '4')
        assert.propertyVal(response, 'quantity', 2)
      })
  })

  it('should add a product to the cart with custom data and with cart id argument', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/carts/6/items', {
        data: {
          type: 'cart_item',
          id: '4',
          quantity: 2,
          image_url: 'image.link.com'
        }
      })
      .reply(201, {
        id: '4',
        quantity: 2,
        image_url: 'image.link.com'
      })

    return Moltin.Cart('6')
      .AddProduct('4', 2, customData)
      .then(response => {
        assert.propertyVal(response, 'id', '4', 'image.link.com')
        assert.propertyVal(response, 'quantity', 2)
      })
  })

  it('should add a product to the cart without quantity paramater', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/carts/3/items', {
        data: {
          type: 'cart_item',
          id: '4',
          quantity: 1
        }
      })
      .reply(201, {
        id: '4',
        quantity: 1
      })

    return Moltin.Cart()
      .AddProduct('4')
      .then(response => {
        assert.propertyVal(response, 'id', '4')
        assert.propertyVal(response, 'quantity', 1)
      })
  })

  it('should add a custom item to the cart', () => {
    const item = {
      name: 'Custom Item',
      sku: '001',
      description: 'A new custom item',
      quantity: 1,
      price: {
        amount: 20
      }
    }

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/carts/3/items', {
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
      })

    return Moltin.Cart()
      .AddCustomItem(item)
      .then(response => {
        assert.propertyVal(response, 'name', 'Custom Item')
        assert.propertyVal(response, 'quantity', 1)
      })
  })

  it('should add a promotion to the cart', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/carts/3/items', {
        data: {
          type: 'promotion_item',
          code: 'testcode'
        }
      })
      .reply(201, {
        name: 'Custom Item',
        quantity: 1
      })

    return Moltin.Cart()
      .AddPromotion('testcode')
      .then(response => {
        assert.propertyVal(response, 'name', 'Custom Item')
        assert.propertyVal(response, 'quantity', 1)
      })
  })

  it('should add a promotion to the cart with a cart id argument', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/carts/5/items', {
        data: {
          type: 'promotion_item',
          code: 'testcode'
        }
      })
      .reply(201, {
        name: 'Custom Item',
        quantity: 1
      })

    return Moltin.Cart('5')
      .AddPromotion('testcode')
      .then(response => {
        assert.propertyVal(response, 'name', 'Custom Item')
        assert.propertyVal(response, 'quantity', 1)
      })
  })

  it('should update the quantity of a cart item', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .put('/carts/3/items/2', {
        data: {
          type: 'cart_item',
          id: '2',
          quantity: 6
        }
      })
      .reply(200, {
        id: '2',
        quantity: 6
      })

    return Moltin.Cart()
      .UpdateItemQuantity('2', 6)
      .then(item => {
        assert.propertyVal(item, 'id', '2')
        assert.propertyVal(item, 'quantity', 6)
      })
  })

  it('should update a cart item', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .put('/carts/3/items/2', {
        data: {
          type: 'cart_item',
          id: '2',
          quantity: 6
        }
      })
      .reply(200, {
        id: '2',
        quantity: 6
      })

    return Moltin.Cart()
      .UpdateItem('2', 6)
      .then(item => {
        assert.propertyVal(item, 'id', '2')
        assert.propertyVal(item, 'quantity', 6)
      })
  })

  it('should update a cart item with custom data', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .put('/carts/3/items/2', {
        data: {
          type: 'cart_item',
          id: '2',
          quantity: 6,
          image_url: 'image.link.com'
        }
      })
      .reply(201, {
        id: '2',
        quantity: 6,
        image_url: 'image.link.com'
      })

    return Moltin.Cart()
      .UpdateItem('2', 6, customData)
      .then(response => {
        assert.propertyVal(response, 'id', '2')
        assert.propertyVal(response, 'quantity', 6)
        assert.propertyVal(response, 'image_url', 'image.link.com')
      })
  })

  it('should delete a cart item', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .delete('/carts/3/items/2')
      .reply(200, items)

    return Moltin.Cart()
      .RemoveItem('2')
      .then(response => {
        assert.lengthOf(response, 4)
      })
  })

  it('should delete a cart item with a cart id argument', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .delete('/carts/5/items/2')
      .reply(200, items)

    return Moltin.Cart('5')
      .RemoveItem('2')
      .then(response => {
        assert.lengthOf(response, 4)
      })
  })

  it('should delete a cart', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .delete('/carts/3')
      .reply(200, {})

    return Moltin.Cart()
      .Delete()
      .then(response => {
        assert.deepEqual(response, {})
      })
  })

  it('should delete a cart with a cart id argument', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .delete('/carts/5')
      .reply(200, {})

    return Moltin.Cart('5')
      .Delete()
      .then(response => {
        assert.deepEqual(response, {})
      })
  })

  it('should add a tax item to a cart item', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/carts/3/items/5/taxes')
      .reply(200, {})

    return Moltin.Cart()
      .AddItemTax(5, {
        code: 'CALI',
        rate: 0.0775,
        jurisdiction: 'CALIFORNIA',
        name: 'California Tax'
      })
      .then(response => {
        assert.deepEqual(response, {})
      })
  })

  it('should remove a tax item to a cart item', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .delete('/carts/3/items/5/taxes/6')
      .reply(200, {})

    return Moltin.Cart()
      .RemoveItemTax('5', '6')
      .then(response => {
        assert.deepEqual(response, {})
      })
  })

  it('should checkout a cart with a customer ID', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/carts/3/checkout', {
        data: {
          customer: customerId,
          billing_address,
          shipping_address: billing_address
        }
      })
      .reply(201, {
        id: '1',
        status: 'complete'
      })

    return Moltin.Cart()
      .Checkout('1', billing_address)
      .then(response => {
        assert.propertyVal(response, 'id', '1')
        assert.propertyVal(response, 'status', 'complete')
      })
  })

  it('should checkout a cart with a customer email', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/carts/3/checkout', {
        data: {
          customer: customerEmail,
          billing_address,
          shipping_address: billing_address
        }
      })
      .reply(201, {
        id: '1',
        status: 'complete'
      })

    return Moltin.Cart()
      .Checkout(customerEmail, billing_address)
      .then(response => {
        assert.propertyVal(response, 'id', '1')
        assert.propertyVal(response, 'status', 'complete')
      })
  })

  it('should checkout a cart with a shipping address', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/carts/3/checkout', {
        data: {
          customer: customerId,
          billing_address,
          shipping_address
        }
      })
      .reply(201, {
        id: '1',
        status: 'complete'
      })

    return Moltin.Cart()
      .Checkout('1', billing_address, shipping_address)
      .then(response => {
        assert.propertyVal(response, 'id', '1')
        assert.propertyVal(response, 'status', 'complete')
      })
  })

  it('should create an order with a cart id argument', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/carts/5/checkout', {
        data: {
          customer: customerId,
          billing_address,
          shipping_address: billing_address
        }
      })
      .reply(201, {
        id: '1',
        status: 'complete'
      })

    return Moltin.Cart('5')
      .Checkout('1', billing_address)
      .then(response => {
        assert.propertyVal(response, 'id', '1')
        assert.propertyVal(response, 'status', 'complete')
      })
  })
})
