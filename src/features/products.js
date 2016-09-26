class Products extends Abstract {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'products';
  }

  Search(terms, callback, error) {
    return this.m.Request(this.endpoint+'/search', 'GET', terms, callback, error);
  }

  Modifiers(id, callback, error) {
    return this.m.Request(this.endpoint+'/'+id+'/modifiers', 'GET', null, callback, error);
  }

  Variations(id, callback, error) {
    return this.m.Request(this.endpoint+'/'+id+'/variations', 'GET', null, callback, error);
  }
}
