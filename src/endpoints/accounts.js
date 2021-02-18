import CRUDExtend from '../extends/crud'

class AccountsEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)
    this.endpoint = 'accounts'
  }

  // TODO verify after MT-6474 (implement GET /v2/accounts) is done
  //
  // All(token = null, headers = {}) {
  //   const { includes, sort, limit, offset, filter } = this
  //
  //   this.call = this.request.send(
  //     buildURL(this.endpoint, {
  //       includes,
  //       sort,
  //       limit,
  //       offset,
  //       filter
  //     }),
  //     'GET',
  //     undefined,
  //     token,
  //     this,
  //     headers
  //   )
  //
  //   return this.call
  // }

  Create(body) {
    return this.request.send(this.endpoint, 'POST', body.data)
  }

  Get({ accountId, token = null }) {
    return this.request.send(
      `${this.endpoint}/${accountId}`,
      'GET',
      undefined,
      token
    )
  }

  Update(accountId, body, token = null) {
    return this.request.send(
      `${this.endpoint}/${accountId}`,
      'PUT',
      body.data,
      token
    )
  }
}

export default AccountsEndpoint
