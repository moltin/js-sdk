import { singularize } from 'inflected'
import RequestFactory from '../factories/request'
import { buildURL } from '../utils/helpers'

class NodeRelationshipsEndpoint {
  constructor(endpoint) {
    const config = { ...endpoint } // Need to clone config so it is only updated in PCM
    this.request = new RequestFactory(config)
    config.version = 'pcm'
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

  Products({ hierarchyId, nodeId, token = null }) {
    const { limit, offset } = this
    return this.request.send(
      buildURL(`hierarchies/${hierarchyId}/nodes/${nodeId}/products`, {
        limit,
        offset
      }),
      'GET',
      null,
      token
    )
  }

  ChangeParent({ hierarchyId, nodeId, body, token = null }) {
    return this.request.send(
      `hierarchies/${hierarchyId}/nodes/${nodeId}/relationships/parent`,
      'PUT',
      body,
      token
    )
  }

  DeleteParent({ hierarchyId, nodeId, token = null }) {
    return this.request.send(
      `hierarchies/${hierarchyId}/nodes/${nodeId}/relationships/parent`,
      'DELETE',
      undefined,
      token
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
}

export default NodeRelationshipsEndpoint
