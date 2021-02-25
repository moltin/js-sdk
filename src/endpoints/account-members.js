import CRUDExtend from '../extends/crud'

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
}

export default AccountMembersEndpoint
