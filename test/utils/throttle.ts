import { expect } from 'chai'
import rewire from 'rewire'
import { configure, throttleFetch } from '../../src/utils/throttle.js'


const mod = rewire('../../src/utils/throttle')
const options = {
    throttleRequests: true,
    throttleLimit: 3,
    throttleInterval: 125,
    throttleStrict: true,
    httpKeepAlive: true,
    httpKeepAliveInterval: 10000
  }
describe('Build throttle mechanism', () => {
  it('should have correct config options', () => {

    expect(options).to.deep.include(
      {
        throttleRequests: true,
        throttleLimit: 3,
        throttleInterval: 125,
        throttleStrict: true,
        httpKeepAlive: true,
        httpKeepAliveInterval: 10000
      }
    )
  })
})
