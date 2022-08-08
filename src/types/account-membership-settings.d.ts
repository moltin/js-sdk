/**
 * Account Membership Settings
 * Description: You can use the Account Membership Settings endpoint to retrieve
 * settings controlling Account Membership.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/settings/account-membership-settings/index.html
 */
import { Resource, Identifiable } from './core'

/**
 * The Account Membership Settings Interface
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/settings/account-membership-settings/index.html#the-account-membership-settings-object
 */
export interface AccountMembershipSettingsBase {
  type: string
  membership_limit: number
}

export interface AccountMembershipSettings extends AccountMembershipSettingsBase, Identifiable {}

/**
 * AccountMembershipSettings Endpoints
 */
export interface AccountMembershipSettingsEndpoint {
  /**
   * Get an Account Membership Settings
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/settings/account-membership-settings/get-account-membership-settings.html
   */
  Get(): Promise<Resource<AccountMembershipSettings>>

  /**
   * Update an Account Membership Settings
   */
  Update(body: Partial<AccountMembershipSettingsBase>): Promise<Resource<AccountMembershipSettings>>
}
