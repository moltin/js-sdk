import RequestFactory from '../factories/request'

class AccountAuthenticationSettingsEndpoint {
  constructor(config) {
    this.request = new RequestFactory(config)
    this.endpoint = 'settings/account-authentication'
  }

  Get() {
    return this.request.send(`${this.endpoint}`, 'GET', undefined)
  }
}

export default AccountAuthenticationSettingsEndpoint
