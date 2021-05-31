import CRUDExtend from '../extends/crud'
import NodesEndpoint from './nodes'
import NodeRelationships from './node-relationships'
import { buildURL } from '../utils/helpers'

class HierarchiesEndpoint extends CRUDExtend {
  constructor(endpoint) {
    const config = { ...endpoint } // Need to clone config so it is only updated in PCM
    config.version = 'pcm'
    super(config)
    this.Nodes = new NodesEndpoint(config)
    this.Relationships = new NodeRelationships(config)
    this.endpoint = 'hierarchies'
  }

  Children(id, token = null) {
    const { limit, offset } = this

    this.call = this.request.send(
      buildURL(`${this.endpoint}/${id}/children`, {
        limit,
        offset
      }),
      'GET',
      null,
      token
    )

    return this.call
  }
}

export default HierarchiesEndpoint
