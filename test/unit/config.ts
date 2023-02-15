import { expect } from 'chai'
import fetch from 'cross-fetch'
import {
  gateway as MoltinGateway,
  MemoryStorageFactory,
  LocalStorageFactory
} from '../../src/moltin'
import { throttleFetch } from '../../src/utils/throttle'
describe('Moltin config', () => {
  it('storage defaults to `StorageFactory`', () => {
    const Moltin = MoltinGateway({})
    expect(Moltin.storage).to.be.an.instanceof(LocalStorageFactory)
    expect(Moltin.config.storage).to.be.equal(Moltin.storage)
    expect(Moltin.request.storage).to.be.equal(Moltin.storage)
    expect(Moltin.Currencies.storage).to.equal(Moltin.storage)
  })

  it('storage can be overridden', () => {
    const memoryStorage = new MemoryStorageFactory()
    const Moltin = MoltinGateway({
      storage: memoryStorage
    })
    expect(Moltin.storage).to.be.an.instanceof(MemoryStorageFactory)
    expect(Moltin.config.storage).to.be.equal(Moltin.storage)
    expect(Moltin.request.storage).to.be.equal(Moltin.storage)
    expect(Moltin.Currencies.storage).to.be.equal(Moltin.storage)
  })

  it('custom_fetch can be overridden', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX',
      custom_fetch: fetch
    })

    expect(Moltin.config.auth.fetch).to.be.an.instanceof(Function)
    expect(Moltin.config.auth.fetch).to.equal(fetch)
  })

  it('custom_fetch will fail must be a Function', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX',
      custom_fetch: 'string'
    } as any)

    return Moltin.Authenticate().catch(error => {
      expect(error).to.be.an.instanceof(TypeError)
    })
  })

  it('should access throttleFetch if custom_fetch and throttle request is given', () => {
    // minimal test function
    const testCustomFetch = (url: string, options: object) => url

    const testOptions = {
      custom_fetch: testCustomFetch,
      throttleEnabled: true,
      throttleLimit: 3,
      throttleInterval: 125
    }

    let partiallyAppliedThrottleFetch = undefined
    const resolveFetchMethodMock = function (options) {
      const resolvedFetch = options.custom_fetch ?? fetch
      expect(resolvedFetch).to.equal(options.custom_fetch)
      partiallyAppliedThrottleFetch = throttleFetch(resolvedFetch)
      return options.throttleEnabled
        ? partiallyAppliedThrottleFetch
        : resolvedFetch
    }

    const response = resolveFetchMethodMock(testOptions)
    expect(response).to.equal(partiallyAppliedThrottleFetch)
  })

  it('should use fetch if custom_fetch and throttleRequest value are not given', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })
    expect(Moltin.config.auth.fetch).to.equal(fetch)
  })

  it('should use custom_fetch if throttleRequest value is not given', () => {
    // minimal test function
    const testCustomFetch = (url: string, options: object) => url
    const Moltin = MoltinGateway({
      client_id: 'XXX',
      custom_fetch: testCustomFetch
    })
    expect(Moltin.config.auth.fetch).to.equal(testCustomFetch)
  })

  it('should have throttling config options', () => {
    const Moltin = MoltinGateway({
      throttleEnabled: true,
      throttleLimit: 3,
      throttleInterval: 125
    })

    expect(Moltin.config.throttleConfig?.throttleEnabled).to.be.equal(true)
    expect(Moltin.config.throttleConfig?.throttleLimit).to.be.equal(3)
    expect(Moltin.config.throttleConfig?.throttleInterval).to.be.equal(125)
  })
})
