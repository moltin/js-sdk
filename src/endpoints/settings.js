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
}

export default Settings
