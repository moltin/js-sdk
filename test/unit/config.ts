import { expect } from 'chai'
import fetch from 'cross-fetch'
import {
  gateway as MoltinGateway,
  MemoryStorageFactory,
  LocalStorageFactory
} from '../../src/moltin'
import throttleFetch from '../../src/utils/throttle'
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

  it('should use throttleFetch if custom_fetch and throttleRequest value are given', () => {
    // minimal test function
    const testCustomFetch = (url: string, options: object) => url

    const Moltin = MoltinGateway({
      client_id: 'XXX',
      custom_fetch: testCustomFetch,
      throttleRequests: true
    })
    expect(Moltin.config.auth.fetch).to.equal(throttleFetch)
  })

  it('should use fetch if custom_fetch and throttleRequest value are not given', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })
    expect(Moltin.config.auth.fetch).to.equal(fetch)
  })

  it('should have throttling config options', () => {
    const Moltin = MoltinGateway({
      throttleRequests: true,
      throttleLimit: 3,
      throttleInterval: 125,
      throttleStrict: false
    })

    expect(Moltin.config.throttleConfig?.throttleRequests).to.be.equal(true)
    expect(Moltin.config.throttleConfig?.throttleLimit).to.be.equal(3)
    expect(Moltin.config.throttleConfig?.throttleInterval).to.be.equal(125)
    expect(Moltin.config.throttleConfig?.throttleStrict).to.be.equal(false)
  })
})
