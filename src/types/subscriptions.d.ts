/**
 * Subscriptions
 * Description: Subscriptions.
 * DOCS: TODO: add docs when ready
 */
import {
  Identifiable,
  CrudQueryableResource,
  Resource
} from './core'

/**
 * Core Subscription Base Interface
 * For custom flows, extend this interface
 * DOCS: TODO: add docs when ready
 */
export interface SubscriptionBase {
  type: "subscription",
  attributes: {
    external_ref?: string,
    account_id: string
    offering: {
      id: string
      type: "subscription_offering"
      attributes: {
        external_ref?: string
        name: string
        description: string
        updated_at: string
        created_at: string
        canceled_at: string | null
      },
      meta: {
        owner: string,
        timestamps: {
          updated_at: string
          created_at: string
          canceled_at: string | null
        }
      }
    },
    plan_id: string,
    currency: string,
    updated_at: string
    created_at: string
  },
  relationships: {
    subscriber: {
      data: {
        id: string,
        type: 'subscription_subscriber'
      }
    }
  }
  meta: {
    owner: string,
    status: 'active' | 'inactive'
    canceled: boolean
    timestamps: {
      updated_at: string
      created_at: string
      canceled_at: string | null
    }
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
    never
    >, "Limit" | "Offset" | "Sort" | "With" | "Attributes" | "Update" | "Link" > {
  endpoint: 'subscriptions'

  GetInvoices(id: string): Promise<Resource<SubscriptionInvoice[]>>
}
