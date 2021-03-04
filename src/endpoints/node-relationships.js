import { singularize } from 'inflected'
import RequestFactory from '../factories/request'

class NodeRelationshipsEndpoint {
  constructor(endpoint) {
    const config = { ...endpoint } // Need to clone config so it is only updated in PCM
    this.request = new RequestFactory(config)
    config.version = 'experimental'
    this.endpoint = 'relationships/products'
  }

  Create({ hierarchyId, nodeId, body, token = null }) {
    return this.request.send(
      `hierarchies/${hierarchyId}/nodes/${nodeId}/${this.endpoint}`,
      'POST',
      body,
      token
    )
  }

  Delete({ hierarchyId, nodeId, body, token = null }) {
    return this.request.send(
      `hierarchies/${hierarchyId}/nodes/${nodeId}/${this.endpoint}`,
      'DELETE',
      body,
      token
    )
  }

  Update({ hierarchyId, nodeId, body, token = null }) {
    return this.request.send(
      `hierarchies/${hierarchyId}/nodes/${nodeId}/relationships/parent`,
      'PUT',
      { ...body, type: singularize(this.endpoint) },
      token
    )
  }
}

export default NodeRelationshipsEndpoint
