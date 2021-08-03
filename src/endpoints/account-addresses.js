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
      this,
      true,
      null,
      token
        ? { 'EP-ACCOUNT-MANAGEMENT-AUTHENTICATION-TOKEN': token }
        : undefined
    )
  }

  Get({ account, address, token = null }) {
    return this.request.send(
      `accounts/${account}/${this.endpoint}/${address}`,
      'GET',
      undefined,
      undefined,
      this,
      true,
      null,
      token
        ? { 'EP-ACCOUNT-MANAGEMENT-AUTHENTICATION-TOKEN': token }
        : undefined
    )
  }

  Create({ account, body, token = null }) {
    return this.request.send(
      `accounts/${account}/${this.endpoint}`,
      'POST',
      { ...body, type: singularize(this.endpoint) },
      undefined,
      this,
      true,
      null,
      token
        ? { 'EP-ACCOUNT-MANAGEMENT-AUTHENTICATION-TOKEN': token }
        : undefined
    )
  }

  Delete({ account, address, token = null }) {
    return this.request.send(
      `accounts/${account}/${this.endpoint}/${address}`,
      'DELETE',
      undefined,
      undefined,
      this,
      true,
      null,
      token
        ? { 'EP-ACCOUNT-MANAGEMENT-AUTHENTICATION-TOKEN': token }
        : undefined
    )
  }

  Update({ account, address, body, token = null }) {
    return this.request.send(
      `accounts/${account}/${this.endpoint}/${address}`,
      'PUT',
      { ...body, type: singularize(this.endpoint) },
      undefined,
      this,
      true,
      null,
      token
        ? { 'EP-ACCOUNT-MANAGEMENT-AUTHENTICATION-TOKEN': token }
        : undefined
    )
  }
}

export default AccountAddressesEndpoint
