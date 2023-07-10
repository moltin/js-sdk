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
    const { includes } = this

    return this.request.send(
      buildURL(`${this.endpoint}/${this.cartId}`, {
        includes
      }),
      'GET'
    )
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

  AllShippingGroupsCart() {
    return this.request.send(`${this.endpoint}/${this.cartId}/shipping-groups`, 'GET')
  }

  GetCartShippingGroup(shippingGroupId) {
    return this.request.send(`${this.endpoint}/${this.cartId}/shipping-groups/${shippingGroupId}`, 'GET')
  }

  CreateShippingGroup(body){
    const shippingObject = Object.assign(body, {
      type: 'shipping-type'
    })

    return this.request.send(
      `${this.endpoint}/${this.cartId}/shipping-groups`,
      'POST',
      shippingObject
    )
  }

  AddProduct(
    productId,
    quantity = 1,
    data = {},
    isSku = false,
    token = null,
    additionalHeaders = {}
  ) {
    const body = buildCartItemData(productId, quantity, 'cart_item', {}, isSku)

    return this.request.send(
      `${this.endpoint}/${this.cartId}/items`,
      'POST',
      {
        ...body,
        ...data
      },
      token,
      null,
      true,
      null,
      additionalHeaders
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

  AddPromotion(code, token = null) {
    const body = buildCartItemData(code, null, 'promotion_item')

    return this.request.send(
      `${this.endpoint}/${this.cartId}/items`,
      'POST',
      body,
      token
    )
  }

  BulkAdd(body, options) {
    return this.request.send(`${this.endpoint}/${this.cartId}/items`, 'POST', {
      data: body,
      ...(options && { options })
    })
  }

  CreateCart(cartData, token) {
    return this.request.send(`${this.endpoint}`, 'POST', cartData, token)
  }

  UpdateCart(cartData, token) {
    return this.request.send(
      `${this.endpoint}/${this.cartId}`,
      'PUT',
      cartData,
      token
    )
  }

  GetCartsList(token) {
    return this.request.send(`${this.endpoint}`, 'GET', undefined, token)
  }

  AddCustomerAssociation(customerId, token) {
    const body = [
      {
        type: 'customer',
        id: customerId
      }
    ]
    return this.request.send(
      `${this.endpoint}/${this.cartId}/relationships/customers`,
      'POST',
      body,
      token
    )
  }

  RemoveItem(itemId) {
    return this.request.send(
      `${this.endpoint}/${this.cartId}/items/${itemId}`,
      'DELETE'
    )
  }

  RemoveAllItems() {
    return this.request.send(`${this.endpoint}/${this.cartId}/items`, 'DELETE')
  }

  UpdateItem(itemId, quantity, data = {}, additionalHeaders = {}) {
    const body = buildCartItemData(itemId, quantity)

    return this.request.send(
      `${this.endpoint}/${this.cartId}/items/${itemId}`,
      'PUT',
      { ...body, ...data },
      null,
      null,
      true,
      null,
      additionalHeaders
    )
  }

  UpdateItems(items) {
    const body = items.map(({ id, quantity, type, ...rest }) =>
      buildCartItemData(id, quantity, type, rest)
    )

    return this.request.send(
      `${this.endpoint}/${this.cartId}/items`,
      'PUT',
      body
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

  BulkAddItemTax(body, options) {
    return this.request.send(`${this.endpoint}/${this.cartId}/taxes`, 'POST', {
      data: body,
      ...(options && { options })
    })
  }

  UpdateItemTax(itemId, taxItemId, taxData) {
    const body = Object.assign(taxData, {
      type: 'tax_item'
    })

    return this.request.send(
      `${this.endpoint}/${this.cartId}/items/${itemId}/taxes/${taxItemId}`,
      'PUT',
      body
    )
  }

  RemoveItemTax(itemId, taxItemId) {
    return this.request.send(
      `${this.endpoint}/${this.cartId}/items/${itemId}/taxes/${taxItemId}`,
      'DELETE'
    )
  }

  Checkout(
    customer,
    billing_address,
    shipping_address = billing_address,
    additionalHeaders = {}
  ) {
    const body = buildCartCheckoutData(
      customer,
      billing_address,
      shipping_address
    )

    return this.request.send(
      `${this.endpoint}/${this.cartId}/checkout`,
      'POST',
      body,
      null,
      null,
      true,
      null,
      additionalHeaders
    )
  }

  Merge(cartId, token, options = {}) {
    const body = {
      type: 'cart_items',
      cart_id: `${cartId}`
    }

    return this.request.send(
      `${this.endpoint}/${this.cartId}/items`,
      'POST',
      {
        data: body,
        ...(options && { options })
      },
      token
    )
  }

  Delete() {
    return this.request.send(`${this.endpoint}/${this.cartId}`, 'DELETE')
  }
}

export default CartEndpoint
