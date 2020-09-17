import CRUDExtend from '../extends/crud'

class AuthenticationSettingsEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)
    this.endpoint = 'customer-authentication-settings'
  }

  Get() {
    return this.request.send(`${this.endpoint}`, 'GET', undefined)
  }
}

export default AuthenticationSettingsEndpoint
