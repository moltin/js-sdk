import { buildURL } from '../utils/helpers'
import BaseExtend from '../extends/base'

class AccountMembersEndpoint extends BaseExtend {
  constructor(endpoint) {
    super(endpoint)
    this.endpoint = 'account-members'
  }

  Get(accountMemberId, token = null) {
    return this.request.send(
      `${this.endpoint}/${accountMemberId}`,
      'GET',
      undefined,
      token
    )
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

  UnassignedAccountMembers(accountId, token = null) {
    const { limit, offset, filter } = this

    this.call = this.request.send(
      buildURL(
        `accounts/${accountId}/account-memberships/unassigned-account-members`,
        {
          limit,
          offset,
          filter
        }
      ),
      'GET',
      undefined,
      token,
      this
    )

    return this.call
  }
}

export default AccountMembersEndpoint
