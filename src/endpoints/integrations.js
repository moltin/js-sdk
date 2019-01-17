import CRUDExtend from '../extends/crud'

class IntegrationsEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'integrations'
  }
}

export default IntegrationsEndpoint
