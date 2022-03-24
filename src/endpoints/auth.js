import BaseExtend from '../extends/base'

class AuthEndpoint extends BaseExtend {
  constructor(endpoint) {
    super()
    this.config = { ...endpoint }
    this.request = new RequestFactory(this.config)
    this.config.version = ''
    this.endpoint = 'oauth/token'
  }

  AuthWithPassword(username, password) {
    const body = {
      grant_type: 'password',
      username,
      password
    }
    this.request.send(
      this.endpoint,
      'POST',
      Object.keys(body)
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(body[k])}`)
        .join('&'),
      undefined,
      undefined,
      undefined,
      undefined,
      {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    )
  }
}

export default AuthEndpoint
