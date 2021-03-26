/**
 * Account Memberships
 */
import { Resource, ResourceList } from './core'

/**
 * The Account Membership object Interface
 */

export interface AccountMembership {
  type: string
  meta: {
    timestamps: {
      created_at: string
      updated_at: string
    }
  }
  relationships: {
    'account-member': {
      data: {
        id: string
        type: string
      }
    }
  }
}

export interface AccountMembershipCreateBody {
  type: string
  account_member_id: string
}

/**
 * Account Memberships Endpoints
 */
export interface AccountMembershipsEndpoint {
  endpoint: 'account-member'
  storage: Storage

  /**
   * Get an Account Membership by reference
   * @param accountId - The ID for the requested account,
   * @param accountMembershipId - The ID for the requested account membership,
   * @param token - The Bearer token to grant access to the API.
   */
  Get(
    accountId: string,
    accountMembershipId: string,
    token?: string
  ): Promise<Resource<AccountMembership>>

  /**
   * Get all Account Memberships for an account
   * @param accountId - The ID for the account
   * @param token - The Bearer token to grant access to the API
   * @param headers
   */
  All(
    accountId: string,
    token?: string,
    headers?
  ): Promise<ResourceList<AccountMembership>>

  /**
   * Create an Account Membership
   * @param accountId - The ID for the requested account,
   * @param body
   * @param token
   */
  Create(
    accountId: string,
    body: AccountMembershipCreateBody,
    token?: string
  ): Promise<Resource<AccountMembership>>

  /**
   * Delete an Account Membership by reference
   * @param accountId - The ID for the requested account,
   * @param accountMembershipId - The ID for the requested account membership,
   * @param token - The Bearer token to grant access to the API.
   */
  Delete(
    accountId: string,
    accountMembershipId: string,
    token?: string
  ): Promise<{}>
}
