/**
 * Orders
 * Description: An Order is created via the checkout endpoint within the Carts API.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/orders/index.html
 */
import { core, Relationship, ResourcePage } from './core'

export as namespace order

export namespace order {
  /**
   * Core Object Base Interface
   * For custom flows, extend this interface
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/orders/index.html
   */
  export interface OrderBase {
    id?: string
    type: string
    status: string
    payment: string
    shipping: string
    customer: {
      name: string
      email: string
    }
    shipping_address: {
      first_name: string
      last_name: string
      phone_number: string
      company_name: string
      line_1: string
      line_2: string
      city: string
      postcode: string
      county: string
      country: string
      instructions: string
    }
    billing_address: {
      first_name: string
      last_name: string
      company_name: string
      line_1: string
      line_2: string
      city: string
      postcode: string
      county: string
      country: string
    }
    meta?: {
      display_price: {
        with_tax: {
          amount: number
          currency: string
          formatted: string
        }
        without_tax: {
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
    relationships?: {
      main_image?: Relationship<'product'> []
      categories?: Relationship<'customer'>
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
      customer?: {
        name?: string
        email?: string
      }
      customer_id?: string
      shipping_name?: string
      shipping_postcode?: string
      billing_name?: string
      billing_postcode?: string
      currency?: string
      product_id?: string
      product_sku?: string
      created_at?: Date
      updated_at?: Date
    }
    like?: {
      customer?: {
        name?: string
        email?: string
      }
      customer_id?: string
      shipping_name?: string
      shipping_postcode?: string
      billing_name?: string
      billing_postcode?: string
    },
    ge?: {
      with_tax?: number
      without_tax?: number
    },
    lt?: {
      with_tax?: number
      without_tax?: number
      created_at?: Date
      updated_at?: Date
    },
    le?: {
      with_tax?: number
      without_tax?: number
      created_at?: Date
      updated_at?: Date
    }
  }

  /**
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/orders/order-items.html
   */
  export interface OrderItems {
    id: string
    type: string
    product_id: string
    name: string
    sku: string
    quantity: number
    unit_price: {
      amount: number
      currency: string
      includes_tax: boolean
    }
    value: {
      amount: number
      currency: string
      includes_tax: boolean
    }
    links: any
    meta?: {
      display_price?: {
        with_tax: {
          unit: {
            amount: number
            currency: string
            formatted: string
          }
          value: {
            amount: number
            currency: string
            formatted: string
          }
        }
        without_tax?: {
          unit: {
            amount: number
            currency: string
            formatted: string
          }
          value: {
            amount: number
            currency: string
            formatted: string
          }
        }
        tax?: {
          unit: {
            amount: number
            currency: string
            formatted: string
          }
          value: {
            amount: number
            currency: string
            formatted: string
          }
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
  }

  type OrderSort = 'created_at' | 'payment' | 'shipping' | 'status' | 'with_tax'
  type OrderInclude = 'product' | 'customer'

  /**
   * Orders Endpoints
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/orders/index.html
   * Get DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/orders/get-an-order.html
   * Get All DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/orders/get-all-orders.html
   * Update DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/orders/update-an-order.html
   */
  export interface OrdersEndpoint extends core.QueryableResource<OrderBase, OrderFilter, OrderSort, OrderInclude> {
    endpoint: 'orders'

    /**
     * Get Order Items
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/orders/order-items.html
     * @param id - The ID of the order
     */
    Items<T>(id: string): Promise<ResourcePage<OrderItems | T>>

    //TODO: Docs ref?
    Payment<RequestBody = any, ResponseBody = any>(
      id: string,
      body: RequestBody
    ): Promise<ResponseBody>

    /**
     * Update an Order
     * Description: You can only update custom data, shipping and shipping_address on orders. Everything else inside the order object is immutable.
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/orders/update-an-order.html
     * @param id
     * @param body
     * @constructor
     */
    Update<RequestBody = any, ResponseBody = any>(
      id: string,
      body: RequestBody
    ): Promise<ResponseBody>
  }
}