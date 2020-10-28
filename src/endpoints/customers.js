import CRUDExtend from '../extends/crud'

class CustomersEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'customers'
  }

  Token(email, password, code, redirectUri, codeVerifier, headers) {
    const tokenRequestBody = (() => {
      const body = {
        type: 'token'
      }
      if (code && redirectUri && codeVerifier) {
        body.authentication_mechanism = 'oidc'
        body.oauth_authorization_code = code
        body.oauth_redirect_uri = redirectUri
        body.oauth_code_verifier = codeVerifier
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
