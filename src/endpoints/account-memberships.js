import CRUDExtend from '../extends/crud'

class AccountMembershipsEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)
  }

  Create(accountId, body, token = null) {
    return this.request.send(
      `accounts/${accountId}/account-memberships`,
      'POST',
      body.data
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
