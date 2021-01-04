// Type definitions for @moltin/js-sdk
// Project: @moltin/sdk

import * as config from './types/config'
import * as storage from './types/storage'
import * as product from './types/product'
import * as core from './types/core'
import * as customer from './types/customer'
import * as order from './types/order'
import * as cart from './types/cart'
import * as address from './types/address'
import * as inventory from './types/inventory'
import * as field from './types/field'
import * as collection from './types/collection'
import * as category from './types/category'
import * as brand from './types/brand'
import * as currency from './types/currency'
import * as integration from './types/integration'
import * as job from './types/job'
import * as file from './types/file'
import * as flow from './types/flow'
import * as transaction from './types/transaction'
import * as settings from './types/settings'
import * as accounts from './types/accounts'
import * as promotions from './types/promotions'
import * as variations from './types/variations'
import * as authenticationSettings from './types/authentication-settings';
import * as oidcProfile from './types/oidc-profile';
import * as authenticationRealm from './types/authentication-realm';
import * as paymentGateway from './types/gateway'

export * from './types/config'
export * from './types/storage'
export * from './types/price'
export * from './types/product'
export * from './types/core'
export * from './types/customer'
export * from './types/order'
export * from './types/cart'
export * from './types/address'
export * from './types/inventory'
export * from './types/field'
export * from './types/collection'
export * from './types/category'
export * from './types/brand'
export * from './types/currency'
export * from './types/integration'
export * from './types/job'
export * from './types/file'
export * from './types/flow'
export * from './types/transaction'
export * from './types/settings'
export * from './types/accounts'
export * from './types/promotions'
export * from './types/variations'
export * from './types/authentication-settings'
export * from './types/oidc-profile'
export * from './types/authentication-realm'
export * from './types/gateway'

// UMD
export as namespace moltin

export class Moltin {
  config: config.Config
  cartId?: string
  request: config.RequestFactory
  storage: storage.StorageFactory
  Products: product.ProductsEndpoint
  Currencies: currency.CurrencyEndpoint
  Brands: brand.BrandEndpoint
  Categories: category.CategoryEndpoint
  Collections: collection.CollectionEndpoint
  Integrations: integration.IntegrationEndpoint
  Orders: order.OrdersEndpoint
  Gateways: paymentGateway.GatewaysEndpoint
  Customers: customer.CustomersEndpoint
  Inventories: inventory.InventoryEndpoint
  Jobs: job.JobEndpoint
  Files: file.FileEndpoint
  Flows: flow.FlowEndpoint
  Fields: field.FieldsEndpoint
  Addresses: address.AddressesEndpoint
  Transactions: transaction.TransactionEndpoint
  Settings: settings.SettingsEndpoint
  Accounts: accounts.AccountsEndpoint
  Promotions: promotions.PromotionsEndpoint
  Variations: variations.VariationsEndpoint
  AuthenticationSettings: authenticationSettings.AuthenticationSettingsEndpoint
  OidcProfile: oidcProfile.OidcProfileEndpoint
  AuthenticationRealm: authenticationRealm.AuthenticationRealmEndpoint

  Cart(id?: string): cart.CartEndpoint // This optional cart id is super worrying when using the SDK in a node server :/
  constructor(config: config.Config)

  Authenticate(): Promise<config.AuthenticateResponseBody>
}

export function gateway(config: config.ConfigOptions): Moltin

export namespace moltin {
  export interface Settings {
    additional_languages?: string[]
    calculation_method?: string
    list_child_products?: boolean
    page_length?: number
  }
}
