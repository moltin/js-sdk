import CRUDExtend from '../extends/crud'

class AuthenticationRealmsEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)
    this.endpoint = 'authentication-realms'
  }

  Create(body) {
    return this.request.send(this.endpoint, 'POST', body.data)
  }

  Get({ realmId, token = null }) {
    return this.request.send(
      `${this.endpoint}/${realmId}`,
      'GET',
      undefined,
      token
    )
  }

  Update(realmId, body, token = null) {
    return this.request.send(
      `${this.endpoint}/${realmId}`,
      'PUT',
      body.data,
      token
    )
  }
}

export default AuthenticationRealmsEndpoint
