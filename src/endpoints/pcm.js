import CRUDExtend from '../extends/crud'
import PCMFileRelationshipEndpoint from './pcm-file-relationship'
import Pcmtemplaterealationshipendpoint from './pcm-template-relationship'

class PCMEndpoint extends CRUDExtend {
  constructor(endpoint) {
    const config = { ...endpoint } // Need to clone config so it is only updated in PCM
    config.version = 'pcm'
    super(config)

    this.FileRelationships = new PCMFileRelationshipEndpoint(config)
    this.TemplateRelationships = new Pcmtemplaterealationshipendpoint(config)

    this.endpoint = 'products'
  }
}

export default PCMEndpoint
