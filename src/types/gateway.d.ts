/**
 * Gateways
 * Description: You can configure payment gateways using the Gateways endpoint. You can enable and disable built-in payment gateways.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/payments/gateways/index.html
 */
import { Attributes, QueryableResource} from './core'

/**
 * Core Gateway Base Interface
* DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/payments/gateways/index.html#the-gateways-object
*/
export  interface  GatewayBase {
  name: string
  slug: string
  type: string
  enable: boolean
  login?: string
  merchant_id?:string
  password?:string
  test?:boolean
  username?:string
  signature?:string
  environment?:string
  private_key?:string
  public_key?:string
  merchant_account?:string
  partner?:string
}

export  interface  Gateway extends GatewayBase {}

/**
 * Gateway Endpoints
 */
export interface GatewaysEndpoint extends QueryableResource<Gateway, never, never, never> {
  endpoint:'gateways'

  Update<R = any, T = Gateway>(
    slug: string,
    body: R
  ): Promise<T>

  /**
   * Enabled
   * Description: This endpoint allows you update your settings to enable or disable the gateways.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/payments/gateways/update-gateway-settings.html
   * @param SLUG [string] The slug of the gateway to be updated.
   */
  Enabled<T>(slug: string, enabled: boolean): Promise<T>

  GetSlugAttributes(flowType: string, token?: string): Promise<Attributes>

}