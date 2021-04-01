import BaseExtend from '../extends/base'
import { buildURL } from '../utils/helpers'

class AccountMembershipsEndpoint extends BaseExtend {
  Create(accountId, body, token = null) {
    return this.request.send(
      `accounts/${accountId}/account-memberships`,
      'POST',
      body.data,
      token
    )
  }

  All(accountId, token = null) {
    const { includes, sort, limit, offset, filter } = this

    this.call = this.request.send(
      buildURL(`accounts/${accountId}/account-memberships`, {
        includes,
        sort,
        limit,
        offset,
        filter
      }),
      'GET',
      undefined,
      token,
      this
    )

    return this.call
  }

  Get(accountId, accountMembershipId, token = null) {
    return this.request.send(
      `accounts/${accountId}/account-memberships/${accountMembershipId}`,
      'GET',
      undefined,
      token
    )
  }

  Delete(accountId, accountMembershipId, token = null) {
    return this.request.send(
      `accounts/${accountId}/account-memberships/${accountMembershipId}`,
      'DELETE',
      undefined,
      token
    )
  }
}

export default AccountMembershipsEndpoint
