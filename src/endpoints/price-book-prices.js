import { singularize } from 'inflected'
import RequestFactory from '../factories/request'

class PriceBookPricesEndpoint {
  constructor(endpoint) {
    const config = { ...endpoint } // Need to clone config so it is only updated in PCM
    this.request = new RequestFactory(config)
    config.version = 'experimental'
    this.endpoint = 'prices'
  }

  // TODO: API - currently not working! (can get from pricebook relationships)
  All({ pricebookId, token = null }) {
    return this.request.send(
      `pricebooks/${pricebookId}/${this.endpoint}`,
      'GET',
      undefined,
      token
    )
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
      { ...body },
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
      { ...body, type: singularize(this.endpoint) },
      token
    )
  }
}

export default PriceBookPricesEndpoint
