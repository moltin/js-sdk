import Cookies from 'js-cookie'

class SecureCookiesStorageFactory {
  constructor() {
    this.cookies = Cookies
  }

  set(key, value) {
    this.cookies.set(key, value, { secure: true, sameSite: 'strict' })
  }

  get(key) {
    return this.cookies.get(key)
  }

  delete(key) {
    this.cookies.remove(key)
  }
}

export default SecureCookiesStorageFactory
