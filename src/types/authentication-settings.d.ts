import { Resource, RelationshipToOne } from './core'

export interface AuthenticationSettingsBase {
  type: string;
  meta: object;
  relationships: {
      "authentication-realm": RelationshipToOne<'authentication-realm'>;
    };
}

/**
 * TODO: Need to write documentation for this.
 * AuthenticationRealm Endpoints
 */
export interface AuthenticationSettingsEndpoint {
  Get(): Promise<Resource<AuthenticationSettingsBase>>
}
