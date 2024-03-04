/**
 * Subscription Jobs
 * Description: Subscription Jobs.
 * DOCS: TODO: add docs when ready
 */
import {
  Identifiable,
  CrudQueryableResource
} from './core'

/**
 * Core Subscription Job Base Interface
 * For custom flows, extend this interface
 * DOCS: TODO: add docs when ready
 */
export interface SubscriptionJobBase {
  type: "subscription_job",
  attributes: {
    external_ref: string,
    job_type: "billing-run" | "payment-run" | "tax-run"
    taxes?: {
      invoice_id: string,
      tax_items: [
        {
          type: "tax_item",
          name?: string,
          code?: string,
          rate: number,
          jurisdiction?: string
        }
      ]
    }[]
  }
}

export interface SubscriptionJob extends Identifiable, SubscriptionJobBase {
  attributes: SubscriptionJobBase['attributes'] & {
    status: 'pending' | 'started' | 'success' | 'failed'
    updated_at: string
    created_at: string
  }
  relationships: {
    [key: string]: {
      links: {
        related: string,
        self: string
      },
      data: {
        type: string,
        id: string
      }
    }
  },
  meta: {
    owner: 'store' | 'organization',
    timestamps: {
      updated_at: string,
      created_at: string,
      started_at?: string,
      finished_at?: string
    }
  }
}

export type SubscriptionJobCreate = SubscriptionJobBase

/**
 * Subscription Job Endpoints
 * DOCS: TODO: add docs when ready
 */
export interface SubscriptionJobsEndpoint
  extends CrudQueryableResource<
    SubscriptionJob,
    SubscriptionJobCreate,
    never,
    never,
    never,
    never
    > {
  endpoint: 'jobs'
}
