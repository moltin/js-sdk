import RequestFactory from '../factories/request'

class AccountAuthenticationSettingsEndpoint {
  constructor(config) {
    this.request = new RequestFactory(config)
    this.endpoint = 'settings/account-authentication'
  }

  Get() {
    return this.request.send(`${this.endpoint}`, 'GET', undefined)
  }

  Update(body) {
    return this.request.send(this.endpoint, 'PUT', {
      type: 'account_authentication_settings',
      ...body
    })
  }
}

export default AccountAuthenticationSettingsEndpoint
