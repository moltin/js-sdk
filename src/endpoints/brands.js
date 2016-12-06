import CatalogueExtend from '../extends/catalogue';

class BrandsEndpoint extends CatalogueExtend {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'brands';
  }
}

export default BrandsEndpoint;
