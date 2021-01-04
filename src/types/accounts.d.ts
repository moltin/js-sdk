/**
 * Accounts
 * Description:
 *
 * DOCS:
 */

import { QueryableResource, Resource } from './core'

/**
 * Account Endpoints
 */

export interface StoreUserAvatar {
  large: string
  medium: string
  small: string
}

export interface Account {
  application_types?: string[]
  avatar?: StoreUserAvatar
  company?: string | null
  company_size?: string | null
  company_type?: string | null
  created_at?: string
  current_store?: string | null
  email?: string
  id?: string
  job_title?: string | null
  languages?: string[]
  name?: string
  onboarded?: boolean
  opt_in?: boolean
  organisation_id?: string
  project_timeline?: string | null
  signup_intention?: string | null
  tutorial_modal_viewed?: boolean
  updated_at?: string
  user_role?: string
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

export interface CreateStoreResponse {
  data: string
  status: boolean
}

export interface Store {
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

export interface StoreUserData {
  name: string
  email: string
  role: number | string
}

export interface AccountsEndpoint
  extends QueryableResource<Account, never, never, never> {
  endpoint: 'accounts'

  Stores(): Promise<Resource<Store[]>>

  Store(storeId: string): Promise<Resource<Store>>

  SwitchStore(storeId: string): Promise<Resource<SwitchStoreResponse>>

  Keys(): Promise<Resource<KeysItemResponse[]>>

  DeleteUserFromStore(storeId: string, userId: string): Promise<{}>

  AddUserToStore(storeId: string, userData: StoreUserData): Promise<CreateStoreResponse>

  Me(): Promise<Resource<Account>>

  UpdateMe(userData: Account): Promise<null>
}
