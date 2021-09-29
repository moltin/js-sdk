/**
 * Account Memberships
 */
import {
  CrudQueryableResource,
  Identifiable,
  Resource, ResourceList,
  ResourcePage,
} from "./core";
import {AccountMember, AccountMemberBase} from "./account-members";

/**
 * The Account Membership object Interface
 */
export interface AccountMembership extends Identifiable {
  type: string
  meta: {
    timestamps: {
      created_at: string
      updated_at: string
    }
  }
  relationships: {
    'account_member': {
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

export interface AccountMembershipsIncluded {
  account_members: AccountMemberBase[]
}

type AccountMembershipsInclude = | 'account_members'

type AccountMembershipsResponse = ResourcePage<AccountMembership, AccountMembershipsIncluded>


/**
 * filter for account memberships
 */
export interface AccountMembershipsFilter {
  eq?: {
    account_member_id?: string
  }
  like?: {
    account_member_id?: string
  }
}


/**
 * Account Memberships Endpoints
 */
export interface AccountMembershipsEndpoint
  extends Omit<
      CrudQueryableResource<
        AccountMembership,
        AccountMembershipCreateBody,
        never,
        AccountMembershipsFilter,
        never,
        AccountMembershipsInclude
      >,
      'Get' | 'All' | 'Create' | 'Delete' | 'Update' | 'Filter'
    > {
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
   */
  All(
    accountId: string,
    token?: string
  ): Promise<AccountMembershipsResponse>


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

  /**
   * Filter Account Memberships for an account
   * @param filter the filter object
   */
  Filter(filter: AccountMembershipsFilter): AccountMembershipsEndpoint
}
