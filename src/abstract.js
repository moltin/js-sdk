class Abstract {
  constructor(m) {
    this.m = m;
  }

  Get(id, callback, error) {
    if (this.endpoint === 'carts') {
      return this.m.Request(`${this.endpoint}/${this.cartId}`, 'GET', callback, error);
    }

    return this.m.Request(`${this.endpoint}/${id}`, 'GET', callback, error);
  }

  Find(terms, callback, error) {
    return this.m.Request(this.endpoint, 'GET', terms, callback, error);
  }

  List(params) {
    if (params) {
      const includes = params.toString();

      return this.m.Request(`${this.endpoint}?include=${includes}`, 'GET');
    }

    return this.m.Request(this.endpoint, 'GET');
  }

  Fields(callback, error) {
    let id = 0;
    let uri  = this.endpoint+'/'+ (id !== 0 ? id+'/fields' : 'fields');

    return this.m.Request(uri, 'GET', null, callback, error);
  }
}
