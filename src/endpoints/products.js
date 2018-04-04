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
      body
    )
  }

  DeleteRelationships(id, type, resources) {
    const body = buildRelationshipData(type, resources)
    const parsedType = formatUrlResource(type)

    return this.request.send(
      `${this.endpoint}/${id}/relationships/${parsedType}`,
      'DELETE',
      body
    )
  }

  UpdateRelationships(id, type, resources = null) {
    const body = buildRelationshipData(type, resources)
    const parsedType = formatUrlResource(type)

    return this.request.send(
      `${this.endpoint}/${id}/relationships/${parsedType}`,
      'PUT',
      body
    )
  }
}

export default ProductsEndpoint
