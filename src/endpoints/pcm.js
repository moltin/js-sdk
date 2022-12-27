import CRUDExtend from '../extends/crud'
import PCMFileRelationshipEndpoint from './pcm-file-relationship'
import PCMVariationsRelationshipEndpoint from './pcm-variations-relationships'
import PCMTemplateRelationshipEndpoint from './pcm-template-relationship'
import PCMMainImageRelationshipEndpoint from './pcm-main-image-relationship'
import { buildURL } from '../utils/helpers'
import PCMJobs from './pcm-jobs'

class PCMEndpoint extends CRUDExtend {
  constructor(endpoint) {
    const config = { ...endpoint } // Need to clone config so it is only updated in PCM
    config.version = 'pcm'
    super(config)

    this.FileRelationships = new PCMFileRelationshipEndpoint(config)
    this.VariationsRelationships = new PCMVariationsRelationshipEndpoint(config)
    this.TemplateRelationships = new PCMTemplateRelationshipEndpoint(config)
    this.MainImageRelationships = new PCMMainImageRelationshipEndpoint(config)
    this.Jobs = new PCMJobs(config)

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

  GetProductNodes(productId) {
    const { limit, offset } = this
    return this.request.send(
      buildURL(`${this.endpoint}/${productId}/nodes`, {
        limit,
        offset
      }),
      'GET'
    )
  }

  ImportProducts(file) {
    return this.request.send(`${this.endpoint}/import`, 'POST', file)
  }
  
  AttachNodes(body) {
    return this.request.send(`${this.endpoint}/attach_nodes`, 'POST', body)
  }

  DetachNodes(body) {
    return this.request.send(`${this.endpoint}/detach_nodes`, 'POST', body)
  }

  ExportProducts(filter) {
    return this.request.send(
        buildURL(`${this.endpoint}/export`, {
          filter
        }),
        'POST'
    )
  }
}

export default PCMEndpoint
