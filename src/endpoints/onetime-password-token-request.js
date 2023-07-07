import CRUDExtend from '../extends/crud'

class OnetimePasswordTokenRequestEndpoint extends CRUDExtend {
  constructor(config) {
    super(config)
    this.endpoint =
      'authentication-realms/{{realmId}}/password-profiles/{{passwordProfileId}}/onetime-password-token-request'
  }

  Create(realmId, passwordProfileId, body, token = null) {
    return this.request.send(
      this.endpoint
        .replace('{{realmId}}', realmId)
        .replace('{{passwordProfileId}}', passwordProfileId),
      'POST',
      body.data,
      token
    )
  }
}

export default OnetimePasswordTokenRequestEndpoint
