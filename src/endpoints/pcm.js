import CRUDExtend from '../extends/crud'

class PCMEndpoint extends CRUDExtend {
  constructor(endpoint) {
    const config = { ...endpoint } // Need to clone config so it is only updated in PCM
    config.version = 'experimental'
    super(config)

    this.endpoint = 'products'
  }
}

export default PCMEndpoint
