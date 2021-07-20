import { assert } from 'chai'
import nock from 'nock'
import {
  gateway as MoltinGateway,
  ItemTaxObject,
  CartItemsResponse
} from '../../src/moltin'
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
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
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
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
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
    const cartItemResponse: CartItemsResponse = {
      data: [
        {
          id: 'b1622dfd-0e9d-47f3-b0d4-36659e55e282',
          type: 'cart_item',
          product_id: '8361826f-84c2-4e90-9dca-f9f2ea325de3',
          name: 'Test product',
          description: 'Test product description',
          sku: 'test-product-sku',
          slug: 'test-product',
          image: {
            mime_type: 'image/png',
            file_name: 'product-image.png',
            href: 'http://www.products.com/product-image.png'
          },
          quantity: 1,
          manage_stock: false,
          unit_price: {
            amount: 234,
            currency: 'USD',
            includes_tax: true
          },
          value: {
            amount: 234,
            currency: 'USD',
            includes_tax: true
          },
          links: {
            product:
              'https://api.moltin.com/v2/products/8361826f-84c2-4e90-9dca-f9f2ea325de3'
          },
          meta: {
            display_price: {
              with_tax: {
                unit: {
                  amount: 234,
                  currency: 'USD',
                  formatted: '$2.34'
                },
                value: {
                  amount: 234,
                  currency: 'USD',
                  formatted: '$2.34'
                }
              },
              without_tax: {
                unit: {
                  amount: 234,
                  currency: 'USD',
                  formatted: '$2.34'
                },
                value: {
                  amount: 234,
                  currency: 'USD',
                  formatted: '$2.34'
                }
              },
              tax: {
                unit: {
                  amount: 0,
                  currency: 'USD',
                  formatted: '$0.00'
                },
                value: {
                  amount: 0,
                  currency: 'USD',
                  formatted: '$0.00'
                }
              }
            },
            timestamps: {
              created_at: '2020-08-21T01:45:59Z',
              updated_at: '2020-08-21T01:45:59Z',
              expires_at: '2020-08-28T01:45:59Z'
            }
          }
        }
      ],
      meta: {
        display_price: {
          with_tax: {
            amount: 234,
            currency: 'USD',
            formatted: '$2.34'
          },
          without_tax: {
            amount: 234,
            currency: 'USD',
            formatted: '$2.34'
          },
          tax: {
            amount: 0,
            currency: 'USD',
            formatted: '$0.00'
          }
        },
        timestamps: {
          created_at: '2020-08-21T01:45:59Z',
          updated_at: '2020-08-21T01:45:59Z',
          expires_at: '2020-08-28T01:45:59Z'
        }
      }
    }

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/carts/3/items')
      .reply(200, cartItemResponse)

    return Moltin.Cart()
      .Items()
      .then(response => {
        assert.equal(response.data.length, cartItemResponse.data.length)
        assert.equal(response.data[0].id, cartItemResponse.data[0].id)
        assert.equal(response.data[0].type, cartItemResponse.data[0].type)
        assert.equal(
          response.data[0].product_id,
          cartItemResponse.data[0].product_id
        )
        assert.equal(response.data[0].name, cartItemResponse.data[0].name)
        assert.equal(
          response.data[0].description,
          cartItemResponse.data[0].description
        )
        assert.equal(response.data[0].sku, cartItemResponse.data[0].sku)
        assert.equal(response.data[0].slug, cartItemResponse.data[0].slug)
        assert.equal(
          response.data[0].image.mime_type,
          cartItemResponse.data[0].image.mime_type
        )
        assert.equal(
          response.data[0].image.file_name,
          cartItemResponse.data[0].image.file_name
        )
        assert.equal(
          response.data[0].image.href,
          cartItemResponse.data[0].image.href
        )
        assert.equal(
          response.data[0].quantity,
          cartItemResponse.data[0].quantity
        )
        assert.equal(
          response.data[0].manage_stock,
          cartItemResponse.data[0].manage_stock
        )
        assert.equal(
          response.data[0].unit_price.amount,
          cartItemResponse.data[0].unit_price.amount
        )
        assert.equal(
          response.data[0].unit_price.currency,
          cartItemResponse.data[0].unit_price.currency
        )
        assert.equal(
          response.data[0].unit_price.includes_tax,
          cartItemResponse.data[0].unit_price.includes_tax
        )
        assert.equal(
          response.data[0].value.amount,
          cartItemResponse.data[0].value.amount
        )
        assert.equal(
          response.data[0].value.currency,
          cartItemResponse.data[0].value.currency
        )
        assert.equal(
          response.data[0].value.includes_tax,
          cartItemResponse.data[0].value.includes_tax
        )
        assert.equal(
          response.data[0].links.product,
          cartItemResponse.data[0].links.product
        )

        assert.equal(
          response.data[0].meta.display_price.with_tax.unit.amount,
          cartItemResponse.data[0].meta.display_price.with_tax.unit.amount
        )
        assert.equal(
          response.data[0].meta.display_price.with_tax.unit.currency,
          cartItemResponse.data[0].meta.display_price.with_tax.unit.currency
        )
        assert.equal(
          response.data[0].meta.display_price.with_tax.unit.formatted,
          cartItemResponse.data[0].meta.display_price.with_tax.unit.formatted
        )
        assert.equal(
          response.data[0].meta.display_price.with_tax.value.amount,
          cartItemResponse.data[0].meta.display_price.with_tax.value.amount
        )
        assert.equal(
          response.data[0].meta.display_price.with_tax.value.currency,
          cartItemResponse.data[0].meta.display_price.with_tax.value.currency
        )
        assert.equal(
          response.data[0].meta.display_price.with_tax.value.formatted,
          cartItemResponse.data[0].meta.display_price.with_tax.value.formatted
        )

        assert.equal(
          response.data[0].meta.display_price.without_tax.unit.amount,
          cartItemResponse.data[0].meta.display_price.without_tax.unit.amount
        )
        assert.equal(
          response.data[0].meta.display_price.without_tax.unit.currency,
          cartItemResponse.data[0].meta.display_price.without_tax.unit.currency
        )
        assert.equal(
          response.data[0].meta.display_price.without_tax.unit.formatted,
          cartItemResponse.data[0].meta.display_price.without_tax.unit.formatted
        )
        assert.equal(
          response.data[0].meta.display_price.without_tax.value.amount,
          cartItemResponse.data[0].meta.display_price.without_tax.value.amount
        )
        assert.equal(
          response.data[0].meta.display_price.without_tax.value.currency,
          cartItemResponse.data[0].meta.display_price.without_tax.value.currency
        )
        assert.equal(
          response.data[0].meta.display_price.without_tax.value.formatted,
          cartItemResponse.data[0].meta.display_price.without_tax.value
            .formatted
        )

        assert.equal(
          response.data[0].meta.display_price.tax.unit.amount,
          cartItemResponse.data[0].meta.display_price.tax.unit.amount
        )
        assert.equal(
          response.data[0].meta.display_price.tax.unit.currency,
          cartItemResponse.data[0].meta.display_price.tax.unit.currency
        )
        assert.equal(
          response.data[0].meta.display_price.tax.unit.formatted,
          cartItemResponse.data[0].meta.display_price.tax.unit.formatted
        )
        assert.equal(
          response.data[0].meta.display_price.tax.value.amount,
          cartItemResponse.data[0].meta.display_price.tax.value.amount
        )
        assert.equal(
          response.data[0].meta.display_price.tax.value.currency,
          cartItemResponse.data[0].meta.display_price.tax.value.currency
        )
        assert.equal(
          response.data[0].meta.display_price.tax.value.formatted,
          cartItemResponse.data[0].meta.display_price.tax.value.formatted
        )

        assert.equal(
          response.data[0].meta.timestamps.created_at,
          cartItemResponse.data[0].meta.timestamps.created_at
        )
        assert.equal(
          response.data[0].meta.timestamps.updated_at,
          cartItemResponse.data[0].meta.timestamps.updated_at
        )

        assert.equal(
          response.meta.display_price.with_tax.amount,
          cartItemResponse.meta.display_price.with_tax.amount
        )
        assert.equal(
          response.meta.display_price.with_tax.currency,
          cartItemResponse.meta.display_price.with_tax.currency
        )
        assert.equal(
          response.meta.display_price.with_tax.formatted,
          cartItemResponse.meta.display_price.with_tax.formatted
        )

        assert.equal(
          response.meta.display_price.without_tax.amount,
          cartItemResponse.meta.display_price.without_tax.amount
        )
        assert.equal(
          response.meta.display_price.without_tax.currency,
          cartItemResponse.meta.display_price.without_tax.currency
        )
        assert.equal(
          response.meta.display_price.without_tax.formatted,
          cartItemResponse.meta.display_price.without_tax.formatted
        )

        assert.equal(
          response.meta.display_price.tax.amount,
          cartItemResponse.meta.display_price.tax.amount
        )
        assert.equal(
          response.meta.display_price.tax.currency,
          cartItemResponse.meta.display_price.tax.currency
        )
        assert.equal(
          response.meta.display_price.tax.formatted,
          cartItemResponse.meta.display_price.tax.formatted
        )

        assert.equal(
          response.meta.timestamps.created_at,
          cartItemResponse.meta.timestamps.created_at
        )
        assert.equal(
          response.meta.timestamps.updated_at,
          cartItemResponse.meta.timestamps.updated_at
        )
      })
  })

  it('should return an array of cart items with a cart id argument', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/carts/5/items')
      .reply(200, { data: items })

    return Moltin.Cart('5')
      .Items()
      .then(response => {
        assert.lengthOf(response.data, 4)
      })
  })

  it('should add a product to the cart by productId', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
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

  it('should add a product to the cart by ProductSKU', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/carts/3/items', {
        data: {
          type: 'cart_item',
          sku: '4',
          quantity: 2
        }
      })
      .reply(201, {
        sku: '4',
        quantity: 2
      })

    return Moltin.Cart()
      .AddProduct('4', 2, {}, true)
      .then(response => {
        assert.propertyVal(response, 'sku', '4')
        assert.propertyVal(response, 'quantity', 2)
      })
  })

  it('should add a product to the cart with a cart id argument', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
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
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
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

  it('should add a product to the cart without quantity parameter', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
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
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
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
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
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

  it('should add a promotion to the cart with a customer token', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a',
        'X-MOLTIN-CUSTOMER-TOKEN': 'abcd-1234'
      }
    })
      .post('/carts/3/items', {
        data: {
          type: 'promotion_item',
          code: 'testcode'
        }
      })
      .reply(201, { name: 'Custom Item', quantity: 1 })

    return Moltin.Cart()
      .AddPromotion('testcode', 'abcd-1234')
      .then(response => {
        assert.propertyVal(response, 'name', 'Custom Item')
        assert.propertyVal(response, 'quantity', 1)
      })
  })

  it('should add a promotion to the cart with a cart id argument', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
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

  it('should add a custom item, a cart item and a promotion to the cart', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/carts/3/items', {
        data: [
          {
            type: 'custom_item',
            name: 'Custom Item',
            sku: '001',
            description: 'A new custom item',
            quantity: 1,
            price: {
              amount: 20
            }
          },
          {
            type: 'cart_item',
            id: '2',
            quantity: 1
          },
          {
            type: 'promotion_item',
            code: 'testcode'
          }
        ],
        options: { add_all_or_nothing: false }
      })
      .reply(201, {
        name: 'Custom Item',
        quantity: 1
      })

    return Moltin.Cart()
      .BulkAdd([
        {
          type: 'custom_item',
          name: 'Custom Item',
          sku: '001',
          description: 'A new custom item',
          quantity: 1,
          price: {
            amount: 20
          }
        },
        {
          type: 'cart_item',
          id: '2',
          quantity: 1
        },
        {
          type: 'promotion_item',
          code: 'testcode'
        }
      ])
      .then(response => {
        assert.propertyVal(response, 'name', 'Custom Item')
        assert.propertyVal(response, 'quantity', 1)
      })
  })

  it('should update the quantity of a cart item', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
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
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
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
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
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

  it('should update cart items', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .put('/carts/3/items', {
        data: [
          {
            type: 'cart_item',
            id: '4',
            quantity: 6
          },
          {
            type: 'cart_item',
            id: '5',
            quantity: 7
          }
        ]
      })
      .reply(200, [{ id: '4', quantity: 6 }, { id: '5', quantity: 7 }])

    return Moltin.Cart()
      .UpdateItems([
        {
          type: 'cart_item',
          id: '4',
          quantity: 6
        },
        {
          type: 'cart_item',
          id: '5',
          quantity: 7
        }
      ])
      .then(items => {
        assert.propertyVal(items[0], 'id', '4')
        assert.propertyVal(items[0], 'quantity', 6)
        assert.propertyVal(items[1], 'id', '5')
        assert.propertyVal(items[1], 'quantity', 7)
      })
  })

  it('should update cart items with custom data', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .put('/carts/3/items', {
        data: [
          {
            type: 'cart_item',
            id: '4',
            quantity: 6,
            image_url: 'example.jpg'
          },
          {
            type: 'cart_item',
            id: '5',
            quantity: 7,
            image_url: 'example-2.jpg'
          }
        ]
      })
      .reply(200, [
        { id: '4', quantity: 6, image_url: 'example.jpg' },
        { id: '5', quantity: 7, image_url: 'example-2.jpg' }
      ])

    return Moltin.Cart()
      .UpdateItems([
        {
          type: 'cart_item',
          id: '4',
          quantity: 6,
          image_url: 'example.jpg'
        },
        {
          type: 'cart_item',
          id: '5',
          quantity: 7,
          image_url: 'example-2.jpg'
        }
      ])
      .then(items => {
        assert.propertyVal(items[0], 'id', '4')
        assert.propertyVal(items[0], 'quantity', 6)
        assert.propertyVal(items[0], 'image_url', 'example.jpg')

        assert.propertyVal(items[1], 'id', '5')
        assert.propertyVal(items[1], 'quantity', 7)
        assert.propertyVal(items[1], 'image_url', 'example-2.jpg')
      })
  })

  it('should delete a cart item', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .delete('/carts/3/items/2')
      .reply(200, { data: items })

    return Moltin.Cart()
      .RemoveItem('2')
      .then(response => {
        assert.lengthOf(response.data, 4)
      })
  })

  it('should delete all cart items', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .delete('/carts/3/items')
      .reply(200, { data: items })

    return Moltin.Cart()
      .RemoveAllItems()
      .then(response => {
        assert.lengthOf(response.data, 4)
      })
  })

  it('should delete a cart item with a cart id argument', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .delete('/carts/5/items/2')
      .reply(200, { data: items })

    return Moltin.Cart('5')
      .RemoveItem('2')
      .then(response => {
        assert.lengthOf(response.data, 4)
      })
  })

  it('should delete a cart', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
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
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
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
    const itemTax: ItemTaxObject = {
      code: 'CALI',
      rate: 0.0775,
      jurisdiction: 'CALIFORNIA',
      name: 'California Tax'
    }

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/carts/3/items/5/taxes')
      .reply(200, { data: itemTax })

    return Moltin.Cart()
      .AddItemTax('5', itemTax)
      .then(response => {
        assert.equal(response.data.code, itemTax.code)
        assert.equal(response.data.rate, itemTax.rate)
        assert.equal(response.data.jurisdiction, itemTax.jurisdiction)
        assert.equal(response.data.name, itemTax.name)
      })
  })

  it('should update a tax item in a cart item', () => {
    const itemTax: ItemTaxObject = {
      code: 'CALI',
      rate: 0.0775,
      jurisdiction: 'CALIFORNIA',
      name: 'California Tax'
    }

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .put('/carts/3/items/5/taxes/6')
      .reply(200, { data: itemTax })

    return Moltin.Cart()
      .UpdateItemTax('5', '6', itemTax)
      .then(response => {
        assert.equal(response.data.code, itemTax.code)
        assert.equal(response.data.rate, itemTax.rate)
        assert.equal(response.data.jurisdiction, itemTax.jurisdiction)
        assert.equal(response.data.name, itemTax.name)
      })
  })

  it('should remove a tax item to a cart item', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
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
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
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
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
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
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
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
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
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

  it('should create a new cart', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a',
        'X-MOLTIN-CUSTOMER-TOKEN': 'testtoken'
      }
    })
      .post('/carts', {
        data: {
          id: '1',
          name: 'CartName',
          description: 'CartDescription'
        }
      })
      .reply(201, { id: '1', name: 'CartName', description: 'CartDescription' })

    return Moltin.Cart()
      .CreateCart(
        {
          id: '1',
          name: 'CartName',
          description: 'CartDescription'
        },
        'testtoken'
      )
      .then(response => {
        assert.isObject(response)
      })
  })

  it('should update a cart', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a',
        'X-MOLTIN-CUSTOMER-TOKEN': 'testtoken'
      }
    })
      .put('/carts/3', {
        data: {
          name: 'UpdatedCartName',
          description: 'UpdatedCartDescription'
        }
      })
      .reply(201, {
        name: 'UpdatedCartName',
        description: 'UpdatedCartDescription'
      })

    return Moltin.Cart()
      .UpdateCart(
        {
          name: 'UpdatedCartName',
          description: 'UpdatedCartDescription'
        },
        'testtoken'
      )
      .then(response => {
        assert.isObject(response)
      })
  })

  it('should get carts list', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a',
        'X-MOLTIN-CUSTOMER-TOKEN': 'testtoken'
      }
    })
      .get('/carts')
      .reply(200, {
        id: '1'
      })

    return Moltin.Cart()
      .GetCartsList('testtoken')
      .then(response => {
        assert.propertyVal(response, 'id', '1')
      })
  })

  it('should add a customer id association to the cart using a JWT', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a',
        'X-MOLTIN-CUSTOMER-TOKEN': 'testtoken'
      }
    })
      .post('/carts/5/relationships/customers', {
        data: [
          {
            type: 'customer',
            id: 'customer-1'
          }
        ]
      })
      .reply(200, {})

    return Moltin.Cart('5')
      .AddCustomerAssociation('customer-1', 'testtoken')
      .then(response => {
        assert.isObject(response)
      })
  })
})
