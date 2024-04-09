/**
 * Subscription Products
 * Description: Subscription Products.
 * DOCS: TODO: add docs when ready
 */
import {
  Identifiable,
  CrudQueryableResource
} from './core'

/**
 * Core Subscription Product Base Interface
 * For custom flows, extend this interface
 * DOCS: TODO: add docs when ready
 */
export interface SubscriptionProductBase {
  type: string
  attributes: {
    description: string
    main_image?: string | null
    name: string
    sku: string
    price: {
      [key: string]: {
        amount: number
        includes_tax?: boolean
      }
    }
    price_units?: {
      unit: 'day' | 'month'
      amount: number
    } | null
  },
}

export interface SubscriptionProduct extends Identifiable, SubscriptionProductBase {
  meta: {
    display_price: {
      without_tax: {
        amount: number
        currency: string
        formatted: string
      }
    },
    owner: string
    timestamps: {
      created_at: string
      updated_at: string
    }
  }
}
export type SubscriptionProductCreate = Omit<SubscriptionProductBase, 'attributes'> & {attributes: Partial<SubscriptionProductBase['attributes']>}
export type SubscriptionProductUpdate = Identifiable & Omit<SubscriptionProductBase, 'attributes'> & {attributes: Partial<SubscriptionProductBase['attributes']>}

/**
 * Subscription Product Endpoints
 * DOCS: TODO: add docs when ready
 */
export interface SubscriptionProductsEndpoint
  extends CrudQueryableResource<
    SubscriptionProduct,
    SubscriptionProductCreate,
    SubscriptionProductUpdate,
    never,
    never,
    never
    > {
  endpoint: 'products'
}
