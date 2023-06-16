import CRUDExtend from '../extends/crud'

class SubscriptionOfferingsEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'subscriptions/offerings'
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

export default SubscriptionOfferingsEndpoint
