import BaseExtend from '../extends/base'

import {
  buildCartItemData,
  buildCartCheckoutData,
  buildURL
} from '../utils/helpers'

class CartEndpoint extends BaseExtend {
  constructor(request, id) {
    super(...arguments)

    this.request = request
    this.cartId = id
    this.endpoint = 'carts'
  }

  Get() {
    return this.request.send(`${this.endpoint}/${this.cartId}`, 'GET')
  }

  Items() {
    const { includes, sort, limit, offset, filter } = this

    this.call = this.request.send(
      buildURL(`${this.endpoint}/${this.cartId}/items`, {
        includes,
        sort,
        limit,
        offset,
        filter
      }),
      'GET'
    )

    return this.call
  }

  AddProduct(productId, quantity = 1, data = {}) {
    const body = buildCartItemData(productId, quantity)

    return this.request.send(`${this.endpoint}/${this.cartId}/items`, 'POST', {
      ...body,
      ...data
    })
  }

  AddCustomItem(body) {
    const itemObject = Object.assign(body, {
      type: 'custom_item'
    })

    return this.request.send(
      `${this.endpoint}/${this.cartId}/items`,
      'POST',
      itemObject
    )
  }

  AddPromotion(code) {
    const body = buildCartItemData(code, null, 'promotion_item')

    return this.request.send(
      `${this.endpoint}/${this.cartId}/items`,
      'POST',
      body
    )
  }

  RemoveItem(itemId) {
    return this.request.send(
      `${this.endpoint}/${this.cartId}/items/${itemId}`,
      'DELETE'
    )
  }

  UpdateItemQuantity(itemId, quantity) {
    const body = buildCartItemData(itemId, quantity)

    return this.request.send(
      `${this.endpoint}/${this.cartId}/items/${itemId}`,
      'PUT',
      body
    )
  }

  AddItemTax(itemId, taxData) {
    const body = Object.assign(taxData, {
      type: 'tax_item'
    })

    return this.request.send(
      `${this.endpoint}/${this.cartId}/items/${itemId}/taxes`,
      'POST',
      body
    )
  }

  RemoveItemTax(itemId, taxItemId) {
    return this.request.send(
      `${this.endpoint}/${this.cartId}/items/${itemId}/taxes/${taxItemId}`,
      'DELETE'
    )
  }

  UpdateItem(itemId, quantity, data = {}) {
    const body = buildCartItemData(itemId, quantity)

    return this.request.send(
      `${this.endpoint}/${this.cartId}/items/${itemId}`,
      'PUT',
      { ...body, ...data }
    )
  }

  Checkout(customer, billing_address, shipping_address = billing_address) {
    const body = buildCartCheckoutData(
      customer,
      billing_address,
      shipping_address
    )

    return this.request.send(
      `${this.endpoint}/${this.cartId}/checkout`,
      'POST',
      body
    )
  }

  Delete() {
    return this.request.send(`${this.endpoint}/${this.cartId}`, 'DELETE')
  }
}

export default CartEndpoint
