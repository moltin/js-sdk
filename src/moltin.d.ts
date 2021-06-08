// Type definitions for @moltin/js-sdk
// Project: @moltin/sdk
import { AuthenticateResponseBody, Config, ConfigOptions, RequestFactory } from './types/config'
import { StorageFactory } from './types/storage'
import { ProductsEndpoint } from './types/product'
import { PcmProductsEndpoint } from './types/pcm'
import { CurrencyEndpoint } from './types/currency'
import { BrandEndpoint } from './types/brand'
import { CategoryEndpoint } from './types/category'
import { CollectionEndpoint } from './types/collection'
import { IntegrationEndpoint } from './types/integration'
import { OrdersEndpoint } from './types/order'
import { GatewaysEndpoint } from './types/gateway'
import { CustomersEndpoint } from './types/customer'
import { InventoryEndpoint } from './types/inventory'
import { JobEndpoint } from './types/job'
import { FileEndpoint } from './types/file'
import { FlowEndpoint } from './types/flow'
import { FieldsEndpoint } from './types/field'
import { AddressesEndpoint } from './types/address'
import { TransactionEndpoint } from './types/transaction'
import { SettingsEndpoint } from './types/settings'
import { PromotionsEndpoint } from './types/promotions'
import { VariationsEndpoint } from './types/variations'
import { AuthenticationSettingsEndpoint } from './types/authentication-settings'
import { OidcProfileEndpoint } from './types/oidc-profile'
import { AuthenticationRealmEndpoint } from './types/authentication-realm'
import { CartEndpoint } from './types/cart'
import { HierarchiesEndpoint } from './types/hierarchies'
import { CatalogsEndpoint } from './types/catalogs'
import { CatalogsRulesEndpoint } from './types/catalogs-rules'
import { PriceBooksEndpoint } from './types/price-books'
import { MerchantRealmMappingsEndpoint } from './types/merchant-realm-mappings'
import { CatalogEndpoint } from './types/catalog'

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
export * from './types/nodes'
export * from './types/collection'
export * from './types/category'
export * from './types/brand'
export * from './types/currency'
export * from './types/pcm'
export * from './types/integration'
export * from './types/hierarchies'
export * from './types/job'
export * from './types/file'
export * from './types/flow'
export * from './types/transaction'
export * from './types/settings'
export * from './types/promotions'
export * from './types/catalogs'
export * from './types/catalogs-rules'
export * from './types/variations'
export * from './types/authentication-settings'
export * from './types/oidc-profile'
export * from './types/authentication-realm'
export * from './types/gateway'
export * from './types/price-books'
export * from './types/price-book-prices'
export * from './types/node-relationships'
export * from './types/merchant-realm-mappings'
export * from "./types/pcm-file-relationship"

// UMD
export as namespace moltin

export class Moltin {
  config: Config
  cartId?: string
  request: RequestFactory
  storage: StorageFactory
  credentials: AuthenticateResponseBody
  Products: ProductsEndpoint
  PCM: PcmProductsEndpoint
  Catalogs: CatalogsEndpoint
  Catalog: CatalogEndpoint
  Rules: CatalogsRulesEndpoint
  PriceBooks: PriceBooksEndpoint
  Hierarchies: HierarchiesEndpoint
  Currencies: CurrencyEndpoint
  Brands: BrandEndpoint
  Categories: CategoryEndpoint
  Collections: CollectionEndpoint
  Integrations: IntegrationEndpoint
  Orders: OrdersEndpoint
  Gateways: GatewaysEndpoint
  Customers: CustomersEndpoint
  Inventories: InventoryEndpoint
  Jobs: JobEndpoint
  Files: FileEndpoint
  Flows: FlowEndpoint
  Fields: FieldsEndpoint
  Addresses: AddressesEndpoint
  Transactions: TransactionEndpoint
  Settings: SettingsEndpoint
  Promotions: PromotionsEndpoint
  Variations: VariationsEndpoint
  AuthenticationSettings: AuthenticationSettingsEndpoint
  OidcProfile: OidcProfileEndpoint
  AuthenticationRealm: AuthenticationRealmEndpoint
  MerchantRealmMappings: MerchantRealmMappingsEndpoint

  Cart(id?: string): CartEndpoint // This optional cart id is super worrying when using the SDK in a node server :/
  constructor(config: Config)

  Authenticate(): Promise<AuthenticateResponseBody>
}

export function gateway(config: ConfigOptions): Moltin

export namespace moltin {
  export interface Settings {
    additional_languages?: string[]
    calculation_method?: string
    list_child_products?: boolean
    page_length?: number
  }
}
