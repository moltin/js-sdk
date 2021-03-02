import BaseExtend from '../extends/base'

class TransactionsEndpoint extends BaseExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'transactions'
  }

  All({ order }) {
    return this.request.send(`orders/${order}/${this.endpoint}`, 'GET')
  }

  Get({ order, transaction }, token = null) {
    return this.request.send(
      `orders/${order}/${this.endpoint}/${transaction}`,
      'GET',
      undefined,
      token
    )
  }

  Capture({ order, transaction }) {
    return this.request.send(
      `orders/${order}/${this.endpoint}/${transaction}/capture`,
      'POST'
    )
  }

  Refund({ order, transaction }, body) {
    return this.request.send(
      `orders/${order}/${this.endpoint}/${transaction}/refund`,
      'POST',
      body
    )
  }
}

export default TransactionsEndpoint
