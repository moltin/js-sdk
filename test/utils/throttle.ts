import { expect } from 'chai'
import nock from 'nock'
import '../../src/utils/fetch-polyfill'
import throttleMod from '../../src/utils/throttle.js'
import throttleFetch from '../../src/utils/throttle.js'
import { gateway as MoltinGateway } from '../../src/moltin'

const apiUrl = 'https://api.moltin.com/v2'

describe('Build throttle mechanism', () => {
  const Moltin = MoltinGateway({
    throttleRequests: true,
    throttleLimit: 3,
    throttleInterval: 125,
    throttleStrict: false,
    httpKeepAlive: false,
    httpKeepAliveInterval: 10000
  })

  it('should have correct config options for throttle', () => {
    const throttledQueueMock = function (
      limit: number,
      interval: number,
      strict: boolean
    ) {
      expect(limit).to.equal(Moltin.config.throttleConfig?.throttleLimit)
      expect(interval).to.equal(Moltin.config.throttleConfig?.throttleInterval)
      expect(strict).to.equal(Moltin.config.throttleConfig?.throttleStrict)
    }
    throttleMod.__Rewire__('throttledQueue', throttledQueueMock)
  })

  it('should give correct throttle response', async () => {
    // Intercept the API request
    nock(apiUrl).get('/test').reply(200, { data: 'Resolved promise response' })
    
    const throttleMock = async function (fn: () => any) {
      expect(fn).to.not.be.undefined
      return fn()
    }
    throttleMod.__Rewire__('throttle', throttleMock)

    const res = await throttleFetch(
      apiUrl + '/test',
      Moltin.config.throttleConfig
    )
    const body = await res.text()
    expect(body).to.equal('{"data":"Resolved promise response"}')
  })
})
