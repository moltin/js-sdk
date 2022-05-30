/**
 * Settings
 * Description: The Settings endpoint allows you to configure global settings for your project.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/settings/index.html
 */
import { Resource } from './core'

interface Settings {
  type: 'settings'
  /**
   * Page length
   * Description: This defines the number of results per page when paginating results (max: 100).
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/settings/index.html#page-length
   */
  page_length: number
  /**
   * List child products
   * Description: This defines whether you want to display child products in product listings.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/settings/index.html#list-child-products
   */
  list_child_products: boolean
  /**
   * Additional languages
   * Description: You can define additional language codes that are enabled for a project (max: 5).
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/settings/index.html#additional-languages
   */
  additional_languages: string[]
  /**
   * Calculation method
   * Description: This option defines the method used to calculate cart and order totals.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/settings/index.html#calculation-method
   */
  calculation_method: string
  /**
   * Address Mandatory Fields
   * Description: 
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/settings/index.html#address-mandatory-fields
   */
  address_mandatory_fields: string[]
}

interface CartSettings {
  type: 'settings'
  cart_expiry_days: number
}

/**
 * Settings Endpoints
 */
export interface SettingsEndpoint {
  endpoint: 'settings'

  /**
   * Get all Settings
   * Description: You can get all of the project settings via one API call using a client_credential token.
   * The response is in object format as shown in the following example.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/settings/get-all-settings.html
   */
  All(): Promise<Resource<Settings>>

  /**
   * Get all Settings
   * Description: You can use the Settings endpoint to update your project settings at any time.
   * These global settings take immediate effect.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/settings/update-settings.html
   * @param body the settings object
   */
  Update(body: Partial<Settings>): Promise<Resource<Settings>>

  /**
   * Get Cart Settings
   * Description: You can get the Cart Settings using this endpoint
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/settings/cart-settings.html#get-cart-settings
   */
  Cart(): Promise<Resource<CartSettings>>

  /**
   * Update Cart Settings
   * Description: You can use the Cart Settings endpoint to update your cart settings.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/settings/cart-settings.html#put-cart-settings
   * @param body.type - The type is settings.
   * @param body.cart_expiry_days - The number of days in which the cart will expire.
   */
  UpdateCart(body: CartSettings): Promise<Resource<CartSettings>>
}
