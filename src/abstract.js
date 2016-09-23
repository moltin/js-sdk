class Abstract {
  constructor(m) {
    this.m = m;
  }

  Get(id, callback, error) {
    return this.m.Request(this.endpoint+'/'+id, 'GET', null, callback, error);
  }

  Find(terms, callback, error) {
    return this.m.Request(this.endpoint, 'GET', terms, callback, error);
  }

  List(terms) {
    return this.m.Request(this.endpoint, 'GET', terms);
  }

  Fields(callback, error) {
    let id = 0;
    let uri  = this.endpoint+'/'+ (id !== 0 ? id+'/fields' : 'fields');

    return this.m.Request(uri, 'GET', null, callback, error);
  }
}
