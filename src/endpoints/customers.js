import BaseExtend from '../extends/base';

class CustomersEndpoint extends BaseExtend {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'customers';
  }

  Create(body) {
    return this.request.send(`${this.endpoint}`, 'POST', body);
  }

  Delete(id) {
    return this.request.send(`${this.endpoint}/${id}`, 'DELETE');
  }

  Update(id, body) {
    return this.request.send(`${this.endpoint}/${id}`, 'PUT', body);
  }
}
export default CustomersEndpoint;
