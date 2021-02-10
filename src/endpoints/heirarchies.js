import CRUDExtend from '../extends/crud'
import NodesEndpoint from './nodes'

class HierarchiesEndpoint extends CRUDExtend {
  constructor(endpoint) {
    const config = { ...endpoint } // Need to clone config so it is only updated in PCM
    config.version = 'experimental'
    super(config)
    this.Nodes = new NodesEndpoint(config)
    this.endpoint = 'hierarchies'
  }
}

export default HierarchiesEndpoint
