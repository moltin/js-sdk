import * as moltin from '..'
import nock from 'nock'
import { rateLimitError } from '../test/factories'

async function main() {
  const gateway = moltin.gateway({
    host: 'epcc-integration.global.ssl.fastly.net',
    client_id: 'LDMeTKqq0VwIkYmqSMZ702hs932VxFw3ScAcYsKMFX',
    client_secret: 'hvse1weduV0rgUPzmHheEmBo8YQsVjKryY3FJeWle0',
    headers: {
      'EP-Beta-Features': 'account-management',
      Authorization: 'Bearer ABC'
    }
  })
  const apiUrl = 'https://epcc-integration.global.ssl.fastly.net'

  nock(apiUrl, {})
    .post('/oauth/access_token')
    .reply(200, {
      access_token: 'ABC'
    })
    .get('/v2/products')
    .reply(429, rateLimitError)
    .get('/v2/products')
    .reply(200, [{ name: 'Product 1' }])

  // Intercept the API request
  // nock(apiUrl, {})
  //   // .get('/v2/products')
  //   // .reply(429, rateLimitError)
  //   .get('*')
  //   .reply(200, {})

  // for (let i = 0; i < 200; i++) {
  // }
  const t = await gateway.Products.All()
  console.log(t)

  // const products = await gateway.Products.All()
  // console.log(products)
}

main().catch(error => console.error(error))
