import Cookies from 'js-cookie'

class SecureCookiesStorageFactory {
  constructor() {
    this.cookies = Cookies
  }

  set(key, value) {
    this.cookies.set(key, value, { secure: true, sameSite: 'strict' })
  }

  get(key) {
    const response = this.cookies.get(key)
    return response === undefined ? null : response
  }

  delete(key) {
    return this.cookies.remove(key)
  }
}

export default SecureCookiesStorageFactory
