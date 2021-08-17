/**
 * User Authentication Info
 * Description: A User Authentication Info resource represents the information used for user authentication.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/user-authentication-info/index.html
 */
import {CrudQueryableResource, Identifiable, Resource, ResourceList} from './core'

/**
 * The User Authentication Info object
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/user-authentication-info/index.html#The-User-Authentication-Info-object
 */

export interface UserAuthenticationInfoBody {
    type: string
    name: string
    email : string
}


export interface UserAuthenticationInfo extends UserAuthenticationInfoBody, Identifiable {
    meta: {
        timestamps: {
            created_at: string
            updated_at: string
        }
    }
}

export interface UserAuthenticationInfoResponse extends Resource<UserAuthenticationInfo> {
    links: {
        self: string
    }
}

export interface UserAuthenticationInfoFilter {
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
 * User Authentication Info Endpoints
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/user-authentication-info/index.html
 */
export interface UserAuthenticationInfoEndpoint
    extends Omit<
        CrudQueryableResource<
            UserAuthenticationInfo,
            UserAuthenticationInfoBody,
            UserAuthenticationInfoBody,
            UserAuthenticationInfoFilter,
            never,
            never
            >,
        'Get' | 'All' | 'Create' | 'Delete' | 'Update'
        > {
    endpoint: 'user-authentication-info'
    storage: Storage
    /**
     * Read All User Authentication Info
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/user-authentication-info/get-all-user-authentication-info.html
     * @param realmId - The ID for the authentication-realm.
     */
    All(realmId: string, token?: string, headers?): Promise<ResourceList<UserAuthenticationInfo>>
    /**
     * Get a User Authentication Info
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/user-authentication-info/get-a-user-authentication-info.html
     * @param realmId - The ID for the authentication-realm.
     * @param userAuthenticationInfoId - The ID for the user authentication info.
     */
    Get(realmId: string, userAuthenticationInfoId: string, token?: string): Promise<UserAuthenticationInfoResponse>

    /**
     * Create a User Authentication Info
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/user-authentication-info/create-a-user-authentication-info.html
     * @param realmId - The ID for the authentication-realm.
     * @param body - The User Authentication Info object
     */
    Create(realmId: string, body: { data: UserAuthenticationInfoBody }, token?: string): Promise<UserAuthenticationInfoResponse>

    /**
     * Update an User Authentication Info
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/user-authentication-info/update-a-user-authentication-info.html
     * @param realmId - The ID for the authentication-realm.
     * @param userAuthenticationInfoId - The ID for the user authentication info.
     * @param body - The User Authentication Info object
     */
    Update(realmId: string, userAuthenticationInfoId: string, body: { data: UserAuthenticationInfoBody }, token?: string): Promise<UserAuthenticationInfoResponse>

    /**
     * Delete an User Authentication Info
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/user-authentication-info/delete-a-user-authentication-info.html
     * @param realmId - The ID for the authentication-realm.
     * @param userAuthenticationInfoId - The ID for the user authentication info.
     */
    Delete(realmId: string, userAuthenticationInfoId: string, token?: string)
}
