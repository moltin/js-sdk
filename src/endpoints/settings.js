import RequestFactory from '../factories/request'

class Settings {
  constructor(config) {
    this.request = new RequestFactory(config)

    this.endpoint = 'settings'
  }

  All() {
    return this.request.send(this.endpoint, 'GET')
  }

  Update(body) {
    return this.request.send(this.endpoint, 'PUT', {
      type: 'settings',
      ...body
    })
  }

  Delete() {
    return this.request.send(this.endpoint, 'DELETE')
  }

  GetLogsTtl() {
    return this.request.send(`${this.endpoint}/logs-ttl`, 'GET')
  }

  UpdateLogsTtl(days) {
    return this.request.send(`${this.endpoint}/logs-ttl`, 'PUT', { days, type: 'time_to_live' });
  }

  Cart() {
    return this.request.send(`${this.endpoint}/cart`, 'GET')
  }

  UpdateCart(body) {
    return this.request.send(`${this.endpoint}/cart`, 'PUT', {
      type: 'settings',
      ...body
    })
  }
}

export default Settings
