import BaseExtend from '../extends/base'

class AccountMembershipsEndpoint extends BaseExtend {
  Create(accountId, body, token = null) {
    return this.request.send(
      `accounts/${accountId}/account-memberships`,
      'POST',
      body.data,
      token
    )
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
