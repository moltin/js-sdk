import { Resource, RelationshipToOne } from './core'

export interface AuthenticationSettingsBase {
  type: string
  meta: object
  relationships: {
    'authentication-realm': RelationshipToOne<'authentication-realm'>
  }
}

/**
 * TODO: TODO: Need to point to documentation once ready
 * AuthenticationRealm Endpoints
 */
export interface AuthenticationSettingsEndpoint {
  Get(): Promise<Resource<AuthenticationSettingsBase>>
}
