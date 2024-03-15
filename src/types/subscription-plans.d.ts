/**
 * Subscription Plans
 * Description: Subscription Plans.
 * DOCS: TODO: add docs when ready
 */
import {
  Identifiable,
  CrudQueryableResource
} from './core'

/**
 * Core Subscription Plan Base Interface
 * For custom flows, extend this interface
 * DOCS: TODO: add docs when ready
 */
export interface SubscriptionPlanBase {
  type: string
  attributes: {
    name: string
    description?: string
    billing_interval_type: string
    billing_frequency: number
    trial_period?: number
    plan_length: number
    end_behavior: string
    can_pause: boolean
    can_resume: boolean
    can_cancel: boolean
    base_price_percentage: number | null | undefined
    updated_at: string
    created_at: string
    fixed_price: {
      [key: string]: {
        amount: number
        includes_tax?: boolean
      }
    } | null | undefined
  },
}

export interface SubscriptionPlan extends Identifiable, SubscriptionPlanBase {

}
export type SubscriptionPlanCreate = Omit<SubscriptionPlanBase, 'attributes'> & {attributes: Partial<SubscriptionPlanBase['attributes']>}
export type SubscriptionPlanUpdate = Omit<SubscriptionPlan, 'attributes'> & {attributes: Partial<SubscriptionPlanBase['attributes']>}

/**
 * Subscription Plan Endpoints
 * DOCS: TODO: add docs when ready
 */
export interface SubscriptionPlansEndpoint
  extends CrudQueryableResource<
    SubscriptionPlan,
    SubscriptionPlanCreate,
    SubscriptionPlanUpdate,
    never,
    never,
    never
    > {
  endpoint: 'plans'
}
