import Abstract from '../abstract';

class CategoriesEndpoint extends Abstract {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'categories';
  }

  Tree() {
    return this.request.send(`${this.endpoint}/tree`, 'GET');
  }
}

export default CategoriesEndpoint;
