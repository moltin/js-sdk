import * as moltin from './../';

async function main() {
  const gateway = moltin.gateway({
    host: 'epcc-integration.global.ssl.fastly.net',
    client_id: 'DPjTL3UTelnbwTawuEjvTime3KxGtpaPPbxFvkoD60',
    client_secret: 'wMlK4YvSNpa3SVw3401ADAqmBmyXu1Ed8KEkUIlAsl',
    headers: {
      'EP-Beta-Features': 'account-management',
    },
  });

  const accounts = await gateway.AccountMembershipSettings.Get();
  console.log(accounts);
}

main().catch(console.error);
