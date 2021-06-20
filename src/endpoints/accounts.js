import CRUDExtend from '../extends/crud'
import { buildURL } from '../utils/helpers'

class AccountsEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)
    this.endpoint = 'accounts'
  }

  Create(body) {
    return this.request.send(this.endpoint, 'POST', { data: body })
  }

  Get({ accountId, token = null }) {
    return this.request.send(
      `${this.endpoint}/${accountId}`,
      'GET',
      undefined,
      token
    )
  }

  Update(accountId, body, token = null) {
    return this.request.send(
      `${this.endpoint}/${accountId}`,
      'PUT',
      body.data,
      token
    )
  }

  All(token = null, headers = {}) {
    const { limit, offset } = this

    this.call = this.request.send(
      buildURL(this.endpoint, {
        limit,
        offset
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
