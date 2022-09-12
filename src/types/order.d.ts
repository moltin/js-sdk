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
  RelationshipToMany,
  Subset
} from './core'
import { FormattedPrice, Price } from './price'
import { ProductComponents } from './pcm'
import { XOR } from './util'

export interface OrderAddressBase {
  first_name: string
  last_name: string
  company_name?: string
  line_1: string
  line_2?: string
  city?: string
  postcode: string
  county?: string
  country: string
  region: string
}

export interface OrderShippingAddress extends OrderAddressBase {
  phone_number?: string
  instructions?: string
}

export interface OrderBillingAddress extends OrderAddressBase {}

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
  anonymized: boolean
  customer: {
    name: string
    email: string
  }
  contact?: {
    name: string
    email: string
  }
  shipping_address: OrderShippingAddress
  billing_address: OrderBillingAddress
}

export interface Order extends Identifiable, OrderBase {
  meta: {
    display_price: {
      authorized: FormattedPrice
      balance_owing: FormattedPrice
      paid: FormattedPrice
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
    items?: RelationshipToMany<'item'>
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
  components?: ProductComponents
  catalog_source?: 'pim'
}

export type PurchasePaymentMethod = 'purchase'
export type AuthorizePaymentMethod = 'authorize'
export type CapturePaymentMethod = 'capture'
export type RefundPaymentMethod = 'refund'

export type PaymentMethod =
  | PurchasePaymentMethod
  | AuthorizePaymentMethod
  | CapturePaymentMethod
  | RefundPaymentMethod

interface PaymentBase {
  payment: string
}

export interface AdyenPayment extends PaymentBase {
  method: PurchasePaymentMethod | AuthorizePaymentMethod | CapturePaymentMethod
  gateway: 'adyen'
  options: {
    shopper_reference: string
    recurring_processing_model?: string
  }
}

export interface AuthorizeNetPayment extends PaymentBase {
  method: PurchasePaymentMethod | AuthorizePaymentMethod | CapturePaymentMethod
  gateway: 'authorize_net'
  options: {
    customer_payment_profile_id: string
  }
}

/** Braintree Payment **/

type BraintreePaymentOptions = XOR<
  { payment_method_nonce: true },
  { payment_method_token: true }
> & {
  custom_fields?: Record<string, string>
}

export interface BraintreePayment extends PaymentBase {
  method: PurchasePaymentMethod | AuthorizePaymentMethod
  gateway: 'braintree'
  options?: BraintreePaymentOptions
}

export interface CardConnectPayment extends PaymentBase {
  method:
    | PurchasePaymentMethod
    | AuthorizePaymentMethod
    | CapturePaymentMethod
    | RefundPaymentMethod
  gateway: 'card_connect'
}

export interface CyberSourcePayment extends PaymentBase {
  method: PurchasePaymentMethod | AuthorizePaymentMethod
  gateway: 'cyber_source'
  options?: Record<string, string>
}

export interface PayPalExpressCheckoutPayment extends PaymentBase {
  method: PurchasePaymentMethod | AuthorizePaymentMethod
  gateway: 'paypal_express_checkout'
  options?: {
    description?: string
    soft_descriptor?: string
    application_context?: {
      return_url?: string
      cancel_url?: string
      shipping_preference?: string
      landing_page?: 'LOGIN' | 'BILLING' | 'NO_PREFERENCE'
      locale?: string
      brand_name?: string
    }
  }
}

/**
 * Stripe Payments
 */

export type StripePaymentOptionBase = {
  idempotency_key?: string
  receipt_email?: string
  customer?: string
}

export interface StripePaymentBase extends PaymentBase {
  amount?: number
  options?: StripePaymentOptionBase
}

export interface StripePayment extends StripePaymentBase {
  method: PurchasePaymentMethod | AuthorizePaymentMethod | CapturePaymentMethod
  gateway: 'stripe'
  options?: StripePaymentOptionBase & {
    destination?: string
  }
}

export interface StripeConnectPayment extends StripePaymentBase {
  method: PurchasePaymentMethod | AuthorizePaymentMethod
  gateway: 'stripe_connect'
}

export interface StripeIntentsPayment extends StripePaymentBase {
  method: PurchasePaymentMethod | AuthorizePaymentMethod
  gateway: 'stripe_payment_intents'
}

export interface ElasticPathStripePayment extends StripePaymentBase {
  method: PurchasePaymentMethod | AuthorizePaymentMethod
  gateway: 'elastic_path_payments_stripe'
}

/**
 * Manual Payments
 */

export interface ManualPayment extends PaymentBase {
  method: PurchasePaymentMethod | AuthorizePaymentMethod
  gateway: 'manual'
  amount?: number
  paymentmethod_meta?: {
    name?: string
    custom_reference?: string
  }
}

export type PaymentRequestBody =
  | ManualPayment
  | ElasticPathStripePayment
  | StripeIntentsPayment
  | StripeConnectPayment
  | StripePayment
  | PayPalExpressCheckoutPayment
  | CyberSourcePayment
  | CardConnectPayment
  | BraintreePayment
  | AuthorizeNetPayment
  | AdyenPayment

export interface ConfirmPaymentBody {
  method: string
  gateway: string
  payment: string
  options?: {
    customer?: string
    idempotency_key?: string
    receipt_email?: string
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

export type OrderSortAscend =
  | 'created_at'
  | 'payment'
  | 'shipping'
  | 'status'
  | 'with_tax'
export type OrderSortDescend =
  | '-created_at'
  | '-payment'
  | '-shipping'
  | '-status'
  | '-with_tax'
export type OrderSort = OrderSortAscend | OrderSortDescend

export type OrderInclude =
  | 'product'
  | 'customer'
  | 'items'
  | 'account'
  | 'account_member'

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
  Payment(id: string, body: PaymentRequestBody): Promise<ConfirmPaymentResponse>

  /**
   * Update an Order
   * Description: You can only update custom data, shipping and shipping_address on orders. Everything else inside the order object is immutable.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/orders/update-an-order.html
   * @param id
   * @param body
   * @constructor
   */
  Update(id: string, body: Subset<OrderBase>): Promise<Resource<Order>>

  /**
   * anonymize an Order
   * Description: Anonymize order with the list of the ids.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api
   */
  anonymize(ids: AnonymizeOrder): Promise<AnonymizeOrderResponse>
}
