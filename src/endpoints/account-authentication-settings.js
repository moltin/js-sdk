import CRUDExtend from '../extends/crud'

class AccountAuthenticationSettingsEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)
    this.endpoint = 'settings/account-authentication'
  }

  Get() {
    return this.request.send(`${this.endpoint}`, 'GET', undefined)
  }
}

export default AccountAuthenticationSettingsEndpoint
