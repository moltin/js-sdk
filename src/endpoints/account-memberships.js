import BaseExtend from '../extends/base'
import { buildURL } from '../utils/helpers'

class AccountMembershipsEndpoint extends BaseExtend {
  Create(accountId, body, token = null) {
    return this.request.send(
      `accounts/${accountId}/account-memberships`,
      'POST',
      body,
      token,
      this
    )
  }

  All(accountId, token = null) {
    const { limit, offset, includes } = this

    this.call = this.request.send(
      buildURL(`accounts/${accountId}/account-memberships`, {
        limit,
        offset,
        includes
      }),
      'GET',
      undefined,
      token,
      this
    )

    return this.call
  }

  UnassignedAccountMembers(accountId, token = null) {
    const { limit, offset } = this

    this.call = this.request.send(
      buildURL(
        `accounts/${accountId}/account-memberships/unassigned-account-members`,
        {
          limit,
          offset
        }
      ),
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
