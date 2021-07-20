import CRUDExtend from '../extends/crud'
import RequestFactory from '../factories/request'

class Nodes {
  constructor(endpoint) {
    this.config = { ...endpoint } // Need to clone config so it is only updated in PCM
    this.request = new RequestFactory(this.config)
    this.config.version = 'pcm'
    this.endpoint = 'nodes'
  }

  All({ token = null }) {
    return this.request.send(
      `catalogs/${this.endpoint}`,
      'GET',
      undefined,
      token
    )
  }

  Get({ nodeId, token = null }) {
    return this.request.send(
      `catalogs/${this.endpoint}/${nodeId}`,
      'GET',
      undefined,
      token
    )
  }

  GetNodeChildren({ nodeId, token = null }) {
    return this.request.send(
      `catalogs/${this.endpoint}/${nodeId}/relationships/children`,
      'GET',
      undefined,
      token
    )
  }

  GetNodeChildrenFromCatalogReleases({
    catalogId,
    releaseId,
    nodeId,
    token = null
  }) {
    return this.request.send(
      `catalogs/${catalogId}/releases/${releaseId}/${
        this.endpoint
      }/${nodeId}/relationships/children`,
      'GET',
      undefined,
      token
    )
  }

  GetAllCatalogNodes({ catalogId, releaseId, token = null }) {
    return this.request.send(
      `catalogs/${catalogId}/releases/${releaseId}/${this.endpoint}`,
      'GET',
      undefined,
      token
    )
  }

  GetNodeInCatalogRelease({ catalogId, releaseId, nodeId, token = null }) {
    return this.request.send(
      `catalogs/${catalogId}/releases/${releaseId}/${this.endpoint}/${nodeId}`,
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
    this.config.version = 'pcm'
    this.endpoint = 'products'
  }

  All({ token = null }) {
    return this.request.send(
      `catalogs/${this.endpoint}`,
      'GET',
      undefined,
      token
    )
  }

  Get({ productId, token = null }) {
    return this.request.send(
      `catalogs/${this.endpoint}/${productId}`,
      'GET',
      undefined,
      token
    )
  }

  GetProduct({ catalogId, releaseId, productId, token = null }) {
    return this.request.send(
      `catalogs/${catalogId}/releases/${releaseId}/${
        this.endpoint
      }/${productId}`,
      'GET',
      undefined,
      token
    )
  }

  GetCatalogNodeProducts({ catalogId, releaseId, nodeId, token = null }) {
    return this.request.send(
      `catalogs/${catalogId}/releases/${releaseId}/nodes/${nodeId}/${
        this.endpoint
      }`,
      'GET',
      undefined,
      token
    )
  }

  GetProductsByNode({ nodeId, token = null }) {
    return this.request.send(
      `catalogs/nodes/${nodeId}/relationships/${this.endpoint}`,
      'GET',
      undefined,
      token
    )
  }

  GetCatalogProducts({ catalogId, releaseId, token = null }) {
    return this.request.send(
      `catalogs/${catalogId}/releases/${releaseId}/${this.endpoint}`,
      'GET',
      undefined,
      token
    )
  }
}

class Releases {
  constructor(endpoint) {
    this.config = { ...endpoint } // Need to clone config so it is only updated in PCM
    this.request = new RequestFactory(this.config)
    this.config.version = 'pcm'
    this.endpoint = 'releases'
  }

  All({ catalogId, token = null }) {
    return this.request.send(
      `catalogs/${this.endpoint}/${catalogId}`,
      'GET',
      undefined,
      token
    )
  }

  Get({ catalogId, releaseId, token = null }) {
    return this.request.send(
      `catalogs/${this.endpoint}/${catalogId}/${releaseId}`,
      'GET',
      undefined,
      token
    )
  }

  Create({ catalogId, token = null }) {
    return this.request.send(
      `catalogs/${catalogId}/${this.endpoint}`,
      'POST',
      token
    )
  }
}

class Rules {
  constructor(endpoint) {
    this.config = { ...endpoint } // Need to clone config so it is only updated in PCM
    this.request = new RequestFactory(this.config)
    this.config.version = 'pcm'
    this.endpoint = 'rules'
  }

  All(token = null) {
    return this.request.send(
      `catalogs/${this.endpoint}`,
      'GET',
      undefined,
      token
    )
  }

  Get(catalogRuleId, token = null) {
    return this.request.send(
      `catalogs/${this.endpoint}/${catalogRuleId}`,
      'GET',
      undefined,
      token
    )
  }

  Create(body, token = null) {
    return this.request.send(`catalogs/${this.endpoint}`, 'POST', body, token)
  }

  Update(catalogRuleId, body, token = null) {
    return this.request.send(
      `catalogs/${this.endpoint}/${catalogRuleId}`,
      `PUT`,
      body,
      token
    )
  }

  Delete(catalogRuleId, token = null) {
    return this.request.send(
      `catalogs/${this.endpoint}/${catalogRuleId}`,
      `DELETE`,
      token
    )
  }
}

class CatalogsEndpoint extends CRUDExtend {
  constructor(endpoint) {
    const config = { ...endpoint } // Need to clone config so it is only updated in PCM
    config.version = 'pcm'
    super(config)
    this.Nodes = new Nodes(endpoint)
    this.Products = new Products(endpoint)
    this.Releases = new Releases(endpoint)
    this.Rules = new Rules(endpoint)
    this.endpoint = 'catalogs'
  }
}

export default CatalogsEndpoint
