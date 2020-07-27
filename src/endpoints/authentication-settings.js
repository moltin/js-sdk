import CRUDExtend from '../extends/crud'

class AuthenticationSettingsEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)
    this.endpoint = 'authentication-realms'
  }

  Get() {
    // TODO: Stub this out for now...
    // This should just return the authentication settings...

    return new Promise(res => {
      setTimeout(() => {
        res({
          data: {
            type: 'customer-authentication-settings',
            allow_password_authentication: true,
            links: {
              self: 'https://api.moltin.com/v2/customer-authentication-settings'
            },
            relationships: {
              'authentication-realms': {
                data: [
                  {
                    type: 'authentication-realm',
                    id: '19e7a80d-d5f9-48c6-916d-58e7c6f62311',
                    links: [
                      {
                        self:
                          'https://api.moltin.com/v2/authentication-realm/{id}'
                      }
                    ]
                  }
                ]
              }
            },
            meta: {
              clientId: 'epcc-reference-store'
            }
          }
        })
      }, 100)
    })
  }
}

export default AuthenticationSettingsEndpoint
