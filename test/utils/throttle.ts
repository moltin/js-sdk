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
  const throttleFetch = mod.__get__('throttleFetch')
  const wrapFetch = mod.__get__('wrapFetch')
  it('should have correct config options', () => {
    expect(options).to.deep.include({
      throttleRequests: true,
      throttleLimit: 3,
      throttleInterval: 125,
      throttleStrict: true,
      httpKeepAlive: true,
      httpKeepAliveInterval: 10000
    })
  })

  it('should give correct throttle response', async () => {
    const res = throttleFetch('api.moltin.com', options).then(() => Promise.resolve('Resolved promise response'))
    console.log(res)
    expect(res.text).to.equal('Resolved promise response')
  })
})
