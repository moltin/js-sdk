import CRUDExtend from '../extends/crud'

class RulePromotionsEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'rule-promotions'
  }

}

export default RulePromotionsEndpoint
