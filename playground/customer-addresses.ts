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
  // console.log('=======customer created successfully')
  await gateway.Customers.Create({
    email: 'email@email.com',
    password: 'pwd',
    name: 'name',
    type: 'customer'
  })
  const customers = await gateway.Customers.All()
  console.log(customers)
  await gateway.CustomerAddresses.Create({
    body: {
      type: 'customer-address',
      first_name: 'first_name',
      last_name: 'last_name',
      line_1: 'line_1',
      postcode: 'postcode',
      county: 'county',
      country: 'RU'
    },
    customer: customers.data[0].id
  })
  console.log('=======customer address created successfully')
  const addresses = await gateway.CustomerAddresses.All({
    customer: customers.data[0].id
  })
  console.log(addresses)
  const fetchAddresses = await gateway.CustomerAddresses.Get({
    address: addresses.data[0].id,
    customer: customers.data[0].id
  })
  console.log('=======Customer address fetched successfully:')
  console.log(fetchAddresses)

  const updated = await gateway.CustomerAddresses.Update({
    address: addresses.data[0].id,
    body: {
      id: addresses.data[0].id,
      type: 'customer-address',
      first_name: 'first_name22',
      last_name: 'last_name22',
      line_1: 'line_122',
      postcode: 'postcode22',
      county: 'county22',
      country: 'US'
    },
    customer: customers.data[0].id
  })
  console.log('=======Customer address updated successfully:')
  console.log(updated)
  const deleted = await gateway.CustomerAddresses.Delete({
    address: addresses.data[0].id,
    customer: customers.data[0].id
  })
  console.log('=======Deleted successfully:')
  console.log(deleted)
}
main().catch(console.error)
