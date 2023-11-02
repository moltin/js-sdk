import CRUDExtend from '../extends/crud'
import { buildURL } from '../utils/helpers'

class RulePromotionsEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'rule-promotions'
  }

}

export default RulePromotionsEndpoint
