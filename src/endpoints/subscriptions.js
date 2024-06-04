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

  Update(id, body, token = null) {
    return this.request.send(
      `${this.endpoint}/${id}`,
      'PUT',
      body,
      token
    )
  }

  GetInvoices(id) {
    return this.request.send(`${this.endpoint}/${id}/invoices`, 'GET')
  }

  GetAttachedProducts(id) {
    return this.request.send(`${this.endpoint}/${id}/products`, 'GET')
  }

  GetAttachedPlans(id) {
    return this.request.send(`${this.endpoint}/${id}/plans`, 'GET')
  }

  CreateState(id, action) {
    return this.request.send(`${this.endpoint}/${id}/states`, 'POST', {
      type: 'subscription_state',
      attributes: {
        action
      }
    })
  }
}

export default SubscriptionsEndpoint
