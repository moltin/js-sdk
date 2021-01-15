/**
 * Authentication Realms
 * Description: You can use the Authentication Realms endpoint to configure authentication options.
 * Authentication Realm sub-resources can be used to configure single sign-on.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/authentication-realms/index.html
 */
import { CrudQueryableResource } from './core'

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
}

export interface RealmCreateBody {
  type: string
  name: string
}

/**
 * Authentication Realms Endpoints
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/authentication-realms/get-all-authentication-realms.html
 * Get DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/authentication-realms/get-an-authentication-realm.html
 * Get All DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/authentication-realms/get-all-authentication-realms.html#get-get-a-list-of-authentication-realms
 * Update DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/single-sign-on/authentication-realms/update-an-authentication-realm.html
 */
export interface AuthenticationRealmEndpoint
  extends CrudQueryableResource<
      Realm,
      RealmCreateBody,
      RealmCreateBody,
      never,
      never,
      never
    > {
  endpoint: 'authentication-realm'
  storage: Storage
}
