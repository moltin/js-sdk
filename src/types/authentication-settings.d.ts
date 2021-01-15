/**
 * Customer Authentication Settings
 * Description: You can use the Customer Authentication Settings endpoint to retrieve
 * settings controlling customer authentication.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/settings/customer-authentication-settings/index.html
 */
import { Resource, RelationshipToOne, Identifiable } from './core'

/**
 * The Customer Authentication Settings Interface
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/settings/customer-authentication-settings/index.html#the-customer-authentication-settings-object
 */

export interface AuthenticationSettingsBase {
  type: string
  meta: object
  relationships: {
    'authentication-realm': RelationshipToOne<'authentication-realm'>
  }
}

export interface AuthenticationSettings
  extends AuthenticationSettingsBase,
    Identifiable {}

/**
 * AuthenticationRealm Endpoints
 */
export interface AuthenticationSettingsEndpoint {
  /**
   * Get Customer Authentication Settings
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/settings/customer-authentication-settings/get-customer-authentication-settings.html
   */
  Get(): Promise<Resource<AuthenticationSettings>>
}
