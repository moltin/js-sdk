import { buildURL } from '../utils/helpers'
import RequestFactory from '../factories/request'

class Nodes {
  constructor(endpoint) {
    this.config = { ...endpoint } // Need to clone config so it is only updated in PCM
    this.request = new RequestFactory(this.config)
    this.config.version = ''
    this.endpoint = 'nodes'
  }

  All(options) {
    const { token = null } = options || { token: null }
    return this.request.send(
      `catalog/${this.endpoint}`,
      'GET',
      undefined,
      token
    )
  }

  Get({ nodeId, token = null }) {
    return this.request.send(
      `catalog/${this.endpoint}/${nodeId}`,
      'GET',
      undefined,
      token
    )
  }

  GetNodeChildren({ nodeId, token = null }) {
    return this.request.send(
      `catalog/${this.endpoint}/${nodeId}/relationships/children`,
      'GET',
      undefined,
      token
    )
  }
}

class Hierarchies {
  constructor(endpoint) {
    this.config = { ...endpoint } // Need to clone config so it is only updated in PCM
    this.request = new RequestFactory(this.config)
    this.config.version = ''
    this.endpoint = 'hierarchies'
  }

  All(options) {
    const { token = null } = options || { token: null }
    return this.request.send(
      `catalog/${this.endpoint}`,
      'GET',
      undefined,
      token
    )
  }

  Get({ hierarchyId, token = null }) {
    return this.request.send(
      `catalog/${this.endpoint}/${hierarchyId}`,
      'GET',
      undefined,
      token
    )
  }

  GetHierarchyChildren({ hierarchyId, token = null }) {
    return this.request.send(
      `catalog/${this.endpoint}/${hierarchyId}/children`,
      'GET',
      undefined,
      token
    )
  }

  GetHierarchyNodes() {
    const { token = null } = options || { token: null }
    return this.request.send(
      `catalog/${this.endpoint}/latest/nodes`,
      'GET',
      undefined,
      token
    )
  }
}

class Products {
  constructor(endpoint) {
    this.config = { ...endpoint } // Need to clone config so it is only updated in PCM
    this.request = new RequestFactory(this.config)
    this.config.version = ''
    this.endpoint = 'products'
  }

  All(options) {
    const { token = null } = options || { token: null }
    return this.request.send(
      `catalog/${this.endpoint}`,
      'GET',
      undefined,
      token
    )
  }

  Get({ productId, token = null }) {
    return this.request.send(
      `catalog/${this.endpoint}/${productId}`,
      'GET',
      undefined,
      token
    )
  }

  GetProductsByNode({ nodeId, token = null }) {
    return this.request.send(
      `catalog/nodes/${nodeId}/relationships/${this.endpoint}`,
      'GET',
      undefined,
      token
    )
  }

  GetProductsByHierarchy({ hierarchyId, token = null }) {
    return this.request.send(
      `catalog/hierarchies/${hierarchyId}/${this.endpoint}`,
      'GET',
      undefined,
      token
    )
  }
}

class CatalogEndpoint {
  constructor(endpoint) {
    const config = { ...endpoint } // Need to clone config so it is only updated in PCM
    config.version = 'pcm'
    this.Nodes = new Nodes(endpoint)
    this.Hierarchies = new Hierarchies(endpoint)
    this.Products = new Products(endpoint)
    this.endpoint = 'catalogs'

    this.request = new RequestFactory(config)
  }

  All(token = null) {
    const { includes, sort, limit, offset, filter } = this

    this.call = this.request.send(
      buildURL(this.endpoint, {
        includes,
        sort,
        limit,
        offset,
        filter
      }),
      'GET',
      undefined,
      token,
      this
    )

    return this.call
  }
}

export default CatalogEndpoint
