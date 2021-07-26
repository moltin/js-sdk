import CRUDExtend from '../extends/crud'
import { buildURL } from '../utils/helpers'

class AuthenticationRealmsEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)
    this.endpoint = 'authentication-realms'
  }

  All(token = null, headers = {}) {
    const { includes, sort, limit, offset, filter } = this

    this.call = this.request.send(
      buildURL(this.endpoint, {
        includes,
        sort,
        limit,
        offset,
        filter
      }),
      'GET',
      undefined,
      token,
      this,
      headers
    )

    return this.call
  }

  Create(body) {
    return this.request.send(this.endpoint, 'POST', body.data)
  }

  Get({ realmId, token = null }) {
    return this.request.send(
      `${this.endpoint}/${realmId}`,
      'GET',
      undefined,
      token
    )
  }
}

export default AuthenticationRealmsEndpoint
