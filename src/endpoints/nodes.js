import { singularize } from 'inflected'
import RequestFactory from '../factories/request'
import { buildURL } from '../utils/helpers'

class NodesEndpoint {
  constructor(endpoint) {
    const config = { ...endpoint } // Need to clone config so it is only updated in PCM
    this.request = new RequestFactory(config)
    config.version = 'pcm'
    this.endpoint = 'nodes'
  }

  // TODO: API - currently not working! (can get from hierarchy relationships)
  All({ hierarchyId, token = null }) {
    return this.request.send(
      `hierarchies/${hierarchyId}/${this.endpoint}`,
      'GET',
      undefined,
      token
    )
  }

  Get({ hierarchyId, nodeId, token = null }) {
    return this.request.send(
      `hierarchies/${hierarchyId}/${this.endpoint}/${nodeId}`,
      'GET',
      undefined,
      token
    )
  }

  Create({ hierarchyId, body, token = null }) {
    return this.request.send(
      `hierarchies/${hierarchyId}/${this.endpoint}`,
      'POST',
      { ...body, type: singularize(this.endpoint) },
      token
    )
  }

  Delete({ hierarchyId, nodeId, token = null }) {
    return this.request.send(
      `hierarchies/${hierarchyId}/${this.endpoint}/${nodeId}`,
      'DELETE',
      undefined,
      token
    )
  }

  Update({ hierarchyId, nodeId, body, token = null }) {
    return this.request.send(
      `hierarchies/${hierarchyId}/${this.endpoint}/${nodeId}`,
      'PUT',
      { ...body, type: singularize(this.endpoint) },
      token
    )
  }

  GetNodeChildren({ hierarchyId, nodeId, token = null }) {
    const { limit, offset } = this
    return this.request.send(
      buildURL(
        `hierarchies/${hierarchyId}/${this.endpoint}/${nodeId}/children`,
        {
          limit,
          offset
        }
      ),
      'GET',
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

export default NodesEndpoint
