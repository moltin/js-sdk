import CRUDExtend from '../extends/crud'
import { buildURL } from '../utils/helpers'

class PromotionsEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'promotions'
  }

  Attributes() {
    return this.request.send(`${this.endpoint}/attributes`, 'GET')
  }

  Codes(promotionId) {
    const { limit, offset } = this

    return this.request.send(
      buildURL(`${this.endpoint}/${promotionId}/codes`, {
        limit,
        offset
      }),
      'GET'
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

  History(promotionId) {
    const { limit, offset } = this

    return this.request.send(
      buildURL(`${this.endpoint}/${promotionId}/history`, {
        limit,
        offset
      }),
      'GET'
    )
  }
}

export default PromotionsEndpoint
