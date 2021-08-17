/**
 * OpenID Connect Profiles
 * Description: An OpenID Connect Profile resource represents a specific configuration of an OpenID Connect Provider.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/oidc-profiles/index.html
 */
import { Identifiable, Resource, ResourcePage } from './core'

/**
 * The OpenID Connect Profile object
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/oidc-profiles/index.html#the-openid-connect-profile-object
 */

export interface ProfileBase {
  name: string
  discovery_url: string
  client_id: string
  client_secret: string,
  type: string
}

export interface ProfileResponseBody extends Partial<ProfileBase> {
  id: string
}

export interface ProfileCreateUpdateBody extends Partial<ProfileBase> {

}
export interface Profile extends ProfileBase, Identifiable {
  meta: {
    timestamps: {
      created_at: string
      updated_at: string
    }
  }
}

export interface ProfileListItem extends Profile {
  links: {
    'authorization-endpoint': string
    'client-discovery-url': string
    self: string
    'callback-endpoint': string
  }
}

export interface ProfileResponse extends Resource<ProfileResponseBody> {
  links: {
    'authorization-endpoint': string
    'client-discovery-url': string
    self: string
    'callback-endpoint': string
  }
}

/**
 * OpenID Profiles Endpoints
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/oidc-profiles/get-all-oidc-profiles.html
 */
export interface OidcProfileEndpoint {
  /**
   * Get all OpenID Connect Profiles
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/oidc-profiles/get-all-oidc-profiles.html
   * @param realmId - The ID for the authentication-realm containing the OpenID Connect profiles.
   */
  All(realmId: string): Promise<ResourcePage<ProfileListItem>>

  /**
   * Get an OpenID Connect Profile
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/oidc-profiles/get-an-oidc-profile.html
   * @param realmId - The ID for the authentication-realm containing the OpenID Connect profiles.
   * @param profileId - The ID for the requested OpenID Connect profile.
   */
  Get({ realmId, profileId }): Promise<ProfileResponse>

  /**
   * Create an OpenID Connect Profile
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/oidc-profiles/create-an-oidc-profile.html
   * @param realmId - The ID for the authentication-realm containing the OpenID Connect profiles.
   * @param body - The OpenID Connect Profile object
   */
  Create(realmId: string, body: { data: ProfileCreateUpdateBody }): Promise<ProfileResponse>

  /**
   * Update an OpenID Connect Profile
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/oidc-profiles/update-an-oidc-profile.html
   * @param realmId - The ID for the authentication-realm containing the OpenID Connect profiles.
   * @param profileId - The ID for the requested OpenID Connect profile.
   * @param body - The OpenID Connect Profile object
   */
  Update(
    realmId: string,
    profileId: string,
    body: { data: ProfileCreateUpdateBody }
  ): Promise<ProfileResponse>

  /**
   * Delete an OpenID Connect Profile
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/oidc-profiles/delete-an-oidc-profile.html
   * @param realmId - The ID for the authentication-realm containing the OpenID Connect profiles.
   * @param profileId - The ID for the requested OpenID Connect profile.
   */
  Delete(realmId: string, profileId: string)
}
