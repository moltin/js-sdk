/**
 * Account Members
 */
import {CrudQueryableResource, Identifiable, Resource,} from './core'

/**
 * The Account Member object Interface
 */

export interface AccountMember extends Identifiable {
    type: string
    name?: string
    email?: string
}

/**
 * Account Member Endpoints
 */
export interface AccountMemberEndpoint
    extends Omit<CrudQueryableResource<AccountMember,
        never,
        never,
        never,
        never,
        never>,
        'Get'> {
    endpoint: 'account-member'
    storage: Storage


    /**
     * Get an Account Member by reference
     * @param accountMemberId - The ID for the requested account member,
     * @param token - The Bearer token to grant access to the API.
     */
    Get(accountMemberId: string, token?: string): Promise<Resource<AccountMember>>
}
