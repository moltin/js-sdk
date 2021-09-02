
import * as moltin from './../';

async function main() {
  const gateway = moltin.gateway({
    host: 'epcc-integration.global.ssl.fastly.net',
    client_id: 'client_id',
    client_secret: 'client_secret',
    headers: {
      'EP-Beta-Features': 'account-management',
    },
  });

  // const accounts = await gateway.Accounts.All();
  // console.log(accounts);
}

main().catch(console.error);
