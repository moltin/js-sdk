class StorageFactory {
  constructor() {
    if (typeof localStorage === 'undefined' || localStorage === null) {
      const { LocalStorage } = require('node-localstorage')

      this.localStorage = new LocalStorage('./localStorage')
    } else {
      this.localStorage = window.localStorage
    }
  }

  set(key, value) {
    return this.localStorage.setItem(key, value)
  }

  get(key) {
    return this.localStorage.getItem(key)
  }

  delete(key) {
    return this.localStorage.removeItem(key)
  }
}

export default StorageFactory
