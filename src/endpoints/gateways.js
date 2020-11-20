import BaseExtend from '../extends/base'

class GatewaysEndpoint extends BaseExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'gateways'
  }

  Update(slug, body) {
    return this.request.send(`${this.endpoint}/${slug}`, 'PUT', body)
  }

  Enabled(slug, enabled) {
    return this.request.send(`${this.endpoint}/${slug}`, 'PUT', {
      type: 'gateway',
      enabled
    })
  }

  GetSlugAttributes(slug, token = null) {
    return this.request.send(
      `${this.endpoint}/${slug}/attributes`,
      'GET',
      undefined,
      token
    )
  }
}

export default GatewaysEndpoint
