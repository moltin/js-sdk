import { expect } from 'chai'
import '../../src/utils/fetch-polyfill'
import throttleMod from '../../src/utils/throttle.js'
import { gateway as MoltinGateway } from '../../src/moltin'

const apiUrl = 'https://euwest.api.elasticpath.com/v2'

describe('Build throttle mechanism', () => {
  const Moltin = MoltinGateway({
    client_id: 'xxx',
    client_secret: 'xxx',
    throttleEnabled: true,
    throttleLimit: 3,
    throttleInterval: 125
  })

  it('should have correct config options for throttle', () => {
    const throttledQueueMock = function (limit: number, interval: number) {
      expect(limit).to.equal(Moltin.config.throttleConfig?.throttleLimit)
      expect(interval).to.equal(Moltin.config.throttleConfig?.throttleInterval)
    }
    throttleMod.__Rewire__('throttledQueue', throttledQueueMock)
  })

  it('should not be undefined', async () => {
    const throttleMock = async function (fn: () => any) {
      return fn()
    }
    expect(throttleMock).to.not.be.undefined
    throttleMod.__Rewire__('throttle', throttleMock)
  })
})
