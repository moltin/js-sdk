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
  // await gateway.Authenticate()

  // await gateway.Accounts.Create({
  //   legal_name: 'legal1',
  //   name: 'name1',
  //   type: 'account',
  //   registration_id: 'registration_id1'
  // })
  // await gateway.Accounts.Create({
  //   legal_name: 'legal1',
  //   name: 'name1',
  //   type: 'account',
  //   registration_id: 'registration_id1_1'
  // })
  // await gateway.Accounts.Create({
  //   legal_name: 'legal2',
  //   name: 'name2',
  //   type: 'account',
  //   registration_id: 'registration_id2'
  // })
  // await gateway.Accounts.Create({
  //   legal_name: 'legal3',
  //   name: 'name3',
  //   type: 'account',
  //   registration_id: 'registration_id3'
  // })
  // await gateway.Accounts.Create({
  //   legal_name: 'legal4',
  //   name: 'name4',
  //   type: 'account',
  //   registration_id: 'registration_id4'
  // })
  console.log('=======account created successfully')

  const accounts = await gateway.Accounts.Filter({
    like: { name: 'name3' }
  }).All()

  console.log(accounts)
}
main().catch(console.error)
