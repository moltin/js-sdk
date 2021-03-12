import CRUDExtend from '../extends/crud'
import { buildURL } from '../utils/helpers'

class AccountMembersEndpoint extends CRUDExtend {
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

  All() {
    const { limit, offset } = this

    this.call = this.request.send(
      buildURL(this.endpoint, {
        limit: { limit },
        offset: { offset }
      }),
      'GET',
      undefined
    )

    return this.call
  }
}

export default AccountMembersEndpoint
