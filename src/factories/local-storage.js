class LocalStorageFactory {
  constructor(path = './localStorage') {
    if (typeof localStorage === 'undefined' || localStorage === null) {
      const { LocalStorage } = require('node-localstorage')

      this.localStorage = new LocalStorage(path)
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

export default LocalStorageFactory
