import CatalogueExtend from '../extends/catalogue';

import { parseRelationshipType } from '../utils/helpers';

class ProductsEndpoint extends CatalogueExtend {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'products';
  }

  AddRelationship(id, body) {
    const parsedType = parseRelationshipType(body.type);

    return this.request.send(`${this.endpoint}/${id}/relationships/${parsedType}`, 'POST', [body]);
  }

  DeleteRelationship(id, body) {
    const parsedType = parseRelationshipType(body.type);

    return this.request.send(`${this.endpoint}/${id}/relationships/${parsedType}`, 'DELETE', [body]);
  }
}

export default ProductsEndpoint;
