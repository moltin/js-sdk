import { expect } from 'chai';
import {
  buildRelationshipData,
  buildCartItemData,
  buildURL,
} from '../../src/utils/helpers';

describe('Build relationship payloads', () => {
  it('should return an array of relationship key value pairings', () => {
    const relationships = buildRelationshipData('category', ['123', '456']);

    expect(relationships).to.deep.include.members([
      { type: 'category', id: '123' },
      { type: 'category', id: '456' },
    ]);
  });

  it('should return an empty array', () => {
    const relationships = buildRelationshipData('category', null);

    expect(relationships).to.be.an('array').that.is.empty;
  });
});

describe('Build cart payloads', () => {
  it('should return a promotion item payload', () => {
    const payload = buildCartItemData('testcode', null, 'promotion_item');

    expect(payload).to.include({
      type: 'promotion_item',
      code: 'testcode',
    });
  });

  it('should return a cart item payload', () => {
    const payload = buildCartItemData('123', 4);

    expect(payload).to.include({
      type: 'cart_item',
      id: '123',
      quantity: 4,
    });
  });
});

describe('Build query params', () => {
  it('should build filter query string from object', () => {
    const params = {
      filter: {
        eq: {
          status: 'live',
          slug: 'new-slug',
        },
        gt: {
          stock: 2,
        },
      },
    };

    const queryString = buildURL('products', params);

    expect(queryString).to.equal('products?filter=eq(status,live):eq(slug,new-slug):gt(stock,2)');
  });
});
