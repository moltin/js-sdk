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

  PromotionJobs(promotionId) {
    const { limit, offset, filter } = this
    return this.request.send(
      buildURL(`${this.endpoint}/${promotionId}/jobs`, {
        limit,
        offset,
        filter
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

  AddCodesJob(promotionId, body) {
    return this.request.send(`${this.endpoint}/${promotionId}/jobs`, 'POST', body)
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

  GetCodeExportFile(promotionId, jobId) {
    return this.request.send(`${this.endpoint}/${promotionId}/jobs/${jobId}/file`, 'Get')
  }
}

export default PromotionsEndpoint
