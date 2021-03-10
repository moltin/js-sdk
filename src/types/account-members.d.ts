/**
 * Account Members
 */
import {Identifiable, Resource, ResourceList} from './core'
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
 * Account Member Endpoints
 */
export interface AccountMembersEndpoint {
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
}
