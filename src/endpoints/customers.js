import CRUDExtend from '../extends/crud'

class CustomersEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'customers'
  }

  Token(email, password, code, redirectUri, headers) {
    const tokenRequestBody = (() => {
      const body = {
        type: 'token'
      }
      if (code && redirectUri) {
        body.oauth_authorization_code = code
        body.oauth_redirect_uri = redurectUri
        body.authentication_mechanism = 'oidc'
      } else {
        body.email = email
        body.password = password
      }
      return body
    })()

    return this.request.send(
      `${this.endpoint}/tokens`,
      'POST',
      tokenRequestBody,
      null,
      {
        ...headers
      }
    )
  }
}
export default CustomersEndpoint
