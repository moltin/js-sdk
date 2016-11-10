class Orders extends Abstract {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'orders';
  }

  Payment(id, data, callback, error) {
    return this.m.Request(`${this.endpoint}/${id}/payments`, 'POST', data, callback, error);
  }
}
