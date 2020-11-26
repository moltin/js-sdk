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

  Store(id) {
    return this.request.send(
      `${this.endpoint}/stores/${id}`,
      'GET',
      undefined,
      undefined,
      this
    )
  }

  SwitchStore(storeId) {
    return this.request.send(
      `account/stores/switch/${storeId}`,
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

  DeleteUserFromStore(storeId, userId) {
    return this.request.send(
      `${this.endpoint}/stores/${storeId}/users/${userId}`,
      'DELETE',
      undefined,
      undefined,
      this
    )
  }

  // Admin user endpoints

  Me() {
    return this.All()
  }

  UpdateMe(userData) {
    return this.request.send(
      `${this.endpoint}/users`,
      'PUT',
      userData,
      undefined,
      this
    )
  }
}

export default AccountsEndpoint
