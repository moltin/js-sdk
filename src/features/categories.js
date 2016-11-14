class Categories extends Abstract {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'categories';
  }

  Tree(error, callback) {
    return this.m.Request(`${this.endpoint}/tree`, 'GET', error, callback);
  }
}
