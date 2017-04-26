import CatalogueExtend from '../extends/catalogue';

class CategoriesEndpoint extends CatalogueExtend {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'categories';
  }

  Tree() {
    return this.request.send(`${this.endpoint}/tree`, 'GET');
  }
}

export default CategoriesEndpoint;
