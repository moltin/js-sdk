/**
 * Subscriptions
 * Description: Subscriptions.
 * DOCS: TODO: add docs when ready
 */
import {
  Identifiable,
  CrudQueryableResource,
  Resource,
  ResourcePage
} from './core'
import { SubscriptionOfferingPlan, SubscriptionOfferingProduct } from './subscription-offerings'

/**
 * Core Subscription Base Interface
 * For custom flows, extend this interface
 * DOCS: TODO: add docs when ready
 */
export interface SubscriptionBase {
  type: "subscription"
  attributes: {
    external_ref?: string
    account_id: string
    offering: {
      id: string
      type: "subscription_offering"
      attributes: {
        external_ref?: string
        name: string
        description: string
      }
      meta: {
        owner: string
        timestamps: {
          updated_at: string
          created_at: string
          canceled_at: string | null
        }
      }
    }
    plan_id: string
    currency: string
  }
}

export interface SubscriptionCreate {
  account_id: string,
  offering_id: string,
  plan_id: string,
  currency: string,
  meta?: {
    owner?: string
  }
}

export interface SubscriptionInvoice extends Identifiable {
  type: "subscription-invoice",
  attributes: {
    billing_period: {
      start: string,
      end: string
    },
    invoice_items:       {
      description: string,
      price: {
        currency: string,
        amount: number,
        includes_tax: boolean
      }
    }[],
    outstanding: boolean,
    updated_at: string,
    created_at: string
  },
  meta: {
    owner: string,
    subscription_id: string,
    price: {
      currency: string,
      amount: number,
      includes_tax: boolean
    }
  }
}

export interface SubscriptionFilter {
  eq?: {
    account_id?: string
  }
}


export interface Subscription extends Identifiable, SubscriptionBase {
  relationships: {
    subscriber: {
      data: {
        id: string
        type: 'subscription_subscriber'
      }
    }
  }
  meta: {
    owner: string
    status: 'active' | 'inactive'
    canceled: boolean
    timestamps: {
      updated_at: string
      created_at: string
      canceled_at: string | null
    }
  }
}

export type SubscriptionsInclude = 'plans'

export interface SubscriptionsIncluded {
  plans: SubscriptionOfferingPlan[]
}

/**
 * Subscription Endpoints
 * DOCS: TODO: add docs when ready
 */
export interface SubscriptionsEndpoint
  extends Omit<CrudQueryableResource<
    Subscription,
    SubscriptionCreate,
    never,
    SubscriptionFilter,
    never,
    SubscriptionsInclude
    >, "All" | "Limit" | "Offset" | "Sort" | "Attributes" | "Update" | "Link" > {
  endpoint: 'subscriptions'

  All(token?: string): Promise<ResourcePage<Subscription, SubscriptionsIncluded>>

  GetInvoices(id: string): Promise<Resource<SubscriptionInvoice[]>>

  GetAttachedProducts(id: string) : Promise<Resource<SubscriptionOfferingProduct[]>>

  GetAttachedPlans(id: string) : Promise<Resource<SubscriptionOfferingPlan[]>>
}
