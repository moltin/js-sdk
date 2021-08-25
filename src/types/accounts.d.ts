/**
 * Accounts
 */
import {
  CrudQueryableResource,
  Identifiable,
  Resource,
  ResourceList,
} from './core'

/**
 * The Account object Interface
 */
export interface Account extends AccountBase, Identifiable {
  meta: {
    timestamps: {
      created_at: string
      updated_at: string
    }
  }
  links: {}
  relationships: {
    parent: {
      data: {
        id: string
        type: string
      }
    }
    ancestors: [
      {
        data: {
          id: string
          type: string
        }
      }
    ]
  }
}

export interface AccountBase {
  type: string
  name: string
  legal_name: string
  registration_id?: string
  parent_id?: string
}


/**
 * filter for accounts
 */
export interface AccountFilter {
  eq?: {
    name?: string
    legal_name?: string
    registration_id?: string
  }
  like?: {
    name?: string
    legal_name?: string
    registration_id?: string
  }
}
export interface AccountUpdateBody extends Partial<AccountBase> {}

/**
 * Accounts Endpoints
 */
export interface AccountEndpoint
  extends Omit<
    CrudQueryableResource<
      Account,
      AccountBase,
      AccountUpdateBody,
      AccountFilter,
      never,
      never
    >,
    'All' | 'Create' | 'Get' | 'Update'
  > {
  endpoint: 'account'
  storage: Storage

  /**
   * Get all Accounts
   * @param token - The Bearer token to grant access to the API.
   * @param headers
   */
  All(token?: string, headers?): Promise<ResourceList<Account>>

  /**
   * Get an Account by reference
   * @param data.accountId - The ID for the requested account,
   * @param data.token - The Bearer token to grant access to the API.
   */
  Get(accountId: string, token?: string): Promise<Resource<Account>>

  /**
   * Create an Account
   */
  Create(body: AccountBase): Promise<Resource<Account>>

 /**
   * Update an Account
   */
  Update(accountId: string, body: Partial<AccountBase>): Promise<Resource<Account>>
}
