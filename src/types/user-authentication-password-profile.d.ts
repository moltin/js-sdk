/**
 * User Authentication Password Profile Info
 * Description: A User Authentication Password Profile Info resource represents username and password for user authentication info.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/user-authentication-password-profiles/index.html
 */
import {Identifiable, Resource, ResourceList} from './core'

/**
 * The User Authentication Password Profile Info object
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/user-authentication-password-profiles/index.html#The-User-Authentication-Password-Profile-Object
 */

export interface UserAuthenticationPasswordProfileBody {
    type: string
    password_profile_id: string
    username: string
    password : string
}

export interface UserAuthenticationPasswordProfileUpdateBody {
    type: string
    username: string
    password : string
}

export interface UserAuthenticationPasswordProfile extends UserAuthenticationPasswordProfileBody, Identifiable {
    meta: {
        timestamps: {
            created_at: string
            updated_at: string
        }
    }
    links: {}
    relationships: {}
}

export interface UserAuthenticationPasswordProfileResponse extends Resource<UserAuthenticationPasswordProfile> {
    links: {
        self: string
    }
}

/**
 * User Authentication Password Profile Info Endpoints
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/user-authentication-password-profiles/index.html
 */
export interface UserAuthenticationPasswordProfileEndpoint {
    /**
     * Read All User Authentication Password Info Profile
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/user-authentication-password-profiles/get-all-user-authentication-password-profile.html
     * @param realmId - The ID for the authentication-realm.
     * @param userAuthenticationInfoId - The ID for the user authentication info.
     */
    All(realmId: string, userAuthenticationInfoId: string, token?: string, headers?): Promise<ResourceList<UserAuthenticationPasswordProfile>>
    /**
     * Get a User Authentication Password Info Profile
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/user-authentication-password-profiles/get-a-user-authentication-password-profile.html
     * @param realmId - The ID for the authentication-realm.
     * @param userAuthenticationInfoId - The ID for the user authentication info.
     * @param userAuthenticationPasswordProfileId - The ID for the user authentication password profile info.
     */
    Get(realmId: string, userAuthenticationInfoId: string, userAuthenticationPasswordProfileId: string, token?: string): Promise<UserAuthenticationPasswordProfileResponse>

    /**
     * Create an User Authentication Password Info Profile
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/user-authentication-password-profiles/create-a-user-authentication-password-profile.html
     * @param realmId - The ID for the authentication-realm.
     * @param userAuthenticationInfoId - The ID for the user authentication info.
     * @param body - The User Authentication Password Profile Info object
     */
    Create(realmId: string, userAuthenticationInfoId: string, body: { data: UserAuthenticationPasswordProfileBody }, token?: string): Promise<UserAuthenticationPasswordProfileResponse>

    /**
     * Update an User Authentication Password Profile Info
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/user-authentication-password-profiles/update-a-user-authentication-password-profile.html
     * @param realmId - The ID for the authentication-realm.
     * @param userAuthenticationInfoId - The ID for the user authentication info.
     * @param userAuthenticationPasswordProfileId - The ID for the user authentication password profile info.
     * @param body - The User Authentication Password Profile Info object
     */
    Update(realmId: string, userAuthenticationInfoId: string,userAuthenticationPasswordProfileId: string, body: { data: UserAuthenticationPasswordProfileUpdateBody }, token?: string): Promise<UserAuthenticationPasswordProfileResponse>

    /**
     * Delete an User Authentication Password Profile Info
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/password-profiles/delete-a-user-authentication-password-profile.html
     * @param realmId - The ID for the authentication-realm containing the Password profiles.
     * @param userAuthenticationInfoId - The ID for the user authentication info.
     * @param userAuthenticationPasswordProfileId - The ID for the user authentication password profile info.
     */
    Delete(realmId: string, userAuthenticationInfoId: string, userAuthenticationPasswordProfileId: string, token?: string)
}
