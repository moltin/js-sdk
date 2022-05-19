import RequestFactory from '../factories/request'
import { buildURL } from '../utils/helpers'

class PriceBookPriceModifiersEndpoint {
  constructor(endpoint) {
    const config = { ...endpoint }
    this.request = new RequestFactory(config)
    config.version = 'pcm'
    this.endpoint = 'modifiers'
  }

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

  Limit(value) {
    this.limit = value
    return this
  }

  Offset(value) {
    this.offset = value
    return this
  }

  Get({ pricebookId, priceModifierId, token = null }) {
    return this.request.send(
      `pricebooks/${pricebookId}/${this.endpoint}/${priceModifierId}`,
      'GET',
      undefined,
      token
    )
  }

  Create({ pricebookId, body, token = null }) {
    return this.request.send(
      `pricebooks/${pricebookId}/${this.endpoint}`,
      'POST',
      { ...body, type: 'price-modifier' },
      token
    )
  }

  Update({ pricebookId, priceModifierId, body, token = null }) {
    return this.request.send(
      `pricebooks/${pricebookId}/${this.endpoint}/${priceModifierId}`,
      'PUT',
      { ...body, type: 'price-modifier' },
      token
    )
  }

  Delete({ pricebookId, priceModifierId, token = null }) {
    return this.request.send(
      `pricebooks/${pricebookId}/${this.endpoint}/${priceModifierId}`,
      'DELETE',
      undefined,
      token
    )
  }
}

export default PriceBookPriceModifiersEndpoint
