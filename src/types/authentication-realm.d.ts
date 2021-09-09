/**
 * Authentication Realms
 * Description: You can use the Authentication Realms endpoint to configure authentication options.
 * Authentication Realm sub-resources can be used to configure single sign-on.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/authentication-realms/index.html
 */
import {
  CrudQueryableResource,
  Identifiable,
  RelationshipToOne,
  Resource,
  ResourceList
} from './core'

/**
 * The Authentication Realm object Interface
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/authentication-realms/index.html#the-authentication-realm-object
 */

export interface Realm extends RealmBase, Identifiable {
  meta: {
    timestamps: {
      created_at: string
      updated_at: string
    }
  }
  links: {}
  relationships: {
    origin: RelationshipToOne<'merchant-realm-mappings'>
  }
}

export interface RealmBase {
  name: string
  duplicate_email_policy: string
  redirect_uris: string[]
  type: 'authentication-realm'
}

export interface RealmCreateBody extends RealmBase {
  relationships: {
    origin: {
      data: {
        id: string,
        type: string
      }
    }
  }
}

export interface RealmUpdateBody extends Partial<RealmBase> {
}

/**
 * Authentication Realms Endpoints
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/authentication-realms/get-all-authentication-realms.html
 * Update: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/authentication-realms/update-an-authentication-realm.html
 */
export interface AuthenticationRealmEndpoint
  extends Omit<
    CrudQueryableResource<
      Realm,
      RealmCreateBody,
      RealmUpdateBody,
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
  Create(body: { data: Partial<RealmCreateBody> }): Promise<Resource<Realm>>

  /**
   * Update an Authentication Realm
   */
  Update(id: string, body: RealmUpdateBody): Promise<Resource<Realm>>
}
