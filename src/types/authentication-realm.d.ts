/**
 * Authentication Realms
 * Description: You can use the Authentication Realms endpoint to configure authentication options.
 * Authentication Realm sub-resources can be used to configure single sign-on.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/authentication-realms/index.html
 */
import { CrudQueryableResource, Resource, ResourceList } from './core'

/**
 * The Authentication Realm object Interface
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/authentication-realms/index.html#the-authentication-realm-object
 */

export interface Realm extends RealmBase {
  meta: {
    timestamps: {
      created_at: string
      updated_at: string
    }
  }
  links: {}
}

export interface RealmBase {
  id: string
  name: string
  redirect_uris: string[]
}

export interface RealmCreateBody {
  type: string
  name: string
  redirect_uris: string[]
}

/**
 * Authentication Realms Endpoints
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/authentication-realms/get-all-authentication-realms.html
 */
export interface AuthenticationRealmEndpoint
  extends Omit<
    CrudQueryableResource<
      Realm,
      RealmCreateBody,
      RealmCreateBody,
      never,
      never,
      never
    >,
    'All' | 'Create' | 'Update' | 'Get'
  > {
  endpoint: 'authentication-realm'
  storage: Storage
  /**
   * Get all Authentication Realms
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/authentication-realms/get-all-authentication-realms.html
   * @param token - The Bearer token to grant access to the API.
   * @param headers
   */
  All(token?: string, headers?): Promise<ResourceList<Realm>>

  /**
   * Get a Realm by reference
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/authentication-realms/get-an-authentication-realm.html
   * @param data.realmId - The ID for the requested authentication-realm,
   * @param data.token - The Bearer token to grant access to the API.
   */
  Get(data: { realmId: string; token?: string }): Promise<Resource<Realm>>

  /**
   * Create an Authentication Realm
   */
  Create(body: Partial<RealmBase>): Promise<Resource<Realm>>

  /**
   * Update an Authentication Realm
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/authentication-realms/get-an-authentication-realm.html
   * @param realmId - The ID for the requested authentication-realm.
   * @param body - The Authentication Realm object
   * @param token - The Bearer token to grant access to the API.
   */
  Update(
    realmId: string,
    body: Partial<RealmBase>,
    token?: string
  ): Promise<Resource<Realm>>
}
