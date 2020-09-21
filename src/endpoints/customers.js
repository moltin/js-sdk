import CRUDExtend from '../extends/crud'

class CustomersEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'customers'
  }

  Token(email, password, code, redirectUri, headers) {
    if (code && redirectUri) {
      return this.request.send(
        `${this.endpoint}/tokens`,
        'POST',
        {
          oauth_authorization_code: code,
          oauth_redirect_uri: redirectUri,
          type: 'token',
          authentication_mechanism: 'oidc'
        },
        null,
        { ...headers }
      )
    }
    return this.request.send(
      `${this.endpoint}/tokens`,
      'POST',
      {
        email,
        password,
        type: 'token'
      },
      null,
      { ...headers }
    )
  }
}
export default CustomersEndpoint
