import RequestFactory from '../factories/request'

class AccountMembershipSettingsEndpoint {
  constructor(config) {
    this.request = new RequestFactory(config)
    this.endpoint = 'settings/account-membership'
  }

  Get() {
    return this.request.send(`${this.endpoint}`, 'GET', undefined)
  }

  Update(body) {
    return this.request.send(`${this.endpoint}`, 'PUT', body)
  }
}

export default AccountMembershipSettingsEndpoint
