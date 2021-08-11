/**
 * Addresses
 * Description: The Addresses API allows you to organize customer addresses. Addresses are a sub-resource of a Customer.
 * A Customer may have multiple addresses, such as home, work and neighbor. You are able to use a customer with an
 * implicitBearer token. This is recommend for client-side interactions. Or you can use a client_credentials Bearer
 * token. This is recommended for back end interactions.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/addresses/index.html
 */
import {
  Attributes,
  CrudQueryableResource,
  Identifiable,
  QueryableResource,
  Resource,
  ResourceList,
  ResourcePage
} from './core'
import { WithRequired } from './util'
import { AccountMembership, AccountMembershipCreateBody, AccountMembershipsInclude } from "./account-memberships";

/**
 * Core Address Base Interface
 * For custom flows, extend this interface
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/addresss/index.html
 */
export interface AccountAddressBase {
  type: 'account-address'
  first_name: string
  last_name: string
  name: string
  phone_number: string
  instructions: string
  company_name: string
  line_1: string
  line_2: string
  city: string
  county: string
  postcode: string
  country: string
}

export interface AccountAddress extends Identifiable, AccountAddressBase {}

interface AccountAddressEdit
  extends WithRequired<
      AccountAddress,
      | 'type'
      | 'first_name'
      | 'last_name'
      | 'line_1'
      | 'postcode'
      | 'county'
      | 'country'
    > {}

/**
 * Address Endpoints
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/addresss/index.html
 * Get DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/addresses/get-an-address.html
 * Get All DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/addresses/get-all-addresses.html
 * Create DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/addresses/create-an-address.html
 * Update DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/addresses/update-an-address.html
 * Delete DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/addresses/delete-an-address.html
 */
export interface AccountAddressesEndpoint {
  endpoint: 'addresses'

  Get(options: {
    account: string
    address: string
    token?: string
  }): Promise<Resource<AccountAddress>>

  All(options: {
    account: string
    token?: string
  }): Promise<ResourcePage<AccountAddress>>

  Create(options: {
    account: string
    body: AccountAddressEdit
    token?: string
  }): Promise<Resource<AccountAddress>>

  Update(options: {
    account: string
    address: string
    body: Identifiable & AccountAddressEdit
    token?: string
  }): Promise<Resource<AccountAddress>>

  Delete(options: {
    account: string
    address: string
    token?: string
  }): Promise<{}>

  Attributes(token?: string): Promise<Attributes>

  Limit(value: number): AccountAddressesEndpoint

  Offset(value: number): AccountAddressesEndpoint
}
