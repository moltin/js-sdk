import BaseExtend from '../extends/base'

import {
  buildURL
} from '../utils/helpers'

class OrdersEndpoint extends BaseExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'orders'
  }

  Items(orderId) {
    return this.request.send(`${this.endpoint}/${orderId}/items`, 'GET')
  }

  AllShippingGroups(orderId) {
    return this.request.send(`${this.endpoint}/${orderId}/shipping-groups`, 'GET')
  }

  GetShippingGroup(orderId, shippingGroupId) {
    const { includes } = this
    return this.request.send(
      buildURL(`${this.endpoint}/${orderId}/shipping-groups/${shippingGroupId}`, {
        includes
      }),
      'GET'
    )
  }

  Payment(orderId, body) {
    return this.request.send(`${this.endpoint}/${orderId}/payments`, 'POST', {
      data: body,
    }, null, null, false)
  }

  Confirm(orderId, transactionId, body) {
    return this.request.send(
      `${this.endpoint}/${orderId}/transactions/${transactionId}/confirm`,
      'POST',
      body
    )
  }

  Transactions(orderId) {
    /* eslint-disable no-console */
    console.warn(
      `DeprecationWarning: 'Order.Transactions(id)' will soon be deprecated. It's recommended you use Transactions class directly to get all, capture and refund transactions.`
    )
    return this.request.send(`${this.endpoint}/${orderId}/transactions`, 'GET')
  }

  Update(orderId, body) {
    return this.request.send(`${this.endpoint}/${orderId}`, 'PUT', {
      ...body,
      type: 'order'
    })
  }

  anonymize(ids) {
    return this.request.send(`${this.endpoint}/anonymize`, 'POST', ids)
  }
}

export default OrdersEndpoint
