import { CrudQueryableResource } from './core'
export as namespace profile

export namespace profile {

  export interface ProfileBase {
        id: string;
        name: string;
        type: string; 
        discovery_url: string;
        client_id: string;
  }

  export interface ProfileBody {
    name: string;
    type: string;
    discovery_url: string;
    client_id: string;
    client_secret: string;
  }

  export interface Profile extends ProfileBase {
    meta: {
      timestamps: {
        created_at: string;
        updated_at: string;
      };
    };
    links: {}
  }


  /**
   * AuthenticationRealm Endpoints
   */
  export interface AuthenticationProfileEndpoint extends CrudQueryableResource<Profile, ProfileBody, ProfileBody, never, never, never> {
    endpoint: 'authentication-profile'
    storage: Storage
  }

}
