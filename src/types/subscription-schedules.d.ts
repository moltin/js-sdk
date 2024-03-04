/**
 * Subscription Schedules
 * Description: Subscription Schedules.
 * DOCS: TODO: add docs when ready
 */
import {
  Identifiable,
  CrudQueryableResource
} from './core'
import { SubscriptionJob } from './subscription-jobs'

/**
 * Core Subscription Schedule Base Interface
 * For custom flows, extend this interface
 * DOCS: TODO: add docs when ready
 */
export interface SubscriptionScheduleBase {
  type: 'subscription_schedule',
  attributes: {
    external_ref?: string,
    name?: string,
    specification: string,
    location: string,
    job: {
      job_type: SubscriptionJob['attributes']['job_type']
    }
  }
}

export interface SubscriptionSchedule extends Identifiable, SubscriptionScheduleBase {
  attributes: SubscriptionScheduleBase['attributes'] & {
    updated_at: string
    created_at: string
  }
  meta: {
    scheduled_for: string,
    owner: 'store' | 'organization',
    timestamps: {
      updated_at: string,
      created_at: string,
    }
  }
}

export type SubscriptionScheduleCreate = SubscriptionScheduleBase
export type SubscriptionScheduleUpdate = Omit<SubscriptionSchedule, 'attributes'> & {attributes: Partial<SubscriptionSchedule['attributes']>}

/**
 * Subscription Schedule Endpoints
 * DOCS: TODO: add docs when ready
 */
export interface SubscriptionSchedulesEndpoint
  extends CrudQueryableResource<
    SubscriptionSchedule,
    SubscriptionScheduleCreate,
    SubscriptionScheduleUpdate,
    never,
    never,
    never
    > {
  endpoint: 'schedules'
}
