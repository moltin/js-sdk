/**
 * Accounts
 * Description:
 *
 * DOCS:
 */

import { Resource } from './core';

/**
 * Account Endpoints
 */

export interface StoreUserAvatar {
  large: string
  medium: string
  small: string
}

export interface StoreUser {
  id: string
  name: string
  email: string
  role: string
  avatar: StoreUserAvatar
}
export interface KeysItemResponse {
  client_id: string
  client_secret: string
  store_id: string
  store_uuid: string
  user_id: string
}

export interface SwitchStoreResponse {
  status: number
  title: string
}

export interface StoreResponse {
  features: string[]
  id: string
  locked: boolean
  name: string
  owner: string
  store_status: string
  stripe_customer_id: string | null
  subscription_status: string | null
  trial_end: string | null
  trial_start: string | null
  users: StoreUser[]
  uuid: string
}

export interface CartEndpoint {
  endpoint: 'accounts'

  Stores(): Promise<Resource<StoreResponse[]>>

  Store(storeId: string): Promise<Resource<StoreResponse>>

  SwitchStore(storeId: string): Promise<Resource<SwitchStoreResponse>>

  Keys(): Promise<Resource<KeysItemResponse[]>>
}
