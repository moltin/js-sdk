import CRUDExtend from '../extends/crud'
import PCMFileRelationshipEndpoint from './pcm-file-relationship'
import PCMVariationsRelationshipEndpoint from './pcm-variations-relationships'
import PCMTemplateRelationshipEndpoint from './pcm-template-relationship'
import PCMMainImageRelationshipEndpoint from './pcm-main-image-relationship'
import { buildURL } from '../utils/helpers'

class PCMEndpoint extends CRUDExtend {
  constructor(endpoint) {
    const config = { ...endpoint } // Need to clone config so it is only updated in PCM
    config.version = 'pcm'
    super(config)

    this.FileRelationships = new PCMFileRelationshipEndpoint(config)
    this.VariationsRelationships = new PCMVariationsRelationshipEndpoint(config)
    this.TemplateRelationships = new PCMTemplateRelationshipEndpoint(config)
    this.MainImageRelationships = new PCMMainImageRelationshipEndpoint(config)

    this.endpoint = 'products'
  }

  BuildChildProducts(productId) {
    return this.request.send(`${this.endpoint}/${productId}/build`, 'POST')
  }

  GetChildProducts(productId) {
    const { includes, sort, limit, offset, filter } = this
    return this.request.send(
      buildURL(`${this.endpoint}/${productId}/children`, {
        includes,
        sort,
        limit,
        offset,
        filter
      }),
      'GET'
    )
  }
}

export default PCMEndpoint
