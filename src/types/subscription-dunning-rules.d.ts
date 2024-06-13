/**
 * Subscription Dunning Rules
 * Description: Subscription Dunning Rules.
 * DOCS: TODO: add docs when ready
 */
import {
  Identifiable,
  CrudQueryableResource
} from './core'

/**
 * Core Subscription Dunning Rules Base Interface
 * For custom flows, extend this interface
 * DOCS: TODO: add docs when ready
 */
export interface SubscriptionDunningRulesBase {
  type: 'subscription_dunning_rule'
  attributes: {
    payment_retry_type:  'fixed' | 'backoff' | 'tiered'
    payment_retry_interval?: number
    payment_retry_unit?: 'day' | 'week'
    payment_retry_multiplier?: number
    payment_retries_limit: number
    action: 'none' | 'pause' | 'close'
    default?: boolean
  }
}

export interface SubscriptionDunningRules extends Identifiable, SubscriptionDunningRulesBase {
  meta: {
    owner: 'store' | 'organization'
    timestamps: {
      updated_at: string
      created_at: string
    }
  }
}

export type SubscriptionDunningRulesCreate = SubscriptionDunningRulesBase
export type SubscriptionDunningRulesUpdate = Identifiable & Omit<SubscriptionDunningRulesBase, 'attributes'> & {attributes: Partial<SubscriptionDunningRules['attributes']>}

/**
 * Subscription Dunning Rules Endpoints
 * DOCS: TODO: add docs when ready
 */
export interface SubscriptionDunningRulesEndpoint
  extends CrudQueryableResource<
    SubscriptionDunningRules,
    SubscriptionDunningRulesCreate,
    SubscriptionDunningRulesUpdate,
    never,
    never,
    never
    > {
  endpoint: 'dunning-rules'
}
