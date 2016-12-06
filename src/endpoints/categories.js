import Catalogue from '../extends/catalogue';

class CategoriesEndpoint extends Catalogue {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'categories';
  }

  Tree() {
    return this.request.send(`${this.endpoint}/tree`, 'GET');
  }
}

export default CategoriesEndpoint;
