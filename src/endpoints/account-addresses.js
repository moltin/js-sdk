import { singularize } from 'inflected'

import BaseExtend from '../extends/base'

class AccountAddressesEndpoint extends BaseExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'addresses'
  }

  All({ account, token = null }) {
    return this.request.send(
      `accounts/${account}/${this.endpoint}`,
      'GET',
      undefined,
      undefined,
      token
    )
  }

  Get({ account, address, token = null }) {
    return this.request.send(
      `accounts/${account}/${this.endpoint}/${address}`,
      'GET',
      undefined,
      undefined,
      token
    )
  }

  Create({ account, body, token = null }) {
    return this.request.send(
      `accounts/${account}/${this.endpoint}`,
      'POST',
      { ...body, type: singularize(this.endpoint) },
      undefined,
      token
    )
  }

  Delete({ account, address, token = null }) {
    return this.request.send(
      `accounts/${account}/${this.endpoint}/${address}`,
      'DELETE',
      undefined,
      undefined,
      token
    )
  }

  Update({ account, address, body, token = null }) {
    return this.request.send(
      `accounts/${account}/${this.endpoint}/${address}`,
      'PUT',
      { ...body, type: singularize(this.endpoint) },
      undefined,
      token
    )
  }
}

export default AccountAddressesEndpoint
