import CRUDExtend from '../extends/crud'

class CustomersEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'customers'
  }

  Token(email, password) {
    return this.request.send(`${this.endpoint}/tokens`, 'POST', {
      email,
      password,
      type: 'token'
    })
  }
}
export default CustomersEndpoint
