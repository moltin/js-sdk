import BaseExtend from '../extends/base'

class OrdersEndpoint extends BaseExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'orders'
  }

  Items(id) {
    return this.request.send(`${this.endpoint}/${id}/items`, 'GET')
  }

  Payment(id, body) {
    return this.request.send(`${this.endpoint}/${id}/payments`, 'POST', body)
  }

  Transactions(id) {
    console.warn(
      `DeprecationWarning: 'Order.Transactions(id)' will soon be deprecated. It's recommended you use Transactions class directly to get all, capture and refund transactions.`
    )
    return this.request.send(`${this.endpoint}/${id}/transactions`, 'GET')
  }

  Update(id, body) {
    return this.request.send(`${this.endpoint}/${id}`, 'PUT', {
      ...body,
      type: 'order'
    })
  }
}

export default OrdersEndpoint
