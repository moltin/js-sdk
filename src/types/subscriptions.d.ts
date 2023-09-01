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
    account_id: string,
    offering: {
      id: string
      type: "subscription-offering",
      attributes: {
        name: string,
        description: string,
        updated_at: string,
        created_at: string
      },
      relationships: {
        plans: {
          links: {
            related: string,
            self: string
          },
          data: {
            type: "offering-plan",
            id: string
          }
        }
      },
      meta: {
        owner: string
      }
    },
    plan_id: string,
    currency: string,
    updated_at: string,
    created_at: string
  },
  meta: {
    owner: string
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
    never,
    never,
    never
    >, "Filter" | "Limit" | "Offset" | "Sort" | "With" | "Attributes" | "Update" | "Link" > {
  endpoint: 'subscriptions'

  GetInvoices(id: string): Promise<Resource<SubscriptionInvoice[]>>
}
