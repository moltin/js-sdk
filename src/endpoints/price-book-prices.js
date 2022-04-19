import RequestFactory from '../factories/request'
import { buildURL } from '../utils/helpers'

class PriceBookPricesEndpoint {
  constructor(endpoint) {
    const config = { ...endpoint } // Need to clone config so it is only updated in PCM
    this.request = new RequestFactory(config)
    config.version = 'pcm'
    this.endpoint = 'prices'
  }

  // TODO: API - currently not working! (can get from pricebook relationships)
  All({ pricebookId, token = null }) {
    const { limit, offset, filter } = this

    return this.request.send(
      buildURL(`pricebooks/${pricebookId}/${this.endpoint}`, {
        limit,
        offset,
        filter
      }),
      'GET',
      undefined,
      token,
      this
    )
  }

  Filter(filter) {
    this.filter = filter
    return this
  }

  Limit(value) {
    this.limit = value
    return this
  }

  Offset(value) {
    this.offset = value
    return this
  }

  Get({ pricebookId, priceId, token = null }) {
    return this.request.send(
      `pricebooks/${pricebookId}/${this.endpoint}/${priceId}`,
      'GET',
      undefined,
      token
    )
  }

  Create({ pricebookId, body, token = null }) {
    return this.request.send(
      `pricebooks/${pricebookId}/${this.endpoint}`,
      'POST',
      { ...body, type: 'product-price' },
      token
    )
  }

  Delete({ pricebookId, priceId, token = null }) {
    return this.request.send(
      `pricebooks/${pricebookId}/${this.endpoint}/${priceId}`,
      'DELETE',
      undefined,
      token
    )
  }

  Update({ pricebookId, priceId, body, token = null }) {
    return this.request.send(
      `pricebooks/${pricebookId}/${this.endpoint}/${priceId}`,
      'PUT',
      { ...body, type: 'product-price' },
      token
    )
  }
}

export default PriceBookPricesEndpoint
