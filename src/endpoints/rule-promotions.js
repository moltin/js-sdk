import CRUDExtend from '../extends/crud'
import { buildURL } from '../utils/helpers'

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

  Codes(promotionId, token = null) {
    const { limit, offset, filter } = this
      return this.request.send(
        buildURL(`${this.endpoint}/${promotionId}/codes`, {
          limit,
          offset,
          filter
        }),
        'GET',
          undefined,
          token,
          this
    )
  }

  AddCodes(promotionId, codes) {
    return this.request.send(`${this.endpoint}/${promotionId}/codes`, 'POST', {
      type: 'promotion_codes',
      codes
    })
  }
  
  DeleteCode(promotionId, codeId) {
    return this.request.send(
      `${this.endpoint}/${promotionId}/codes/${codeId}`,
      'DELETE'
    )
  }


  DeleteCodes(promotionId, codes) {
    return this.request.send(
      `${this.endpoint}/${promotionId}/codes`,
      'DELETE',
      {
        type: 'promotion_codes',
        codes
      }
    )
  }
}
export default RulePromotionsEndpoint
