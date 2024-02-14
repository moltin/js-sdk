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
