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
  }
}

export interface SubscriptionOfferingRelationships {
  relationships?: {
    plans?: {
      data: {
        id: string
        type: 'subscription_offering_plan'
      }[]
      links: {
        related: string
      }
    }
    products?: {
      data: {
        id: string
        type: 'subscription_offering_product'
      }[]
      links: {
        related: string
      }
    }
    proration_policy?: {
      data: {
        id: string
        type: 'subscription_proration_policy'
      }
    }
  }

}

export interface SubscriptionOfferingBuildProduct {
  external_ref?: string
  name: string
  description?: string
  sku?: string
  main_image?: string
  price?: {
    [key: string]: {
      amount: number
      includes_tax?: boolean
    }
  }
  price_units?: {
    unit: "day" | "month"
    amount: number
  }
}
export interface SubscriptionOfferingBuildBody {
  name: string
  description: string
  products: string[] | SubscriptionOfferingBuildProduct[]
  plans: string[]
}

export interface SubscriptionOfferingAttachProductBody {
  products: string[]
}

export interface SubscriptionOfferingAttachPlanBody {
  plans: string[]
}

export interface SubscriptionOfferingAttachProrationPolicyBody {
  type: 'subscription_proration_policy'
  id: string
}

export interface SubscriptionOffering extends Identifiable, SubscriptionOfferingBase, SubscriptionOfferingRelationships {
  meta: {
    external_product_refs: string[]
    owner: string
    timestamps: {
      created_at: string
      updated_at: string
    }
  }
}
export type SubscriptionOfferingCreate = Omit<SubscriptionOfferingBase, 'attributes'> & {attributes: Partial<SubscriptionOfferingBase['attributes']>}
export type SubscriptionOfferingUpdate = Identifiable & Omit<SubscriptionOfferingBase, 'attributes'> & {attributes: Partial<SubscriptionOfferingBase['attributes']>}

type SubscriptionOfferingAttachmentsRelationships = {
  relationships: {
    origin: {
      data: {
        id: string,
        type: string
      }
    }
  }
}

export interface SubscriptionOfferingFilter {
  eq?: {
    "products.external_ref": string
  }
}

type SubscriptionOfferingPlanMeta = {
  meta: {
    active_plan?: boolean
    owner: string
    timestamps: {
      created_at: string
      updated_at: string
    }
  }
}

export type SubscriptionOfferingPlan = Omit<SubscriptionPlan, 'meta'> & SubscriptionOfferingAttachmentsRelationships & SubscriptionOfferingPlanMeta
export type SubscriptionOfferingProduct = SubscriptionProduct & SubscriptionOfferingAttachmentsRelationships
/**
 * Subscription Offering Endpoints
 * DOCS: TODO: add docs when ready
 */
export interface SubscriptionOfferingsEndpoint
  extends CrudQueryableResource<
    SubscriptionOffering,
    SubscriptionOfferingCreate,
    SubscriptionOfferingUpdate,
    SubscriptionOfferingFilter,
    never,
    never
    > {
  endpoint: 'offerings'

  Build(body: SubscriptionOfferingBuildBody): Promise<Resource<SubscriptionOffering>>

  GetAttachedProducts(id: string) : Promise<Resource<SubscriptionOfferingProduct[]>>

  GetAttachedPlans(id: string) : Promise<Resource<SubscriptionOfferingPlan[]>>

  AttachProducts(offeringId: string, body: SubscriptionOfferingAttachProductBody): Promise<Resource<SubscriptionProduct[]>>

  RemoveProduct(offeringId: string, productId: string): Promise<void>

  AttachPlans(offeringId: string, body: SubscriptionOfferingAttachPlanBody): Promise<Resource<SubscriptionPlan[]>>

  RemovePlan(offeringId: string, planId: string): Promise<void>

  AttachProrationPolicy(offeringId: string, body: SubscriptionOfferingAttachProrationPolicyBody | null): Promise<Resource<SubscriptionOfferingAttachProrationPolicyBody>>

  ReplaceProducts(offeringId: string, productIds: string[]): Promise<Resource<SubscriptionProduct[]>>
}
