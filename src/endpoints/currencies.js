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

  async Set(currency) {
    const { config, storage } = this

    await storage.set('mcurrency', currency)

    config.currency = currency

    return storage.get('mcurrency')
  }

  Active() {
    const { storage } = this

    return storage.get('mcurrency')
  }
}

export default CurrenciesEndpoint
