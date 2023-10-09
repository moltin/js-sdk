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
    created_at: string
    description: string
    main_image?: string | null
    name: string
    sku: string
    updated_at: string
    price: {
      [key: string]: {
        amount: number
        includes_tax?: boolean
      }
    }
  },
}

export interface SubscriptionProduct extends Identifiable, SubscriptionProductBase {

}
export type SubscriptionProductCreate = Omit<SubscriptionProductBase, 'attributes'> & {attributes: Partial<SubscriptionProductBase['attributes']>}
export type SubscriptionProductUpdate = Omit<SubscriptionProduct, 'attributes'> & {attributes: Partial<SubscriptionProductBase['attributes']>}

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
