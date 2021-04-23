import CRUDExtend from '../extends/crud'
import RequestFactory from '../factories/request'

class RulesEndpoint extends CRUDExtend {
  constructor(endpoint) {
    const config = { ...endpoint } // Need to clone config so it is only updated in PCM
    super(config)
    config.version = 'pcm'
    this.request = new RequestFactory(this.config)
    this.endpoint = 'catalogs/rules'
  }

  All({ token = null }) {
    return this.request.send(`${this.endpoint}`, 'GET', undefined, token)
  }

  Get({ catalogRuleId, token = null }) {
    return this.request.send(
      `${this.endpoint}/${catalogRuleId}`,
      'GET',
      undefined,
      token
    )
  }
}

export default RulesEndpoint
