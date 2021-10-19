import { dasherize } from 'inflected'
import RequestFactory from '../factories/request'
import { buildRelationshipData } from '../utils/helpers'

class PCMVariationsRelationshipsEndpoint {
  constructor(endpoint) {
    const config = { ...endpoint } // Need to clone config so it is only updated in PCM
    this.request = new RequestFactory(config)
    config.version = 'pcm'
    this.endpoint = 'relationships/variations'
  }

  All(productId) {
    return this.request.send(`products/${productId}/${this.endpoint}`, 'GET')
  }

  Create(productId, resources) {
    const body = buildRelationshipData(
      'product-variation',
      resources,
      dasherize
    )
    return this.request.send(
      `products/${productId}/${this.endpoint}`,
      'POST',
      body
    )
  }

  Delete(productId, resources) {
    const body = buildRelationshipData(
      'product-variation',
      resources,
      dasherize
    )
    return this.request.send(
      `products/${productId}/${this.endpoint}`,
      'DELETE',
      body
    )
  }

  Update(productId, resources) {
    const body = buildRelationshipData(
      'product-variation',
      resources,
      dasherize
    )
    return this.request.send(
      `products/${productId}/${this.endpoint}`,
      'PUT',
      body
    )
  }
}

export default PCMVariationsRelationshipsEndpoint
