import throttledQueue from 'throttled-queue'
import { gateway } from '../../src/moltin'
import nock from 'nock'
import { assert } from 'chai'

const apiUrl = 'https://api.moltin.com/v2'
const client = gateway({
  client_id: 'XXX'
})

let now = Date.now()

console.log(`Start: ${now}`)

const throttle = throttledQueue(3, 125)

for (let index = 1; index <= 500; index++) {
  const msecDiff = Date.now() - now
  throttle(async () => {

    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get(
        `/pcm/products?filter=eq(slug,
      ${index % 100}product-slug-1670366469995)`
      )
      .reply(200, { data: { meta: { results: {total: 0 } }} })

    return client.PCM.Filter({
      eq: {
        slug: `${index % 100}product-slug-1670366469995`
      }
    })
      .All()
      .then(response => {
        console.log(response.meta.results)
        console.log(`${index}: ${msecDiff}`)
        assert.equal(response.meta.results, {total: 0 })
      })
      .catch(err => {
        console.error('error', err)
        assert.equal(err, { errors: [ { title: 'Rate limit was reached', status: 429 } ] })
      })
  })
}
