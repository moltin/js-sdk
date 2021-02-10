import { singularize } from 'inflected'
import CRUDExtend from '../extends/crud'

class Nodes {
  constructor(endpoint) {
    this.config = { ...endpoint } // Need to clone config so it is only updated in PCM
    config.version = 'experimental'
  }

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
}
class CatalogEndpoint extends CRUDExtend {
  constructor(endpoint) {
    const config = { ...endpoint } // Need to clone config so it is only updated in PCM
    config.version = 'experimental'
    super(config)
    this.Nodes = new Nodes(endpoint)
    this.endpoint = 'catalogs'
  }
}

export default CatalogEndpoint
