import RequestFactory from '../factories/request'

class MerchantRealmMappings {
  constructor(config) {
    this.request = new RequestFactory(config)

    this.endpoint = 'merchant-realm-mappings'
  }

  All(token = null) {
    this.call = this.request.send(this.endpoint, 'GET', undefined, token, this)

    return this.call
  }

  Update(id, body, token = null) {
    return this.request.send(
      `${this.endpoint}/${id}`,
      'PUT',
      {
        ...body,
        type: this.endpoint
      },
      token
    )
  }
}

export default MerchantRealmMappings
