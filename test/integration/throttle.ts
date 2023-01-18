import throttledQueue from 'throttled-queue'
import { gateway } from '../../src/moltin'
import nock from 'nock'
import { assert } from 'chai'

const apiUrl = 'https://api.moltin.com/v2'

let now = Date.now()

console.log(`Start: ${now}`)

describe('Moltin addresses', () => {
  const moltin = gateway({
    client_id: 'XXX',
    client_secret: 'XXX'
  })

  it('should return successful throttling', () => {
    let now = Date.now()

    console.log(`Start: ${now}`)

    const throttle = throttledQueue(3, 125)

    for (let index = 1; index <= 500; index++) {
      const msecDiff = Date.now() - now
      // Intercept the API request
      nock(apiUrl, {
        reqheaders: {
          Authorization: 'Bearer 902cf5f0d01a1d65067df82c7305a1a636220fc4'
        }
      })
        .persist()
        .get(`/carts/:${index}`)
        .times(500)
        .reply(200, { data: { id: `${index}` } })
      throttle(async () => {
        return moltin
          .Cart(`${index}`)
          .Get()
          .then(response => {
            console.log(`CartId: ${response.data.id}`)
            console.log(`${index}: ${msecDiff}`)
            assert.equal(response.data.id, `${index}`)
          })
      })
    }
  })

  it('should return error for throttling', () => {
    let now = Date.now()

    console.log(`Start: ${now}`)

    const throttle = throttledQueue(3, 125)

    for (let index = 1; index <= 500; index++) {
      const msecDiff = Date.now() - now
      // Intercept the API request
      nock(apiUrl, {
        reqheaders: {
          Authorization: 'Bearer 902cf5f0d01a1d65067df82c7305a1a636220fc4'
        }
      })
        .persist()
        .get(`/carts/:${index}`)
        .times(500)
        .replyWithError({ title: 'Rate limit was reached', status: 429 })
      throttle(async () => {
        return moltin
          .Cart(`${index}`)
          .Get()
          .catch(err => {
            console.error('error', err)
            assert.equal(err, {
              errors: [{ title: 'Rate limit was reached', status: 429 }]
            })
          })
      })
    }
  })
})
