import { singularize } from 'inflected'
import CRUDExtend from '../extends/crud'

class Nodes {
  constructor(endpoint) {
    this.config = { ...endpoint } // Need to clone config so it is only updated in PCM
    this.config.version = 'experimental'
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

  GetChildren({ nodeId, token = null }) {
    return this.request.send(
      `catalogs/${this.endpoint}/${nodeId}/relationships/children`,
      'GET',
      undefined,
      token
    )
  }

  GetCatalogChildren({ catalogId, releaseId, nodeId, token = null }) {
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

  GetCatalogNode({ catalogId, releaseId, nodeId, token = null }) {
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
    this.config.version = 'experimental'
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

  GetNodeProducts({ nodeId, token = null }) {
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
    this.config.version = 'experimental'
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

  Create({ catalogId, body, token = null }) {
    return this.request.send(
      `catalogs/${catalogId}/${this.endpoint}`,
      'POST',
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
    this.Products = new Products(endpoint)
    this.Releases = new Releases(endpoint)
    this.endpoint = 'catalogs'
  }
}

export default CatalogEndpoint
