import { Resource } from './core'

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
 * TODO: Need to write documentation for this
 * AuthenticationRealm Endpoints
 */
export interface AuthenticationProfileEndpoint {
  Get({ 
    realmId,
    profileId
  }): Promise<Resource<Profile>>

  All(realmId: string): Promise<Resource<Profile>>

  Create(
    realmId: string, 
    body: ProfileBody
  ): Promise<Resource<Profile>>

  Update(
    realmId: string,
    profileId: string,
    body: ProfileBody
  ): Promise<Resource<Profile>>

  Delete(
    realmId: string,
    profileId: string
  )
}
