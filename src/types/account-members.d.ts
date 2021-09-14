/**
 * Account Members
 */
import {CrudQueryableResource, Identifiable, Resource, ResourceList} from './core'
import {FlowFilter} from './flow';

/**
 * The Account Member object Interface
 */

export interface AccountMemberBase extends Identifiable {
    type: string
    name?: string
    email?: string
}

export interface AccountMember extends AccountMemberBase, Identifiable {
    meta: {
        timestamps: {
            created_at: string
            updated_at: string
        }
    }
    links: {}
    relationships: {}
}

/**
 * filter for account members
 */
export interface AccountMemberFilter {
    eq?: {
        name?: string
        email?: string
    }
    like?: {
        name?: string
        email?: string
    }
}

/**
 * Account Member Endpoints
 */
export interface AccountMembersEndpoint
    extends Omit<
        CrudQueryableResource<
            AccountMember,
            never,
            never,
            AccountMemberFilter,
            never,
            never
            >,
        'All' |  'Get' | 'Filter'
        > {
    endpoint: 'account-member'
    storage: Storage

    /**
     * Get All Account Members
     * @param token - The Bearer token to grant access to the API.
     * @param headers
     */
    All(token?: string, headers?): Promise<ResourceList<AccountMember>>

    /**
     * Get an Account Member by reference
     * @param accountMemberId - The ID for the requested account member,
     * @param token - The Bearer token to grant access to the API.
     */
    Get(accountMemberId: string, token?: string): Promise<Resource<AccountMember>>


    /**
     * Get Unassigned Account Members for an account
     * @param accountId - The ID for the account
     */
    UnassignedAccountMembers(
        accountId: string,
        token?: string
    ): Promise<ResourceList<AccountMember>>

    Filter(filter: AccountMemberFilter): AccountMembersEndpoint
}
