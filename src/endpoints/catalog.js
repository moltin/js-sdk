import { buildURL } from '../utils/helpers'
import RequestFactory from '../factories/request'

class ShopperCatalogQuery {
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

class ShopperCatalogProductsQuery extends ShopperCatalogQuery {
  With(includes) {
    if (includes) this.includes = includes.toString().toLowerCase()

    return this
  }
}

class Nodes extends ShopperCatalogQuery {
  constructor(endpoint) {
    super()
    this.config = { ...endpoint } // Need to clone config so it is only updated in PCM
    this.request = new RequestFactory(this.config)
    this.config.version = ''
    this.endpoint = 'nodes'
  }

  All({ token = null, additionalHeaders = null } = {}) {
    const { limit, offset, filter } = this

    return this.request.send(
      buildURL(`catalog/${this.endpoint}`, {
        limit,
        offset,
        filter
      }),
      'GET',
      undefined,
      token,
      undefined,
      false,
      undefined,
      additionalHeaders
    )
  }

  Get({ nodeId, token = null, additionalHeaders = null }) {
    return this.request.send(
      `catalog/${this.endpoint}/${nodeId}`,
      'GET',
      undefined,
      token,
      undefined,
      false,
      undefined,
      additionalHeaders
    )
  }

  GetNodeChildren({ nodeId, token = null, additionalHeaders = null }) {
    const { limit, offset, filter } = this

    return this.request.send(
      buildURL(`catalog/${this.endpoint}/${nodeId}/relationships/children`, {
        limit,
        offset,
        filter
      }),
      'GET',
      undefined,
      token,
      undefined,
      false,
      undefined,
      additionalHeaders
    )
  }

  GetNodeProducts({ nodeId, token = null, additionalHeaders = null }) {
    const { limit, offset, filter } = this

    return this.request.send(
      buildURL(`catalog/${this.endpoint}/${nodeId}/relationships/products`, {
        limit,
        offset,
        filter
      }),
      'GET',
      undefined,
      token,
      undefined,
      false,
      undefined,
      additionalHeaders
    )
  }
}

class Hierarchies extends ShopperCatalogQuery {
  constructor(endpoint) {
    super()
    this.config = { ...endpoint } // Need to clone config so it is only updated in PCM
    this.request = new RequestFactory(this.config)
    this.config.version = ''
    this.endpoint = 'hierarchies'
  }

  All({ token = null, additionalHeaders = null } = {}) {
    return this.request.send(
      `catalog/${this.endpoint}`,
      'GET',
      undefined,
      token,
      undefined,
      false,
      undefined,
      additionalHeaders
    )
  }

  Get({ hierarchyId, token = null, additionalHeaders = null }) {
    return this.request.send(
      `catalog/${this.endpoint}/${hierarchyId}`,
      'GET',
      undefined,
      token,
      undefined,
      false,
      additionalHeaders
    )
  }

  GetHierarchyChildren({
    hierarchyId,
    token = null,
    additionalHeaders = null
  }) {
    return this.request.send(
      `catalog/${this.endpoint}/${hierarchyId}/children`,
      'GET',
      undefined,
      token,
      undefined,
      false,
      undefined,
      additionalHeaders
    )
  }

  GetHierarchyNodes({
    hierarchyId,
    token = null,
    additionalHeaders = null
  } = {}) {
    return this.request.send(
      `catalog/${this.endpoint}/${hierarchyId}/nodes`,
      'GET',
      undefined,
      token,
      undefined,
      false,
      undefined,
      additionalHeaders
    )
  }
}

class Products extends ShopperCatalogProductsQuery {
  constructor(endpoint) {
    super()
    this.config = { ...endpoint } // Need to clone config so it is only updated in PCM
    this.request = new RequestFactory(this.config)
    this.config.version = ''
    this.endpoint = 'products'
  }

  All({ token = null, additionalHeaders = null } = {}) {
    const { limit, offset, filter, includes } = this

    return this.request.send(
      buildURL(`catalog/${this.endpoint}`, {
        limit,
        offset,
        filter,
        includes
      }),
      'GET',
      undefined,
      token,
      undefined,
      false,
      undefined,
      additionalHeaders
    )
  }

  Get({ productId, token = null, additionalHeaders = null }) {
    const { includes } = this

    return this.request.send(
      buildURL(`catalog/${this.endpoint}/${productId}`, {
        includes
      }),
      'GET',
      undefined,
      token,
      undefined,
      false,
      undefined,
      additionalHeaders
    )
  }

  GetProductsByNode({ nodeId, token = null, additionalHeaders = null }) {
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
      token,
      undefined,
      false,
      undefined,
      additionalHeaders
    )
  }

  GetProductsByHierarchy({
    hierarchyId,
    token = null,
    additionalHeaders = null
  }) {
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
      token,
      undefined,
      false,
      undefined,
      additionalHeaders
    )
  }

  GetProductChildren({
    productId,
    token = null,
    additionalHeaders = null
  }) {
    const { limit, offset, filter, includes } = this

    return this.request.send(
      buildURL(`catalog/${this.endpoint}/${productId}/relationships/children`, {
        limit,
        offset,
        filter,
        includes
      }),
      'GET',
      undefined,
      token,
      undefined,
      false,
      undefined,
      additionalHeaders
    )
  }
}

class ShopperCatalogEndpoint extends ShopperCatalogQuery {
  constructor(endpoint) {
    super()
    const config = { ...endpoint, version: undefined } // Need to clone config so it is only updated in PCM
    this.Nodes = new Nodes(endpoint)
    this.Hierarchies = new Hierarchies(endpoint)
    this.Products = new Products(endpoint)
    this.endpoint = 'catalog'
    this.request = new RequestFactory(config)
  }

  Get({ token = null, additionalHeaders = null } = {}) {
    this.call = this.request.send(
      `${this.endpoint}`,
      'GET',
      undefined,
      token,
      undefined,
      false,
      undefined,
      additionalHeaders
    )

    return this.call
  }
}

export default ShopperCatalogEndpoint
