/**
 * Orders
 * Description: An Order is created via the checkout endpoint within the Carts API.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/orders/index.html
 */
import {
  Identifiable,
  Relationship,
  ResourcePage,
  QueryableResource,
  Resource,
  RelationshipToMany
} from './core'
import { AddressBase } from './address'
import { FormattedPrice, Price } from './price'

/**
 * Core Object Base Interface
 * For custom flows, extend this interface
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/orders/index.html
 */
export interface OrderBase {
  type: string
  status: string
  payment: string
  shipping?: string
  customer: {
    name: string
    email: string
  }
  contact?: {
    name: string
    email: string
  }
  shipping_address: AddressBase
  billing_address: AddressBase
}

export interface Order extends Identifiable, OrderBase {
  meta: {
    display_price: {
      with_tax: FormattedPrice
      without_tax: FormattedPrice
      tax: FormattedPrice
    }
    timestamps: {
      created_at: string
      updated_at: string
    }
  }
  relationships?: {
    items?: RelationshipToMany<'product'>
    customer?: Relationship<'customer'>
    account?: Relationship<'account'>
    account_member?: Relationship<'account_member'>
  }
}

/**
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/orders/filtering.html
 */
export interface OrderFilter {
  eq?: {
    status?: string
    payment?: string
    shipping?: string
    name?: string
    email?: string
    customer_id?: string
    account_id?: string
    account_member_id?: string
    shipping_name?: string
    shipping_postcode?: string
    billing_name?: string
    billing_postcode?: string
    currency?: string
    product_id?: string
    product_sku?: string
    created_at?: number | string
    updated_at?: number | string
  }
  like?: {
    name?: string
    email?: string
    customer_id?: string
    shipping_name?: string
    shipping_postcode?: string
    billing_name?: string
    billing_postcode?: string
    account_id?: string
    account_member_id?: string
  }
  ge?: {
    with_tax?: number
    without_tax?: number
    created_at?: number | string
  }
  lt?: {
    with_tax?: number
    without_tax?: number
    created_at?: number | string
    updated_at?: number | string
  }
  le?: {
    with_tax?: number
    without_tax?: number
    created_at?: number | string
    updated_at?: number | string
  }
}

/**
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/orders/order-items.html
 */
export interface OrderItemBase {
  type: string
  product_id: string
  name: string
  sku: string
  quantity: number
  unit_price: Price
  value: Price
}

export interface OrderItem extends Identifiable, OrderItemBase {
  links: any
  meta?: {
    display_price?: {
      with_tax?: {
        unit: FormattedPrice
        value: FormattedPrice
      }
      without_tax?: {
        unit: FormattedPrice
        value: FormattedPrice
      }
      tax?: {
        unit: FormattedPrice
        value: FormattedPrice
      }
      discount?: {
        unit: FormattedPrice
        value: FormattedPrice
      }
    }
    timestamps?: {
      created_at: string
      updated_at: string
    }
  }
  relationships?: {
    cart_item: Relationship<'cart_item'>
    taxes: Relationship<'taxes'>[]
  }
  discounts?: [
    {
      amount: {
        amount: number
        currency: string
        includes_tax: string
      }
      code: string
    }
  ]
}

export interface ConfirmPaymentBody {
  method: string
  gateway: string
  payment: string
  options?: {
    customer: string
    idempotency_key: string
    receipt_email: string
  }
}

export interface ConfirmPaymentResponse {
  data: {
    id: string
    type: string
    reference: string
    gateway: string
    amount: number
    currency: string
    transaction_type: string
    status: string
    payment_intent: {
      client_secret: string
      status: string
    }
    relationships: {
      order: {
        data: {
          type: string
          id: string
        }
      }
    }
    meta: {
      display_price: {
        amount: number
        currency: string
        formatted: string
      }
      timestamps: {
        created_at: string
        updated_at: string
      }
    }
  }
}

export interface AnonymizeOrder {
  order_ids: string[]
}

export interface AnonymizeOrderResponse {
  data
  errors: [
    {
      detail: string
      status: number
      title: string
      meta: {
        order_id: string
      }
    }
  ]
}

type OrderSortAscend = 'created_at' | 'payment' | 'shipping' | 'status' | 'with_tax'
type OrderSortDescend = '-created_at' | '-payment' | '-shipping' | '-status' | '-with_tax'
type OrderSort = OrderSortAscend | OrderSortDescend

type OrderInclude = 'product' | 'customer' | 'items' | 'account' | 'account_member'

/**
 * Orders Endpoints
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/orders/index.html
 * Get DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/orders/get-an-order.html
 * Get All DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/orders/get-all-orders.html
 * Update DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/orders/update-an-order.html
 */
export interface OrdersEndpoint
  extends QueryableResource<Order, OrderFilter, OrderSort, OrderInclude> {
  endpoint: 'orders'

  /**
   * Get Order Items
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/orders/order-items.html
   * @param id - The ID of the order
   */
  Items(id: string): Promise<ResourcePage<OrderItem>>

  /**
   * Confirm payment intent
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/payments/transactions.html#post-confirm-payment-intent
   * @param orderId - The ID of the order.
   * @param transactionId - The ID of the transaction you want to confirm.
   * @param body - The body of the order.
   */
  Confirm(
    orderId: string,
    transactionId: string,
    body: ConfirmPaymentBody
  ): Promise<ConfirmPaymentResponse>

  /**
   * Payment
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/payments/transactions.html#post-authorize-payment
   * @param id - The UUID of the order that you want to authorize payment for.
   * @param body - The body of the order
   */
  Payment(id: string, body: ConfirmPaymentBody): Promise<ConfirmPaymentResponse>

  /**
   * Update an Order
   * Description: You can only update custom data, shipping and shipping_address on orders. Everything else inside the order object is immutable.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/orders/update-an-order.html
   * @param id
   * @param body
   * @constructor
   */
  Update(id: string, body: Partial<OrderBase>): Promise<Resource<Order>>
  
/**
   * anonymize an Order
   * Description: Anonymize order with the list of the ids.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api
   * @param id
   * @param body
   * @constructor
   */

  anonymize(ids: AnonymizeOrder): Promise<AnonymizeOrderResponse>

}