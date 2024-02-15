/**
 * Subscription Subscribers
 * Description: Subscription Subscribers.
 * DOCS: TODO: add docs when ready
 */
import {
  Identifiable,
  CrudQueryableResource
} from './core'

interface SubscriptionSubscriberMeta {
  owner: string,
  timestamps: {
    canceled_at: string | null,
    created_at: string,
    updated_at: string
  }
}

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
  meta: SubscriptionSubscriberMeta
}
export interface SubscriptionSubscriber extends Identifiable, SubscriptionSubscriberBase {

}
export type SubscriptionSubscriberCreate = SubscriptionSubscriberBase
export type SubscriptionSubscriberUpdate = Omit<SubscriptionSubscriber, 'attributes'> & {attributes: Partial<SubscriptionSubscriberBase['attributes']> & Identifiable}

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
