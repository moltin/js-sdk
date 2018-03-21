import CatalogueExtend from '../extends/catalogue';

class CustomersEndpoint extends CatalogueExtend {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'customers';
  }

  Token(email, password) {
    return this.request.send(`${this.endpoint}/tokens`, 'POST', { email, password, type: 'token' });
  }
}
export default CustomersEndpoint;
