import CRUDExtend from '../extends/crud'
import { buildURL } from '../utils/helpers'

class PasswordProfileEndpoint extends CRUDExtend {
  constructor(config) {
    super(config)
    this.endpoint = 'authentication-realms/{{realmId}}/password-profiles'
  }

  Create(realmId, body) {
    return this.request.send(
      this.endpoint.replace('{{realmId}}', realmId),
      'POST',
      body.data
    )
  }

  All(realmId, token = null, headers = {}) {
    const { limit, offset } = this
    return this.request.send(
      buildURL(`${this.endpoint.replace('{{realmId}}', realmId)}`, {
        limit,
        offset
      }),
      'GET',
      undefined,
      token,
      this,
      headers
    )
  }

  Get({ realmId, profileId }) {
    return this.request.send(
      `${this.endpoint.replace('{{realmId}}', realmId)}/${profileId}`,
      'GET'
    )
  }

  Update(realmId, profileId, body, token = null) {
    return this.request.send(
      `${this.endpoint.replace('{{realmId}}', realmId)}/${profileId}`,
      'PUT',
      body.data,
      token
    )
  }

  Delete(realmId, profileId) {
    return this.request.send(
      `${this.endpoint.replace('{{realmId}}', realmId)}/${profileId}`,
      'DELETE'
    )
  }
}

export default PasswordProfileEndpoint
