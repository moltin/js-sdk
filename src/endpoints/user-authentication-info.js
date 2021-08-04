import CRUDExtend from '../extends/crud'
import { buildURL } from '../utils/helpers'

class UserAuthenticationInfoEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)
    this.endpoint = 'authentication-realms/{{realmId}}/user-authentication-info'
  }

  Create(realmId, body, token = null) {
    return this.request.send(
      this.endpoint.replace('{{realmId}}', realmId),
      'POST',
      body.data,
      token
    )
  }

  All(realmId, token = null, headers = {}) {
    const { limit, offset, filter } = this
    return this.request.send(
      buildURL(`${this.endpoint.replace('{{realmId}}', realmId)}`, {
        limit,
        offset,
        filter
      }),
      'GET',
      undefined,
      token,
      this,
      headers
    )
  }

  Get(realmId, userAuthenticationInfoId, token = null) {
    return this.request.send(
      `${this.endpoint.replace(
        '{{realmId}}',
        realmId
      )}/${userAuthenticationInfoId}`,
      'GET',
      undefined,
      token
    )
  }

  Update(realmId, userAuthenticationInfoId, body, token = null) {
    return this.request.send(
      `${this.endpoint.replace(
        '{{realmId}}',
        realmId
      )}/${userAuthenticationInfoId}`,
      'PUT',
      body.data,
      token
    )
  }

  Delete(realmId, userAuthenticationInfoId, token = null) {
    return this.request.send(
      `${this.endpoint.replace(
        '{{realmId}}',
        realmId
      )}/${userAuthenticationInfoId}`,
      'DELETE',
      undefined,
      token
    )
  }
}

export default UserAuthenticationInfoEndpoint
