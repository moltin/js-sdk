class Categories extends Abstract {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'categories';
  }

  Tree(error, callback) {
    return this.m.Request(`${this.endpoint}/tree`, 'GET', error, callback);
  }

  Detail(id, params, error, callback) {
    const options = params.toString();

    return this.m.Request(`${this.endpoint}/${id}?include=${options}`, 'GET', error, callback);
  }
}
