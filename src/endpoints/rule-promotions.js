import CRUDExtend from '../extends/crud'

class RulePromotionsEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'rule-promotions'
  }

  Create(body) {
    return this.request.send(this.endpoint, 'POST', {
      ...body,
      type: 'rule_promotion'
    })
  }

  Update(id, body, token = null) {
    return this.request.send(
      `${this.endpoint}/${id}`,
      'PUT',
      {
        ...body,
        type: 'rule_promotion'
      },
      token
    )
  }
}
export default RulePromotionsEndpoint
