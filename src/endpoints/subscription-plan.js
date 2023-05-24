import CRUDExtend from '../extends/crud'

class SubscriptionPlansEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'subscriptions/plans'
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
      {
        ...body
      },
      token
    )
  }

}

export default SubscriptionPlansEndpoint
