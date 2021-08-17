/**
 * Account Authentication Settings
 * Description: You can use the Account Authentication Settings endpoint to retrieve
 * settings controlling Account authentication.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/settings/account-authentication-settings/index.html
 */
import { Resource, RelationshipToOne, Identifiable } from './core'

/**
 * The Account Authentication Settings Interface
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/settings/account-authentication-settings/index.html#the-account-authentication-settings-object
 */
export interface AccountAuthenticationSettingsBase {
  type: string
  meta: object
  relationships: {
    'authentication_realm': RelationshipToOne<'authentication_realm'>
  }
}

export interface AccountAuthenticationSettings extends AccountAuthenticationSettingsBase, Identifiable {}

/**
 * AuthenticationRealm Endpoints
 */
export interface AccountAuthenticationSettingsEndpoint {
  /**
   * Get Account Authentication Settings
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/settings/account-authentication-settings/get-account-authentication-settings.html
   */
  Get(): Promise<Resource<AccountAuthenticationSettings>>
}
