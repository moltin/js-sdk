/**
 * Subscription Subscribers
 * Description: Subscription Subscribers.
 * DOCS: TODO: add docs when ready
 */
import {
  Identifiable,
  CrudQueryableResource
} from './core'

/**
 * Core Subscription Subscriber Base Interface
 * For custom flows, extend this interface
 * DOCS: TODO: add docs when ready
 */
export interface SubscriptionSubscriberBase {
  type: "subscription_subscriber"
  attributes: {
    account_id: string
    name: string
    email: string
  }
}
export interface SubscriptionSubscriber extends Identifiable, SubscriptionSubscriberBase {
  meta: {
    owner: string
    timestamps: {
      created_at: string
      updated_at: string
    }
  }
}
export type SubscriptionSubscriberCreate = SubscriptionSubscriberBase
export type SubscriptionSubscriberUpdate = Identifiable & Omit<SubscriptionSubscriberBase, 'attributes'> & {attributes: Partial<SubscriptionSubscriberBase['attributes']>}

/**
 * Subscription Subscriber Endpoints
 * DOCS: TODO: add docs when ready
 */
export interface SubscriptionSubscribersEndpoint
  extends CrudQueryableResource<
    SubscriptionSubscriber,
    SubscriptionSubscriberCreate,
    SubscriptionSubscriberUpdate,
    never,
    never,
    never
    > {
  endpoint: 'plans'
}
