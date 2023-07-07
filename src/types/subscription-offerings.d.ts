/**
 * Subscription Offerings
 * Description: Subscription Offerings.
 * DOCS: TODO: add docs when ready
 */
import {
  Identifiable,
  CrudQueryableResource, Resource
} from './core'
import { SubscriptionProduct } from './subscription-products'
import { SubscriptionPlan } from './subscription-plans'

/**
 * Core Subscription Offering Base Interface
 * For custom flows, extend this interface
 * DOCS: TODO: add docs when ready
 */
export interface SubscriptionOfferingBase {
  type: string
  attributes: {
    name: string
    description: string
    created_at: string
    updated_at: string
  },
  relationships?: {
    [key: string]: {
      links?: {
        related?: string
        self?: string
      },
      data?: {
        type?: string
        id?: string
      }
    }
  }
}

export interface SubscriptionOfferingBuildBody {
  name: string
  description: string
  products: string[]
  plans: string[]
}

export interface SubscriptionOffering extends Identifiable, SubscriptionOfferingBase {

}
export type SubscriptionOfferingCreate = Omit<SubscriptionOfferingBase, 'attributes'> & {attributes: Partial<SubscriptionOfferingBase['attributes']>}
export type SubscriptionOfferingUpdate = Omit<SubscriptionOffering, 'attributes'> & {attributes: Partial<SubscriptionOfferingBase['attributes']>}

/**
 * Subscription Offering Endpoints
 * DOCS: TODO: add docs when ready
 */
export interface SubscriptionOfferingsEndpoint
  extends CrudQueryableResource<
    SubscriptionOffering,
    SubscriptionOfferingCreate,
    SubscriptionOfferingUpdate,
    never,
    never,
    never
    > {
  endpoint: 'offerings'

  Build(body: SubscriptionOfferingBuildBody): Promise<Resource<SubscriptionOffering>>

  GetAttachedProducts(id: string) : Promise<Resource<SubscriptionProduct[]>>

  GetAttachedPlans(id: string) : Promise<Resource<SubscriptionPlan[]>>
}
