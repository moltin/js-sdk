import CRUDExtend from '../extends/crud'

class IntegrationsEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'integrations'
  }

  GetLogs(slug) {
    return this.request.send(`${this.endpoint}/${slug}/logs`, 'GET')
  }
}

export default IntegrationsEndpoint
