/**
 * Customers
 * Description: You can use the Customer endpoint to store customer addresses and other information.
 * The Customer endpoint allows you to generate JSON Web Tokens inside your client-side applications to authenticate
 * requests to get all customer orders.
 * Customer tokens - You are able to use a customer token with an implicit Bearer token. This is recommend for
 * client-side interactions. Or you can use a client_credentials Bearer token. This is recommended for back end
 * interactions.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/customers/index.html
 */
import { Identifiable, CrudQueryableResource, Resource } from './core'

/**
 * Core Customer Base Interface
 * For custom flows, extend this interface
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/customers/index.html
 */
export interface CustomerBase {
  type: string
  name: string
  email: string
  password: string
}

export interface Customer extends Identifiable, CustomerBase {}

export interface CustomerToken {
  type: string
  id: string
  customer_id: string
  token: string
  expires: number
}

/**
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/customers/filtering.html
 */
export interface CustomerFilter {
  eq?: {
    name?: string
    email?: string
  },
  like?: {
    name?: string
    email?: string
  }
}

type CustomerInclude =
  | 'main_images'
  | 'files'
  | 'brands'
  | 'categories'
  | 'collections'
  | 'variations'

/**
 * Customer Endpoints
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/customers/index.html
 * Get DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/customers/get-a-customer.html
 * Get All DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/customers/get-all-customers.html
 * Create DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/customers/create-a-customer.html
 * Update DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/customers/update-a-customer.html
 * Delete DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/customers/delete-a-customer.html
 */
export interface CustomersEndpoint
  extends CrudQueryableResource<
      Customer,
      CustomerBase,
      Partial<CustomerBase>,
      CustomerFilter,
      never,
      CustomerInclude
    > {
  endpoint: 'customers'

  /**
   * Customer Tokens
   * Description: We provide a basic /tokens endpoint that allows you authenticate customers by email and password so
   * you can easily allow customers to manage their addresses or get orders by customer.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/customers/customer-tokens.html
   * @param email [string] email for customer
   * @param password [string] password for customer
   * @deprecated
   */
  Token(email: string, password: string): Promise<Resource<CustomerToken>>;

  /**
   * Customer Tokens
   * Description: We provide a basic /tokens endpoint that allows you authenticate customers by email and password so
   * you can easily allow customers to manage their addresses or get orders by customer.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/customers/customer-tokens.html
   * @param email [string] email for customer
   * @param password [string] password for customer
   * @param headers [object] an optional header parameter if headers would like to be included with the request
   */
  TokenViaPassword(email: string, password: string, headers?: object): Promise<Resource<CustomerToken>>;

  /**
   * Customer Tokens
   * Description: We provide a basic /tokens endpoint that allows you authenticate customers by email and password so
   * you can easily allow customers to manage their addresses or get orders by customer.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/customers/customer-tokens.html
   * @param code [string] an optional oidc authorization code if oidc is being used
   * @param redirectUri [string] an optional redirectUri if oidc is being used	   * @param redirectUri [string] an optional redirectUri if oidc is being used
   * @param codeVerifier [string] an optional codeVerifier if oidc is being used
   * @param headers [object] an optional header parameter if headers would like to be included with the request
   */
  TokenViaOIDC(code: string, redirectUri: string, codeVerifier: string, headers?: object): Promise<Resource<CustomerToken>>;
}
