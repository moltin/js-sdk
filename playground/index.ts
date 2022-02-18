import * as moltin from '..'
import nock from 'nock'
import { rateLimitError } from '../test/factories'

async function main() {
  const gateway = moltin.gateway({
    host: 'epcc-integration.global.ssl.fastly.net',
    client_id: 'LDMeTKqq0VwIkYmqSMZ702hs932VxFw3ScAcYsKMFX',
    client_secret: 'hvse1weduV0rgUPzmHheEmBo8YQsVjKryY3FJeWle0'
    // headers: {
    //   'EP-Beta-Features': 'account-management',
    // },
  })
  const apiUrl = 'https://epcc-integration.global.ssl.fastly.net/v2'

  // // Intercept the API request
  // nock(apiUrl, {
  //   reqheaders: {
  //     Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
  //   }
  // })
  //   .get('/products')
  //   .reply(429, rateLimitError)

  for (let i = 0; i < 200; i++) {
    gateway.Products.All()
  }

  // const products = await gateway.Products.All()
  // console.log(products)
}

main().catch(error => console.error(error))
