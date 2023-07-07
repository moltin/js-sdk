/**
 * Onetime Password Token Request
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/user-authentication-password-profiles/index.html
 */

/**
 * The Onetime Password Token Request object
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/user-authentication-password-profiles/index.html#The-User-Authentication-Password-Profile-Object
 */

export interface OnetimePasswordTokenRequestBody {
    type: string
    username: string
    purpose : string
}

export interface OnetimePasswordTokenRequestEndpoint {
    /**
     * Create a Onetime Password Token Request
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/user-authentication-password-profiles/create-a-user-authentication-password-profile.html
     * @param realmId - The ID for the authentication-realm.
     * @param passwordProfileId - The ID for the password profile.
     * @param body - The Onetime Password Token Request object
     */
    Create(realmId: string, passwordProfileId: string, body: { data: OnetimePasswordTokenRequestBody }, token?: string)

}
