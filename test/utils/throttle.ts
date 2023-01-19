import { expect } from 'chai'
import nock from 'nock'
import '../../src/utils/fetch-polyfill'
import throttleMod, {
  configure,
  throttleFetch
} from '../../src/utils/throttle.js'

const apiUrl = 'https://api.moltin.com/v2'

const testOptions = {
  throttleRequests: true,
  throttleLimit: 3,
  throttleInterval: 125,
  throttleStrict: true,
  httpKeepAlive: true,
  httpKeepAliveInterval: 10000
}
describe('Build throttle mechanism', () => {
  it('should have correct config options for throttle', () => {
    const throttledQueueMock = function (limit: number, interval: number) {
      expect(limit).to.equal(testOptions.throttleLimit)
      expect(interval).to.equal(testOptions.throttleInterval)
    }
    throttleMod.__Rewire__('throttledQueue', throttledQueueMock)
    configure(testOptions)
  })

  it('should give correct throttle response', async () => {
    // Intercept the API request
    nock(apiUrl).get('/test').reply(200, { data: 'Resolved promise response' })

    const throttleMock = async function (fn: () => any) {
      expect(fn).to.not.be.undefined
      return fn()
    }
    throttleMod.__Rewire__('throttle', throttleMock)

    const res = await throttleFetch(apiUrl + '/test', testOptions)
    const body = await res.text()
    expect(body).to.equal('{"data":"Resolved promise response"}')
  })

  it('should have correct config options for http agent', () => {
    const httpAgent = function (keepAlive: boolean, keepAliveMsecs: number) {
      expect(keepAlive).to.equal(testOptions.httpKeepAlive),
        expect(keepAliveMsecs).to.equal(testOptions.httpKeepAliveInterval)
    }
    throttleMod.__Rewire__('httpAgent', httpAgent)
    configure(testOptions)
  })

  it('should pass correct url and options to http keepAlive', async () => {
    // Intercept the API request
    nock(apiUrl).get('/test').reply(200, { data: 'Resolved promise response' })

    const keepAliveFetchMock = async function (url: string , options: object) {
      expect(url).to.equal(apiUrl + '/test')
      expect(options).to.equal(testOptions)
      return function(){}
    }
    throttleMod.__Rewire__('keepAliveFetch', keepAliveFetchMock)
  })
})
