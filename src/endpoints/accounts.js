import CRUDExtend from '../extends/crud'
import { buildURL } from '../utils/helpers'

class AccountsEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)
    this.endpoint = 'accounts'
  }

  Create(body) {
    return this.request.send(this.endpoint, 'POST', body)
  }

  All(token = null, headers = {}) {
    const { limit, offset, filter } = this

    this.call = this.request.send(
      buildURL(this.endpoint, {
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
}

export default AccountsEndpoint
