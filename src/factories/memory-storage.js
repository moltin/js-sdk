class MemoryStorageFactory {
  constructor() {
    this.state = new Map()
  }

  set(key, value) {
    this.state.set(key, value)
  }

  get(key) {
    return this.state.get(key) || null
  }

  delete(key) {
    this.state.delete(key)
  }
}

export default MemoryStorageFactory
