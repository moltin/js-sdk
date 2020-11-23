import { Resource, ResourcePage } from './core'

export interface ProfileBase {
  id: string;
  name: string;
  type: string;
  discovery_url: string;
  client_id: string;
  meta: {
    timestamps: {
      created_at: string;
      updated_at: string;
    };
  };
}

export interface ProfileBody {
  name: string;
  type: string;
  discovery_url: string;
  client_id: string;
  client_secret: string;
}

export interface Profile extends Resource<ProfileBase> {
  links: {
    "authorization-endpoint": string,
    "client-discovery-url": string,
    "self": string,
  }
}

/**
 * TODO: Need to point to documentation once ready
 * AuthenticationRealm Endpoints
 */
export interface OidcProfileEndpoint {
  Get({
    realmId,
    profileId
  }): Promise<Profile>

  All(realmId: string): Promise<ResourcePage<Profile>>

  Create(
    realmId: string,
    body: ProfileBody
  ): Promise<Resource<ProfileBody>>

  Update(
    realmId: string,
    profileId: string,
    body: ProfileBody
  ): Promise<Resource<ProfileBody>>

  Delete(
    realmId: string,
    profileId: string
  )
}
