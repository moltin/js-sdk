import CRUDExtend from '../extends/crud'

class AccountsEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)
    this.endpoint = 'accounts'
  }

  Create(body) {
    return this.request.send(this.endpoint, 'POST', body.data)
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
}

export default AccountsEndpoint
