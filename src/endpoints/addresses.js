import { singularize } from 'inflected'

import BaseExtend from '../extends/base'

class AddressesEndpoint extends BaseExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'addresses'
  }

  All({ customer, token = null }) {
    return this.request.send(
      `customers/${customer}/${this.endpoint}`,
      'GET',
      undefined,
      token
    )
  }

  Get({ customer, address, token = null }) {
    return this.request.send(
      `customers/${customer}/${this.endpoint}/${address}`,
      'GET',
      undefined,
      token
    )
  }

  Create({ customer, body, token = null }) {
    return this.request.send(
      `customers/${customer}/${this.endpoint}`,
      'POST',
      { ...body, type: singularize(this.endpoint) },
      token
    )
  }

  Delete({ customer, address, token = null }) {
    return this.request.send(
      `customers/${customer}/${this.endpoint}/${address}`,
      'DELETE',
      undefined,
      token
    )
  }

  Update({ customer, address, body, token = null }) {
    return this.request.send(
      `customers/${customer}/${this.endpoint}/${address}`,
      'PUT',
      { ...body, type: singularize(this.endpoint) },
      token
    )
  }
}

export default AddressesEndpoint
