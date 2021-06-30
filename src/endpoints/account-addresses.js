import { singularize } from 'inflected'

import BaseExtend from '../extends/base'

class AccountAddressesEndpoint extends BaseExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'account-addresses'
  }

  All({ account, token = null }) {
    return this.request.send(
      `accounts/${account}/${this.endpoint}`,
      'GET',
      undefined,
      token
    )
  }

  Get({ account, address, token = null }) {
    return this.request.send(
      `accounts/${account}/${this.endpoint}/${address}`,
      'GET',
      undefined,
      token
    )
  }

  Create({ account, body, token = null }) {
    return this.request.send(
      `accounts/${account}/${this.endpoint}`,
      'POST',
      { ...body, type: singularize(this.endpoint) },
      token
    )
  }

  Delete({ account, address, token = null }) {
    return this.request.send(
      `accounts/${account}/${this.endpoint}/${address}`,
      'DELETE',
      undefined,
      token
    )
  }

  Update({ account, address, body, token = null }) {
    return this.request.send(
      `accounts/${account}/${this.endpoint}/${address}`,
      'PUT',
      { ...body, type: singularize(this.endpoint) },
      token
    )
  }
}

export default AccountAddressesEndpoint
