import CatalogueExtend from '../extends/catalogue';

class FieldsEndpoint extends CatalogueExtend {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'fields';
  }
}

export default FieldsEndpoint;
