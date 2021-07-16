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
  // console.log('=======account created successfully')
  // await gateway.Accounts.Create({
  //   email: 'email@email.com',
  //   password: 'pwd',
  //   name: 'name',
  //   type: 'account'
  // })
  const accounts = await gateway.Accounts.All()
  // console.log(accounts)
  await gateway.AccountAddresses.Create({
    body: {
      type: 'account-address',
      first_name: 'first_name',
      last_name: 'last_name',
      line_1: 'line_1',
      postcode: 'postcode',
      county: 'county',
      country: 'RU'
    },
    account: accounts.data[0].id
  })
  console.log('=======account address created successfully')
  const addresses = await gateway.AccountAddresses.All({
    account: accounts.data[0].id
  })
  console.log(addresses)
  const fetchAddresses = await gateway.AccountAddresses.Get({
    address: addresses.data[0].id,
    account: accounts.data[0].id
  })
  console.log('=======Account address fetched successfully:')
  console.log(fetchAddresses)

  const updated = await gateway.AccountAddresses.Update({
    address: addresses.data[0].id,
    body: {
      id: addresses.data[0].id,
      type: 'account-address',
      first_name: 'first_name22',
      last_name: 'last_name22',
      line_1: 'line_122',
      postcode: 'postcode22',
      county: 'county22',
      country: 'US'
    },
    account: accounts.data[0].id
  })
  console.log('=======Account address updated successfully:')
  console.log(updated)
  const deleted = await gateway.AccountAddresses.Delete({
    address: addresses.data[0].id,
    account: accounts.data[0].id
  })
  console.log('=======Deleted successfully:')
  console.log(deleted)
}
main().catch(console.error)
