import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'
import { productsArray as products } from '../factories'

const apiUrl = 'https://api.moltin.com/v2'

describe('Moltin products', () => {
  it('should return an array of products', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/products')
      .reply(200, { data: products })

    return Moltin.Products.All().then(response => {
      assert.lengthOf(response.data, 4)
    })
  })

  it('should return a single product', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/products/1')
      .reply(200, products[0])

    return Moltin.Products.Get('1').then(response => {
      assert.propertyVal(response, 'name', 'Product 1')
    })
  })

  it('should return a filtered array of products', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/products?filter=eq(status,live):eq(slug,new-slug):gt(stock,2)')
      .reply(200, { data: products })

    return Moltin.Products.Filter({
      eq: {
        status: 'live',
        slug: 'new-slug'
      },
      gt: {
        stock: 2
      }
    })
      .All()
      .then(response => {
        assert.lengthOf(response.data, 4)
      })
  })

  it('should return a limited number of products', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/products')
      .query({
        page: {
          limit: 4
        }
      })
      .reply(200, { data: products })

    return Moltin.Products.Limit(4)
      .All()
      .then(response => {
        assert.lengthOf(response.data, 4)
      })
  })

  it('should return an array products offset by a value', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/products')
      .query({
        page: {
          offset: 10
        }
      })
      .reply(200, { data: products })

    return Moltin.Products.Offset(10)
      .All()
      .then(response => {
        assert.lengthOf(response.data, 4)
      })
  })

  it('should return all products and include associated brands, categories, collections', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/products')
      .query({
        include: 'brands,categories,collections'
      })
      .reply(200, { data: products })

    return Moltin.Products.With(['brands', 'categories', 'collections'])
      .All()
      .then(response => {
        assert.lengthOf(response.data, 4)
      })
  })

  it('should return a single product and include associated brands, categories, collections', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/products/1')
      .query({
        include: 'brands,categories,collections'
      })
      .reply(200, products[0])

    return Moltin.Products.With(['brands', 'categories', 'collections'])
      .Get('1')
      .then(response => {
        assert.propertyVal(response, 'name', 'Product 1')
      })
  })

  it('should return all products sorted by name key', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/products')
      .query({
        sort: 'name'
      })
      .reply(200, { data: products })

    return Moltin.Products.Sort('name')
      .All()
      .then(response => {
        assert.lengthOf(response.data, 4)
      })
  })

  it('should create a new product', () => {
    const newProduct = {
      type: 'product' as const,
      name: 'Product 1',
      slug: 'product-1',
      sku: 'product1sku',
      manage_stock: true,
      description: 'Product 1 description',
      price: [{
        amount: 123,
        currency: 'USD',
        includes_tax: false,
      }],
      status: 'live' as const,
      commodity_type: 'physical' as const
    };

    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/products')
      .reply(201, { data: { ...newProduct, id: 'product1Id' } })

    return Moltin.Products.Create(newProduct)
    .then(response => {
      assert.equal(response.data.id, 'product1Id');
      assert.equal(response.data.type, newProduct.type);
      assert.equal(response.data.name, newProduct.name);
      assert.equal(response.data.slug, newProduct.slug);
      assert.equal(response.data.sku, newProduct.sku);
      assert.equal(response.data.manage_stock, newProduct.manage_stock);
      assert.equal(response.data.description, newProduct.description);
      assert.deepEqual(response.data.price, newProduct.price);
      assert.equal(response.data.status, newProduct.status);
      assert.equal(response.data.commodity_type, newProduct.commodity_type);
    })
  })

  it('should update a product', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .put('/products/1', {
        data: {
          type: 'product',
          name: 'Updated product name'
        }
      })
      .reply(200, {
        name: 'Updated product name'
      })

    return Moltin.Products.Update('1', {
      name: 'Updated product name'
    }).then(response => {
      assert.propertyVal(response, 'name', 'Updated product name')
    })
  })

  it('should delete a product', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .delete('/products/1')
      .reply(204)

    return Moltin.Products.Delete('1').then(response => {
      assert.equal(response, '{}')
    })
  })

  it('should not persist the includes property after request', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/products')
      .query({
        include: 'brands'
      })
      .reply(200, products)

    return Moltin.Products.With('brands')
      .All()
      .then(() => {
        assert.notExists((Moltin.Products as any).includes)
      })
  })

  it('should not persist the sort property after request', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/products')
      .query({
        sort: 'name'
      })
      .reply(200, products)

    return Moltin.Products.Sort('name')
      .All()
      .then(() => {
        assert.notExists((Moltin.Products as any).sort)
      })
  })

  it('should not persist the limit property after request', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/products')
      .query({
        page: {
          limit: 4
        }
      })
      .reply(200, products)

    return Moltin.Products.Limit(4)
      .All()
      .then(() => {
        assert.notExists((Moltin.Products as any).limit)
      })
  })

  it('should not persist the offset property after request', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/products')
      .query({
        page: {
          offset: 10
        }
      })
      .reply(200, products)

    return Moltin.Products.Offset(10)
      .All()
      .then(() => {
        assert.notExists((Moltin.Products as any).offset)
      })
  })

  it('should not persist the filter property after request', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/products?filter=eq(status,live):eq(slug,new-slug):gt(stock,2)')
      .reply(200, products)

    return Moltin.Products.Filter({
      eq: {
        status: 'live',
        slug: 'new-slug'
      },
      gt: {
        stock: 2
      }
    })
      .All()
      .then(() => {
        assert.notExists((Moltin.Products as any).filter)
      })
  })

  it('should get products attributes', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/products/attributes')
      .reply(200, { data: products })

    return Moltin.Products.Attributes("1")
  })
})
