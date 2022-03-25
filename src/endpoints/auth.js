import BaseExtend from '../extends/base'
import RequestFactory from '../factories/request'

class AuthEndpoint extends BaseExtend {
  constructor(endpoint) {
    super(endpoint)
    this.config = { ...endpoint }
    this.request = new RequestFactory(this.config)
    this.config.version = ''
    this.endpoint = 'oauth/access_token'
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
      '',
      {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    )
  }
}

export default AuthEndpoint
