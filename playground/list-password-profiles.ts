import * as moltin from '..'

async function main() {
  const gateway = moltin.gateway({
    host: 'epcc-integration.global.ssl.fastly.net',
    client_id: 'R7paB5xa2ngzuEM8N6PkTOGpO9jTcAgW1DO2U2KzOl',
    client_secret: 'lsKTS0hKMzbxpNBAVjX0NoXt8FeALVPcQxh4lgofWD',
    headers: {
      'EP-Beta-Features': 'account-management,accounts'
    }
  })
  await gateway.Authenticate()
  // console.log('=======customer created successfully')
  const realm = await gateway.AuthenticationRealm.Create({
    data: {
      type: 'authentication-realm',
      name: 'Test Authentication Realm',
      redirect_uris: ['http://localhost:65534/'],
      relationships: {
        origin: {
          data: {
            id: '88888888-4444-4333-8333-111111111111',
            type: 'customer-authentication-settings'
          }
        }
      }
    }
  })
  console.log(realm.data.id)
  const accounts = await gateway.PasswordProfile.All(realm.data.id)
  console.log(accounts)
}
main().catch(console.error)
