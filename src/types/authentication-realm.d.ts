import { CrudQueryableResource } from './core'

export interface Realm extends RealmBase {
  meta: {
    timestamps: {
      created_at: string;
      updated_at: string;
    };
  };
  links:{}
}

export interface RealmBase {
  id: string;
  name: string;
}

export interface RealmCreateBody {
  type: string;
  name: string;
}

/**
 * TODO: Need to write documentation for this
* AuthenticationRealm Endpoints
*/
export interface AuthenticationRealmEndpoint extends CrudQueryableResource<Realm, RealmCreateBody, RealmCreateBody, never, never, never> {
  endpoint: 'authentication-realm'
  storage: Storage
}
