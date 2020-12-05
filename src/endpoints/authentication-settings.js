import CRUDExtend from '../extends/crud'

class AuthenticationSettingsEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)
    this.endpoint = 'settings/customer-authentication'
  }

  Get() {
    return this.request.send(`${this.endpoint}`, 'GET', undefined)
  }
}

export default AuthenticationSettingsEndpoint
