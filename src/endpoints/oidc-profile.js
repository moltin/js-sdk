import CRUDExtend from '../extends/crud'
import { buildURL } from '../utils/helpers'

class OidcProfileEndpoint extends CRUDExtend {
  constructor(config) {
    super(config)
    this.endpoint = 'authentication-realms/{{realmId}}/oidc-profiles'
  }

  All(realmId, token = null, headers = {}) {
    const { includes, sort, limit, offset, filter } = this

    this.call = this.request.send(
      buildURL(this.endpoint.replace('{{realmId}}', realmId), {
        includes,
        sort,
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

    return this.call
  }

  Create(realmId, body) {
    return this.request.send(
      this.endpoint.replace('{{realmId}}', realmId),
      'POST',
      body.data
    )
  }

  Get({ realmId, profileId, token = null, headers = {} }) {
    return this.request.send(
      `${this.endpoint.replace('{{realmId}}', realmId)}/${profileId}`,
      'GET',
      undefined,
      token,
      this,
      headers
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

export default OidcProfileEndpoint
