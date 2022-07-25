import CRUDExtend from '../extends/crud'
import { buildRelationshipData, formatUrlResource } from '../utils/helpers'

class CustomersEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'customers'

    this.sendToken = (tokenRequestBody, headers = {}) =>
      this.request.send(
        `${this.endpoint}/tokens`,
        'POST',
        tokenRequestBody,
        null,
        {
          ...headers
        }
      )
  }

  TokenViaPassword(email, password, headers) {
    const body = {
      type: 'token',
      authentication_mechanism: 'password',
      email,
      password
    }

    return this.sendToken(body, headers)
  }

  TokenViaOIDC(code, redirectUri, codeVerifier, headers) {
    const body = {
      type: 'token',
      authentication_mechanism: 'oidc',
      oauth_authorization_code: code,
      oauth_redirect_uri: redirectUri,
      oauth_code_verifier: codeVerifier
    }

    return this.sendToken(body, headers)
  }

  Token(email, password) {
    return this.TokenViaPassword(email, password)
  }

  CreateRelationships(id, type, resources) {
    const body = buildRelationshipData(type, resources)
    const parsedType = formatUrlResource(type)

    return this.request.send(
      `${this.endpoint}/${id}/relationships/${parsedType}`,
      'POST',
      body
    )
  }

  DeleteRelationships(id, type) {
    const parsedType = formatUrlResource(type)

    return this.request.send(
      `${this.endpoint}/${id}/relationships/${parsedType}`,
      'DELETE',
    )
  }
}
export default CustomersEndpoint
