import { buildURL } from '../utils/helpers'
import RequestFactory from '../factories/request'

class CatalogQuery {
  Filter(filter) {
    this.filter = filter

    return this
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

class CatalogProductsQuery extends CatalogQuery {
  With(includes) {
    if (includes) this.includes = includes.toString().toLowerCase()

    return this
  }
}

class Nodes extends CatalogQuery {
  constructor(endpoint) {
    super()
    this.config = { ...endpoint } // Need to clone config so it is only updated in PCM
    this.request = new RequestFactory(this.config)
    this.config.version = ''
    this.endpoint = 'nodes'
  }

  All(options) {
    const { token = null } = options || { token: null }
    const { limit, offset, filter } = this
    return this.request.send(
      buildURL(`catalog/${this.endpoint}`, {
        limit,
        offset,
        filter
      }),
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
    const { limit, offset, filter } = this
    return this.request.send(
      buildURL(`catalog/${this.endpoint}/${nodeId}/relationships/children`, {
        limit,
        offset,
        filter
      }),
      'GET',
      undefined,
      token
    )
  }

  GetNodeProducts({ nodeId, token = null }) {
    const { limit, offset, filter } = this
    return this.request.send(
      buildURL(`catalog/${this.endpoint}/${nodeId}/relationships/products`, {
        limit,
        offset,
        filter
      }),
      'GET',
      undefined,
      token
    )
  }
}

class Hierarchies extends CatalogQuery {
  constructor(endpoint) {
    super()
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

class Products extends CatalogProductsQuery {
  constructor(endpoint) {
    super()
    this.config = { ...endpoint } // Need to clone config so it is only updated in PCM
    this.request = new RequestFactory(this.config)
    this.config.version = ''
    this.endpoint = 'products'
  }

  All(options) {
    const { limit, offset, filter, includes } = this
    const { token = null } = options || { token: null }
    return this.request.send(
      buildURL(`catalog/${this.endpoint}`, {
        limit,
        offset,
        filter,
        includes
      }),
      'GET',
      undefined,
      token
    )
  }

  Get({ productId, token = null }) {
    const { includes } = this
    return this.request.send(
      buildURL(`catalog/${this.endpoint}/${productId}`, {
        includes
      }),
      'GET',
      undefined,
      token
    )
  }

  GetProductsByNode({ nodeId, token = null }) {
    const { limit, offset, filter, includes } = this
    return this.request.send(
      buildURL(`catalog/nodes/${nodeId}/relationships/${this.endpoint}`, {
        limit,
        offset,
        filter,
        includes
      }),
      'GET',
      undefined,
      token
    )
  }

  GetProductsByHierarchy({ hierarchyId, token = null }) {
    const { limit, offset, filter, includes } = this
    return this.request.send(
      buildURL(`catalog/hierarchies/${hierarchyId}/${this.endpoint}`, {
        limit,
        offset,
        filter,
        includes
      }),
      'GET',
      undefined,
      token
    )
  }
}

class CatalogEndpoint extends CatalogQuery {
  constructor(endpoint) {
    super()
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
