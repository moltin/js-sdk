import { Resource, RelationshipToOne } from './core'
export as namespace authenticationSettings

export namespace authenticationSettings {

  export interface AuthenticationSettingsBase {
        type: string;
        meta: object;
        relationships: {
            "authentication-realm": RelationshipToOne<'authentication-realm'>;
          };
  }
  /**
   * AuthenticationRealm Endpoints
   */
  export interface AuthenticationSettingsEndpoint {
    Get(): Promise<Resource<AuthenticationSettingsBase>>
  }
}
