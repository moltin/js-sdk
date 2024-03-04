import CRUDExtend from '../extends/crud'

class SubscriptionJobsEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'subscriptions/jobs'
  }

  Create(body) {
    return this.request.send(this.endpoint, 'POST', {
      ...body
    })
  }

}

export default SubscriptionJobsEndpoint
