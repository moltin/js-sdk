import RequestFactory from '../factories/request'
import { buildRelationshipData } from '../utils/helpers'

class PCMTemplateRelationshipEndpoint {
  constructor(endpoint) {
    const config = { ...endpoint } // Need to clone config so it is only updated in PCM
    this.request = new RequestFactory(config)
    config.version = 'pcm'
    this.endpoint = 'relationships/templates'
  }

  All(productId) {
    return this.request.send(`products/${productId}/${this.endpoint}`, 'GET')
  }

  Create(productId, resources) {
    const body = buildRelationshipData('template', resources)
    return this.request.send(
      `products/${productId}/${this.endpoint}`,
      'POST',
      body
    )
  }

  Delete(productId, resources) {
    const body = buildRelationshipData('template', resources)
    return this.request.send(
      `products/${productId}/${this.endpoint}`,
      'DELETE',
      body
    )
  }
}

export default PCMTemplateRelationshipEndpoint
