import { pluralize } from 'inflected';
import CatalogueExtend from '../extends/catalogue';
import { buildRelationshipData } from '../utils/helpers';

class ProductsEndpoint extends CatalogueExtend {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'products';
  }

  Filter(filter) {
    this.filter = filter;

    return this;
  }

  CreateRelationships(id, type, resources) {
    const body = buildRelationshipData(type, resources);

    return this.request.send(`${this.endpoint}/${id}/relationships/${pluralize(type)}`, 'POST', body);
  }

  DeleteRelationships(id, type, resources) {
    const body = buildRelationshipData(type, resources);

    return this.request.send(`${this.endpoint}/${id}/relationships/${pluralize(type)}`, 'DELETE', body);
  }

  UpdateRelationships(id, type, resources = null) {
    const body = buildRelationshipData(type, resources);

    return this.request.send(`${this.endpoint}/${id}/relationships/${pluralize(type)}`, 'PUT', body);
  }
}

export default ProductsEndpoint;
