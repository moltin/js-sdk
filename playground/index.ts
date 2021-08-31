import * as moltin from './../';

async function main() {
  const gateway = moltin.gateway({
    host: 'epcc-integration.global.ssl.fastly.net',
    client_id: 'ueNTGjzwlYV2LkFbNwsPTWYau5nYEVBCcGIkHDrV9A',
    client_secret: '0uB0rxJaWXdStn1BmHVcTx8AsmvnLoxWdhJDvUDvj3',
    headers: {
      'EP-Beta-Features': 'account-management',
    },
  });

  // const accounts = await gateway.Accounts.All();
  // console.log(accounts);
  const accounts = await gateway.AccountMembers.Filter({eq:{name:'John Doe'}}).All()
  console.log(accounts)
}

main().catch(console.error);
