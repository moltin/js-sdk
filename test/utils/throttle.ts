import { expect } from 'chai'
import nock from 'nock'
import '../../src/utils/fetch-polyfill'
import throttleMod, {
  configure,
  throttleFetch
} from '../../src/utils/throttle.js'
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
    configure(Moltin.config.throttleConfig)
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

  it('should have correct config options for http agent', () => {
    const httpAgent = function (keepAlive: boolean, keepAliveMsecs: number) {
      expect(keepAlive).to.equal(Moltin.config.throttleConfig?.httpKeepAlive),
        expect(keepAliveMsecs).to.equal(
          Moltin.config.throttleConfig?.httpKeepAliveInterval
        )
    }
    throttleMod.__Rewire__('httpAgent', httpAgent)
    configure(Moltin.config.throttleConfig)
  })

  it('should pass correct url and options to http keepAlive', async () => {
    // Intercept the API request
    nock(apiUrl).get('/test').reply(200, { data: 'Resolved promise response' })

    const keepAliveFetchMock = async function (url: string, options: object) {
      expect(url).to.equal(apiUrl + '/test')
      expect(options).to.equal(Moltin.config.throttleConfig)
      return function () {}
    }
    throttleMod.__Rewire__('keepAliveFetch', keepAliveFetchMock)
  })
})
