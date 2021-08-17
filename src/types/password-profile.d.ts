/**
 * Password Profiles
 * Description: A Password Profile resource represents a specific configuration to have user authentication via username and password.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/password-profiles/index.html
 */
import {Identifiable, Resource, ResourceList} from './core'

/**
 * The Password Profile object
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/password-profiles/index.html#The-Password-Profile-Object
 */

export interface PasswordProfileBody {
    username_format: string
    name: string
    type: string
}

export interface PasswordProfile extends PasswordProfileBody, Identifiable {
    meta: {
        timestamps: {
            created_at: string
            updated_at: string
        }
    }
}

export interface PasswordProfileResponse extends Resource<PasswordProfile> {
    links: {
        self: string
    }
}

/**
 * Password Profiles Endpoints
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/password-profiles/index.html
 */
export interface PasswordProfileEndpoint {
    /**
     * Read All Password Profiles
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/password-profiles/get-all-password-profiles.html
     * * @param realmId - The ID for the authentication-realm.
     */
    All(realmId: string, token?: string, headers?): Promise<ResourceList<PasswordProfileResponse>>
    /**
     * Get a Password Profile
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/password-profiles/get-a-password-profile.html
     * @param realmId - The ID for the authentication-realm containing the Password profiles.
     * @param profileId - The ID for the requested Password profile.
     */
    Get({realmId, profileId} : {realmId:string, profileId:string}): Promise<PasswordProfileResponse>

    /**
     * Create an Password Profile
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/password-profiles/create-a-password-profile.html
     * @param realmId - The ID for the authentication-realm containing the Password profiles.
     * @param body - The Password Profiles object
     */
    Create(realmId: string, body: { data: PasswordProfileBody }): Promise<PasswordProfileResponse>

    /**
     * Update an Password Profile
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/password-profiles/update-a-password-profile.html
     * @param realmId - The ID for the authentication-realm containing the Password profiles.
     * @param profileId - The ID for the requested Password profile.
     * @param body - The Password Profile object
     */
    Update(realmId: string, profileId: string, body: { data: PasswordProfileBody }): Promise<PasswordProfileResponse>

    /**
     * Delete an Password Profile
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/password-profiles/delete-a-password-profile.html
     * @param realmId - The ID for the authentication-realm containing the Password profiles.
     * @param profileId - The ID for the requested Password profile.
     */
    Delete(realmId: string, profileId: string)
}
