import { version } from '../package.json'
import LocalStorageFactory from './factories/local-storage'
import SecureCookiesStorageFactory from './factories/secure-cookies-storage'
import { resolveFetchMethod } from './utils/configFetch'

class Config {
  constructor(options) {
    const {
      name,
      application,
      client_id,
      client_secret,
      currency,
      language,
      host,
      storage,
      storage_type,
      custom_authenticator,
      headers,
      disableCart,
      reauth,
      protocol,
      store_id,
      retryDelay,
      retryJitter,
      fetchMaxAttempts,
      custom_fetch,
      throttleEnabled = false,
      throttleLimit = 3,
      throttleInterval = 125
    } = options

    this.name = name
    this.application = application
    this.client_id = client_id
    this.client_secret = client_secret
    this.store_id = store_id
    this.host = host || 'euwest.api.elasticpath.com'
    this.protocol = protocol || 'https'
    this.version = 'v2'
    this.currency = currency
    this.language = language

    this.auth = {
      expires: 3600,
      uri: 'oauth/access_token',
      fetch: resolveFetchMethod({
        custom_fetch,
        throttleEnabled,
        throttleLimit,
        throttleInterval
      })
    }
    this.sdk = {
      version,
      language: 'JS'
    }

    this.storage =
      storage ||
      (storage_type === 'cookies'
        ? new SecureCookiesStorageFactory()
        : new LocalStorageFactory())
    this.custom_authenticator = custom_authenticator
    this.headers = headers || {}
    this.disableCart = disableCart || false
    this.reauth = reauth || true
    this.retryDelay = retryDelay || 1000
    this.retryJitter = retryJitter || 500
    this.fetchMaxAttempts =
      fetchMaxAttempts !== undefined && fetchMaxAttempts !== null
        ? fetchMaxAttempts
        : 4
    this.throttleConfig = {
      throttleEnabled,
      throttleLimit,
      throttleInterval
    }
  }
}

export default Config
