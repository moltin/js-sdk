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

  RetrieveCatalogContextHeader(catalogContext) {
    return catalogContext
      ? {
          'EP-Context-Tag': catalogContext
        }
      : undefined
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

  All(options, catalogContext = undefined) {
    const { token = null } = options || { token: null }
    const { limit, offset, filter } = this
    const additionalHeaders = this.RetrieveCatalogContextHeader(catalogContext)

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

  Get({ nodeId, token = null }, catalogContext = undefined) {
    const additionalHeaders = this.RetrieveCatalogContextHeader(catalogContext)

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

  GetNodeChildren({ nodeId, token = null }, catalogContext = undefined) {
    const { limit, offset, filter } = this
    const additionalHeaders = this.RetrieveCatalogContextHeader(catalogContext)

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

  GetNodeProducts({ nodeId, token = null }, catalogContext = undefined) {
    const { limit, offset, filter } = this
    const additionalHeaders = this.RetrieveCatalogContextHeader(catalogContext)

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

class Hierarchies extends CatalogQuery {
  constructor(endpoint) {
    super()
    this.config = { ...endpoint } // Need to clone config so it is only updated in PCM
    this.request = new RequestFactory(this.config)
    this.config.version = ''
    this.endpoint = 'hierarchies'
  }

  All(options, catalogContext = undefined) {
    const { token = null } = options || { token: null }
    const additionalHeaders = this.RetrieveCatalogContextHeader(catalogContext)

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

  Get({ hierarchyId, token = null }, catalogContext = undefined) {
    const additionalHeaders = this.RetrieveCatalogContextHeader(catalogContext)

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

  GetHierarchyChildren(
    { hierarchyId, token = null },
    catalogContext = undefined
  ) {
    const additionalHeaders = this.RetrieveCatalogContextHeader(catalogContext)

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

  GetHierarchyNodes(catalogContext = undefined) {
    const { token = null } = options || { token: null }
    const additionalHeaders = this.RetrieveCatalogContextHeader(catalogContext)

    return this.request.send(
      `catalog/${this.endpoint}/latest/nodes`,
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

class Products extends CatalogProductsQuery {
  constructor(endpoint) {
    super()
    this.config = { ...endpoint } // Need to clone config so it is only updated in PCM
    this.request = new RequestFactory(this.config)
    this.config.version = ''
    this.endpoint = 'products'
  }

  All(options, catalogContext = undefined) {
    const { limit, offset, filter, includes } = this
    const { token = null } = options || { token: null }
    const additionalHeaders = this.RetrieveCatalogContextHeader(catalogContext)

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

  Get({ productId, token = null }, catalogContext = undefined) {
    const { includes } = this
    const additionalHeaders = this.RetrieveCatalogContextHeader(catalogContext)

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

  GetProductsByNode({ nodeId, token = null }, catalogContext = undefined) {
    const { limit, offset, filter, includes } = this
    const additionalHeaders = this.RetrieveCatalogContextHeader(catalogContext)

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

  GetProductsByHierarchy(
    { hierarchyId, token = null },
    catalogContext = undefined
  ) {
    const { limit, offset, filter, includes } = this
    const additionalHeaders = this.RetrieveCatalogContextHeader(catalogContext)

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
}

class Catalog {
  constructor(endpoint) {
    this.config = { ...endpoint }
    this.request = new RequestFactory(this.config)
    this.config.version = ''
    this.endpoint = 'catalog'
  }

  Get(token = null, catalogContext = undefined) {
    const additionalHeaders = this.RetrieveCatalogContextHeader(catalogContext)

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

class CatalogEndpoint extends CatalogQuery {
  constructor(endpoint) {
    super()
    const config = { ...endpoint } // Need to clone config so it is only updated in PCM
    config.version = 'pcm'
    this.Nodes = new Nodes(endpoint)
    this.Hierarchies = new Hierarchies(endpoint)
    this.Products = new Products(endpoint)
    this.Catalog = new Catalog(endpoint)
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
