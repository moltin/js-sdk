import CRUDExtend from '../extends/crud'
import { buildURL } from '../utils/helpers'

class UserAuthenticationPasswordProfileEndpoint extends CRUDExtend {
  constructor(config) {
    super(config)
    this.endpoint =
      'authentication-realms/{{realmId}}/user-authentication-info/{{userAuthenticationInfoId}}/user-authentication-password-profile-info'
  }

  Create(realmId, userAuthenticationInfoId, body, token = null) {
    return this.request.send(
      this.endpoint
        .replace('{{realmId}}', realmId)
        .replace('{{userAuthenticationInfoId}}', userAuthenticationInfoId),
      'POST',
      body.data,
      token
    )
  }

  All(realmId, userAuthenticationInfoId, token = null, headers = {}) {
    const { limit, offset } = this
    return this.request.send(
      buildURL(
        `${this.endpoint
          .replace('{{realmId}}', realmId)
          .replace('{{userAuthenticationInfoId}}', userAuthenticationInfoId)}`,
        {
          limit,
          offset
        }
      ),
      'GET',
      undefined,
      token,
      this,
      headers
    )
  }

  Get(
    realmId,
    userAuthenticationInfoId,
    userAuthenticationPasswordProfileId,
    token = null
  ) {
    return this.request.send(
      `${this.endpoint
        .replace('{{realmId}}', realmId)
        .replace(
          '{{userAuthenticationInfoId}}',
          userAuthenticationInfoId
        )}/${userAuthenticationPasswordProfileId}`,
      'GET',
      undefined,
      token
    )
  }

  Update(
    realmId,
    userAuthenticationInfoId,
    userAuthenticationPasswordProfileId,
    body,
    token = null
  ) {
    return this.request.send(
      `${this.endpoint
        .replace('{{realmId}}', realmId)
        .replace(
          '{{userAuthenticationInfoId}}',
          userAuthenticationInfoId
        )}/${userAuthenticationPasswordProfileId}`,
      'PUT',
      body.data,
      token
    )
  }

  Delete(
    realmId,
    userAuthenticationInfoId,
    userAuthenticationPasswordProfileId,
    token = null
  ) {
    return this.request.send(
      `${this.endpoint
        .replace('{{realmId}}', realmId)
        .replace(
          '{{userAuthenticationInfoId}}',
          userAuthenticationInfoId
        )}/${userAuthenticationPasswordProfileId}`,
      'DELETE',
      undefined,
      token
    )
  }
}

export default UserAuthenticationPasswordProfileEndpoint
