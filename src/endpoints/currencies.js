import BaseExtend from '../extends/base'

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

    storage.set('mcurrency', currency)
    config.currency = currency

    const promise = new Promise((resolve, reject) => {
      const request = storage.get('mcurrency')

      try {
        resolve(request)
      } catch (err) {
        reject(new Error(err))
      }
    })

    return promise
  }

  Active() {
    const { storage } = this

    const promise = new Promise((resolve, reject) => {
      const request = storage.get('mcurrency')

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
