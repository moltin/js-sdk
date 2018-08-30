import { expect } from 'chai'
import {
  gateway as MoltinGateway,
  MemoryStorageFactory,
  LocalStorageFactory
} from '../../src/moltin'

describe('storage', () => {
  it('defaults to `StorageFactory`', () => {
    const Moltin = MoltinGateway({})
    expect(Moltin.storage).to.be.an.instanceof(LocalStorageFactory)
    expect(Moltin.config.storage).to.be.equal(Moltin.storage)
    expect(Moltin.request.storage).to.be.equal(Moltin.storage)
    expect(Moltin.Currencies.storage).to.equal(Moltin.storage)
  })

  it('can be overridden', () => {
    const memoryStorage = new MemoryStorageFactory()
    const Moltin = MoltinGateway({
      storage: memoryStorage
    })
    expect(Moltin.storage).to.be.an.instanceof(MemoryStorageFactory)
    expect(Moltin.config.storage).to.be.equal(Moltin.storage)
    expect(Moltin.request.storage).to.be.equal(Moltin.storage)
    expect(Moltin.Currencies.storage).to.be.equal(Moltin.storage)
  })
})
