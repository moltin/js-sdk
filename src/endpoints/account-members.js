import CRUDExtend from '../extends/crud'
import { buildURL } from '../utils/helpers'
import BaseExtend from '../extends/base'

class AccountMembersEndpoint extends BaseExtend {
  constructor(endpoint) {
    super(endpoint)
    this.endpoint = 'account-members'
  }

  Get({ accountMemberId, token = null }) {
    return this.request.send(
      `${this.endpoint}/${accountMemberId}`,
      'GET',
      undefined,
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

export default AccountMembersEndpoint
