import BaseExtend from '../extends/base'

import { buildCartItemData, buildCartCheckoutData } from '../utils/helpers'

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
    return this.request.send(`${this.endpoint}/${this.cartId}/items`, 'GET')
  }

  AddProduct(productId, quantity = 1) {
    const body = buildCartItemData(productId, quantity)

    return this.request.send(
      `${this.endpoint}/${this.cartId}/items`,
      'POST',
      body
    )
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
