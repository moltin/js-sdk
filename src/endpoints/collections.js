import CatalogueExtend from '../extends/catalogue';

class CollectionsEndpoint extends CatalogueExtend {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'collections';
  }
}

export default CollectionsEndpoint;
