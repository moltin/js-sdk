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
    name: string,
    description?: string,
    status: string,
    billing_interval_type: string,
    billing_frequency: number,
    billing_day?: number,
    billing_month_day?: number,
    trial_period?: number,
    plan_length: number,
    end_behavior: string,
    can_pause: boolean,
    can_resume: boolean,
    can_cancel: boolean,
    base_price_percentage: number,
    updated_at: string,
    created_at: string
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
