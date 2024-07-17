/**
 * Subscription Proration Policies
 * Description: Subscription Proration Policies.
 * DOCS: TODO: add docs when ready
 */
import {
  Identifiable,
  CrudQueryableResource
} from './core'

/**
 * Core Subscription Proration Policies Base Interface
 * For custom flows, extend this interface
 * DOCS: TODO: add docs when ready
 */
export interface SubscriptionProrationPolicyBase {
  type: 'subscription_proration_policy'
  attributes: {
    name: string
    rounding: 'up' | 'down' | 'nearest'
    external_ref?: string
  }
}

export interface SubscriptionProrationPolicy extends Identifiable, SubscriptionProrationPolicyBase {
  meta: {
    owner: 'store' | 'organization'
    timestamps: {
      updated_at: string
      created_at: string
    }
  }
}

export type SubscriptionProrationPolicyCreate = SubscriptionProrationPolicyBase
export type SubscriptionProrationPolicyUpdate = Identifiable & Omit<SubscriptionProrationPolicyBase, 'attributes'> & {attributes: Partial<SubscriptionProrationPolicy['attributes']>}

/**
 * Subscription Proration Policies Endpoints
 * DOCS: TODO: add docs when ready
 */
export interface SubscriptionProrationPoliciesEndpoint
  extends CrudQueryableResource<
    SubscriptionProrationPolicy,
    SubscriptionProrationPolicyCreate,
    SubscriptionProrationPolicyUpdate,
    never,
    never,
    never
    > {
  endpoint: 'proration-policies'
}
