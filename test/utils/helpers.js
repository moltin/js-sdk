import { expect } from 'chai'
import {
  buildRelationshipData,
  buildCartItemData,
  buildURL,
  createCartIdentifier,
  cartIdentifier
} from '../../src/utils/helpers'

describe('Build relationship payloads', () => {
  it('should return an array of relationship key value pairings', () => {
    const relationships = buildRelationshipData('category', ['123', '456'])

    expect(relationships).to.deep.include.members([
      { type: 'category', id: '123' },
      { type: 'category', id: '456' }
    ])
  })

  it('should return an empty array', () => {
    const relationships = buildRelationshipData('category', null)

    expect(relationships).to.be.an('array').that.is.empty
  })
})

describe('Build cart payloads', () => {
  it('should return a promotion item payload', () => {
    const payload = buildCartItemData('testcode', null, 'promotion_item')

    expect(payload).to.include({
      type: 'promotion_item',
      code: 'testcode'
    })
  })

  it('should return a cart item payload', () => {
    const payload = buildCartItemData('123', 4)

    expect(payload).to.include({
      type: 'cart_item',
      id: '123',
      quantity: 4
    })
  })
})

describe('Build query params', () => {
  it('should build filter query string from object', () => {
    const params = {
      filter: {
        eq: {
          status: 'live',
          slug: 'new-slug'
        },
        gt: {
          stock: 2
        }
      }
    }

    const queryString = buildURL('products', params)

    expect(queryString).to.equal(
      'products?filter=eq(status,live):eq(slug,new-slug):gt(stock,2)'
    )
  })

  it('should build relationship filter query string from object', () => {
    const params = {
      filter: {
        eq: {
          brand: {
            id: '123'
          }
        }
      }
    }

    const queryString = buildURL('products', params)

    expect(queryString).to.equal('products?filter=eq(brand.id,123)')
  })

  it('should build sort query string from object', () => {
    const params = {
      sort: 'created_at'
    }

    const queryString = buildURL('products', params)

    expect(queryString).to.equal('products?sort=created_at')
  })

  it('should build pagination query string from object', () => {
    const params = {
      offset: 100,
      limit: 20
    }

    const queryString = buildURL('products', params)

    expect(queryString).to.equal('products?page[limit]=20&page[offset]=100')
  })
})

describe('Unique cart identifier', () => {
  it('should create a string', () => {
    expect(createCartIdentifier()).to.be.a('string')
  })

  it('should create a unique string', () => {
    const firstId = createCartIdentifier()
    const secondId = createCartIdentifier()

    expect(firstId).not.equal(secondId)
  })

  it('should return a valid cart identifier', () => {
    expect(cartIdentifier()).to.be.a('string')
  })
})
