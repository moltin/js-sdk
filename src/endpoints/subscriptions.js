import CRUDExtend from '../extends/crud'

class SubscriptionsEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'subscriptions/subscriptions'
  }

  Create(body) {
    return this.request.send(this.endpoint, 'POST', {
      ...body
    })
  }

  GetInvoices(id) {
    return this.request.send(`${this.endpoint}/${id}/invoices`, 'GET')
  }

}

export default SubscriptionsEndpoint
