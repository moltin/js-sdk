import CRUDExtend from '../extends/crud'
import { buildRelationshipData, formatUrlResource } from '../utils/helpers'

class ProductsEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'products'
  }

  CreateRelationships(id, type, resources) {
    const body = buildRelationshipData(type, resources)
    const parsedType = formatUrlResource(type)

    return this.request.send(
      `${this.endpoint}/${id}/relationships/${parsedType}`,
      'POST',
      type === 'main-image' ? body[0] : body
    )
  }

  DeleteRelationships(id, type, resources) {
    const body = buildRelationshipData(type, resources)
    const parsedType = formatUrlResource(type)

    return this.request.send(
      `${this.endpoint}/${id}/relationships/${parsedType}`,
      'DELETE',
      type === 'main-image' ? body[0] : body
    )
  }

  UpdateRelationships(id, type, resources = null) {
    const body = buildRelationshipData(type, resources)
    const parsedType = formatUrlResource(type)

    return this.request.send(
      `${this.endpoint}/${id}/relationships/${parsedType}`,
      'PUT',
      type === 'main-image' ? body[0] : body
    )
  }

  BuildChildProducts(id) {
    return this.request.send(`${this.endpoint}/${id}/build`, 'POST')
  }
}

export default ProductsEndpoint
