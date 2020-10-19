import BaseExtend from '../extends/base'

class AccountsEndpoint extends BaseExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'accounts'
    this.version = 'v1'
  }

  Stores() {
    return this.request.send(
      `${this.endpoint}/stores`,
      'GET',
      undefined,
      undefined,
      this
    )
  }

  Keys() {
    return this.request.send(
      `${this.endpoint}/keys`,
      'GET',
      undefined,
      undefined,
      this
    )
  }
}

export default AccountsEndpoint
