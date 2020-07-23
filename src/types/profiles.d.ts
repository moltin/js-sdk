import { core } from './core'
export as namespace profile

export namespace profile {

  export interface ProfileBase {
        id: string;
        name: string;
        meta: object;
        type: string; 
        discovery_url: string;
        client_id: string;
  }


  /**
   * AuthenticationRealm Endpoints
   */
  export interface AuthenticationProfilesEndpoint extends core.CrudQueryableResource<ProfileBase, null, null, null> {
    endpoint: 'authentication-profiles'
    storage: Storage
  }

}
