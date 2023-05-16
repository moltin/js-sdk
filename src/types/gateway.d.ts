/**
 * Gateways
 * Description: You can configure payment gateways using the Gateways endpoint.
 * You can enable and disable built-in payment gateways.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/payments/gateways/index.html
 */
import { Attributes, QueryableResource, Resource } from './core'

/**
 * Core Gateway Base Interface
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/payments/gateways/index.html#the-gateways-object
 */
export interface GatewayBase {
  name: string
  slug: string
  type: string
  enabled: boolean
  login?: string
  merchant_id?: string
  password?: string
  test?: boolean
  username?: string
  signature?: string
  environment?: string
  private_key?: string
  public_key?: string
  merchant_account?: string
  partner?: string
  stripe_account?: string
  client_id?: string
  payer_id?: string
}

export interface Gateway extends GatewayBase {}

export interface OnboardingLinkResponse {
  onboarding_link: string
}

export interface InvoicingResult {
  id: string
  created: string
  name: string
  email: string
  object: string
}

/**
 * Gateway Endpoints
 */
export interface GatewaysEndpoint
  extends QueryableResource<Gateway, never, never, never> {
  endpoint: 'gateways'

  Update<R = any, T = Resource<Gateway>>(slug: string, body: R): Promise<T>

  /**
   * Enabled
   * Description: This endpoint allows you update your settings to enable or disable the gateways.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/payments/gateways/update-gateway-settings.html
   * @param slug [string] The slug of the gateway to be updated.
   * @param enabled [boolean] true or false depending on the enabled status.
   */
  Enabled<T = Resource<Gateway>>(slug: string, enabled: boolean): Promise<T>

  GetSlugAttributes(flowType: string, token?: string): Promise<Attributes>

  /**
   * OnboardingLinks
   * Description: This endpoint allows you to request a onboarding link for supported payment gateway slugs.
   * @param slug [string] The slug of supported gateway (currently only paypal_express_checkout).
   * @param returnUrl [string] The url you want the onboarding flow to redirect to inside your app
   * @param test [boolean] true or false depending on if it's in test mode.
   */
  OnboardingLinks<T = Resource<OnboardingLinkResponse>>(
    slug: 'paypal_express_checkout',
    returnUrl: string,
    test?: boolean
  ): Promise<T>

  /**
   * StripeCustomers
   * Description: This endpoint allows you to retrieve all customers of a connected Stripe Account
   * @param slug [string] The slug of supported gateway (currently only elastic_path_payments_stripe).
   * @param stripe_account [string] The id of the connected Stripe Account
   */
  StripeCustomers<T = Resource<InvoicingResult>>(
    slug: 'elastic_path_payments_stripe',
    stripe_account: string
  ): Promise<T>

  /**
   * StripeInvoices
   * Description: This endpoint allows you to send a Stripe Invoice to a connected Customer
   * @param slug [string] The slug of supported gateway (currently only elastic_path_payments_stripe).
   * @param stripe_account [string] The id of the connected Stripe Account
   */
  StripeInvoices<T = Resource<InvoicingResult>>(
    slug: 'elastic_path_payments_stripe',
    stripe_account: string,
    customer_id: string
  ): Promise<T>
}
