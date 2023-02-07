import { expect } from 'chai'
import '../../src/utils/fetch-polyfill'
import throttleMod from '../../src/utils/throttle.js'
import { gateway as MoltinGateway } from '../../src/moltin'

const apiUrl = 'https://api.moltin.com/v2'

describe('Build throttle mechanism', () => {
  const Moltin = MoltinGateway({
    throttleRequests: true,
    throttleLimit: 3,
    throttleInterval: 125,
    throttleStrict: false
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

  it('should not be undefined', async () => {
    const throttleMock = async function (fn: () => any) {
      return fn()
    }
    expect(throttleMock).to.not.be.undefined
    throttleMod.__Rewire__('throttle', throttleMock)
  })
})
