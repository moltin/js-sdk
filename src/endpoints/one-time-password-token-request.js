import CRUDExtend from '../extends/crud'

class OneTimePasswordTokenRequestEndpoint extends CRUDExtend {
  constructor(config) {
    super(config)
    this.endpoint =
      'authentication-realms/{{realmId}}/password-profiles/{{passwordProfileId}}/one-time-password-token-request'
  }

  Create(realmId, passwordProfileId, body, token = null) {
    return this.request.send(
      this.endpoint
        .replace('{{realmId}}', realmId)
        .replace('{{passwordProfileId}}', passwordProfileId),
      'POST',
      body,
      token
    )
  }
}

export default OneTimePasswordTokenRequestEndpoint
