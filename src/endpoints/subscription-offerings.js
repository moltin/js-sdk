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

  Build(body) {
    return this.request.send(`${this.endpoint}/build`, 'POST', {
      ...body
    })
  }

  AttachPlans(offeringId, body) {
    return this.request.send(`${this.endpoint}/${offeringId}/plans/attach`, 'POST', {
      ...body
    })
  }

  RemovePlan(offeringId, planId) {
    return this.request.send(`${this.endpoint}/${offeringId}/plans/${planId}`, 'DELETE')
  }

  GetAttachedProducts(id) {
    return this.request.send(`${this.endpoint}/${id}/products`, 'GET')
  }

  GetAttachedPlans(id) {
    return this.request.send(`${this.endpoint}/${id}/plans`, 'GET')
  }

  AttachProrationPolicy(offeringId, body) {
    return this.request.send(`${this.endpoint}/${offeringId}/relationships/proration-policies`, 'PUT', {
      data: body
    }, undefined, undefined, false)
  }

  ReplaceProducts(offeringId, productIds) {
    return this.request.send(`${this.endpoint}/${offeringId}/products/replace`, 'PUT', {
      products: productIds
    })
  }
}

export default SubscriptionOfferingsEndpoint
