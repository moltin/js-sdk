import BaseExtend from '../extends/base'
import {resolveCurrencyStorageKey} from "../utils/helpers";

class CurrenciesEndpoint extends BaseExtend {
  constructor(config) {
    super(config)

    this.endpoint = 'currencies'
    this.storage = config.storage
  }

  Create(body) {
    return this.request.send(`${this.endpoint}`, 'POST', body)
  }

  Delete(id) {
    return this.request.send(`${this.endpoint}/${id}`, 'DELETE')
  }

  Update(id, body) {
    return this.request.send(`${this.endpoint}/${id}`, 'PUT', body)
  }

  Set(currency) {
    const { config, storage } = this
    const currencyStorageKey = resolveCurrencyStorageKey(config.name)
    storage.set(currencyStorageKey, currency)
    config.currency = currency

    const promise = new Promise((resolve, reject) => {
      const request = storage.get(currencyStorageKey)

      try {
        resolve(request)
      } catch (err) {
        reject(new Error(err))
      }
    })

    return promise
  }

  Active() {
    const { storage, config } = this

    const promise = new Promise((resolve, reject) => {
      const request = storage.get(resolveCurrencyStorageKey(config.name))

      try {
        resolve(request)
      } catch (err) {
        reject(new Error(err))
      }
    })

    return promise
  }
}

export default CurrenciesEndpoint
