// Type definitions for @moltin/js-sdk
// Project: @moltin/sdk

import { product } from './types/product'
import { core } from './types/core'
import { order } from './types/order'
import { customer } from './types/customer'
import { cart } from './types/cart'

export * from './types/product'
export * from './types/core'
export * from './types/order'
export * from './types/cart'

// UMD
export as namespace moltin

export class Moltin {
  config: core.Config
  cartId: string
  request: core.RequestFactory
  storage: core.StorageFactory
  Products: product.ProductsEndpoint // Done
  Currencies: moltin.CurrenciesEndpoint
  Brands: moltin.BrandsEndpoint
  Categories: moltin.CategoriesEndpoint
  Collections: moltin.CollectionsEndpoint
  Integrations: moltin.IntegrationsEndpoint
  Orders: order.OrdersEndpoint // Done
  Gateways: moltin.GatewaysEndpoint
  Customers: customer.CustomersEndpoint // WIP
  Inventories: moltin.InventoriesEndpoint
  Jobs: moltin.JobsEndpoint
  Files: moltin.FilesEndpoint
  Flows: moltin.FlowsEndpoint
  Fields: moltin.FieldsEndpoint
  Addresses: moltin.AddressesEndpoint
  Transactions: moltin.TransactionsEndpoint

  Cart(id?: string): cart.CartEndpoint // This optional cart id is super worrying when using the SDK in a node server :/
  constructor(config: core.Config)

  Authenticate(): Promise<core.AuthenticateResponseBody>
}

export function gateway(config: core.ConfigOptions): Moltin

export interface Price {
  amount: number
  currency: string
  includes_tax: boolean
}

export interface FormattedPrice {
  amount: number
  currency: string
  formatted: string
}

interface Relationship<T> {
  data: {
    id: string
    type: T
  }
}

export namespace moltin {

  export interface CurrenciesEndpoint extends core.BaseExtend {
    endpoint: 'currencies'
    storage: Storage

    Create<RequestBody = any, ResponseBody = any>(
      body: RequestBody
    ): Promise<ResponseBody>

    Delete<T = any>(id: string): Promise<T>

    Update<RequestBody = any, ResponseBody = any>(
      id: string,
      body: RequestBody
    ): Promise<ResponseBody>

    Set(id: string): Promise<string>

    Active(): Promise<string>
  }

  export interface IntegrationsEndpoint extends core.CRUDExtend {
    endpoint: 'integrations'
  }

  export interface BrandsEndpoint extends core.CRUDExtend {
    endpoint: 'brands'
  }

  export interface CategoriesEndpoint extends core.CRUDExtend {
    endpoint: 'categories'

    Tree<T = any>(): Promise<T>
  }

  export interface CollectionsEndpoint extends core.CRUDExtend {
    endpoint: 'collections'
  }

  export interface GatewaysEndpoint extends core.BaseExtend {
    endpoint: 'gateways'

    Update<RequestBody = any, ResponseBody = any>(
      slug: string,
      body: RequestBody
    ): Promise<ResponseBody>

    Enabled<T>(slug: string, enabled: boolean): Promise<T>
  }

  export interface InventoriesEndpoint extends core.BaseExtend {
    endpoint: 'inventories'

    Get<T = any>(productId: string): Promise<T>

    IncrementStock<T = any>(productId: string, quantity: number): Promise<T>

    DecrementStock<T = any>(productId: string, quantity: number): Promise<T>

    AllocateStock<T = any>(productId: string, quantity: number): Promise<T>

    DeallocateStock<T = any>(productId: string, quantity: number): Promise<T>

    GetTransactions<T = any>(productId: string): Promise<T>
  }

  export interface JobsEndpoint extends core.BaseExtend {
    endpoint: 'jobs'

    Create<RequestBody = any, ResponseBody = any>(
      body: RequestBody
    ): Promise<ResponseBody>
  }

  export interface FilesEndpoint extends core.BaseExtend {
    endpoint: 'files'
  }

  export interface FlowsEndpoint extends core.CRUDExtend {
    endpoint: 'flows'

    GetEntries<T = any>(slug: string): Promise<T>

    GetEntry<T = any>(slug: string, entryId: string): Promise<T>

    CreateEntry<RequestBody = any, ResponseBody = any>(
      slug: string,
      body: RequestBody
    ): Promise<ResponseBody>

    UpdateEntry<RequestBody = any, ResponseBody = any>(
      slug: string,
      entryId: string,
      body: RequestBody
    ): Promise<ResponseBody>

    DeleteEntry<T = any>(slug: string, entryId: string): Promise<T>
  }

  export interface FieldsEndpoint extends core.CRUDExtend {
    endpoint: 'fields'
  }

  // NOTE: The implementation of `AddressesEndpoint` extends `core.BaseExtend` however it breaks
  // polymorphism my defining an incompatible signature for `All` and `Get` so having to
  // redeclare the core.BaseExtend methods.
  export interface AddressesEndpoint {
    // core.BaseExtend
    request: core.RequestFactory
    config: core.Config

    constructor(config: core.Config)

    Filter(filter: any): this

    Limit(value: number): this

    Offset(value: number): this

    Sort(value: string): this

    With(includes: string | string[]): this

    // AddressesEndpoint
    endpoint: 'addresses'

    All<T = any>(options: { customer: string; token?: string }): Promise<T>

    Get<T = any>(options: {
      customer: string
      address: string
      token?: string
    }): Promise<T>

    Create<RequestBody = any, ResponseBody = any>(options: {
      customer: string
      body: RequestBody
      token?: string
    }): Promise<ResponseBody>

    Delete<T = any>(options: {
      customer: string
      address: string
      token?: string
    }): Promise<T>

    Update<RequestBody = any, ResponseBody = any>(options: {
      customer: string
      address: string
      body: RequestBody
      token?: string
    }): Promise<ResponseBody>
  }

  // NOTE: The implementation of `TransactionsEndpoint` extends `core.BaseExtend` however it breaks
  // polymorphism my defining an incompatible signature for `All` so having to redeclare the
  // core.BaseExtend methods.
  export interface TransactionsEndpoint {
    // core.BaseExtend
    request: core.RequestFactory
    config: core.Config

    constructor(config: core.Config)

    Get<T = any>(id: string, token?: string): Promise<T>

    Filter(filter: any): this

    Limit(value: number): this

    Offset(value: number): this

    Sort(value: string): this

    With(includes: string | string[]): this

    // TransactionsEndpoint
    endpoint: 'transactions'

    All<T = any>(options: { order: string }): Promise<T>

    Capture<T = any>(options: {
      order: string
      transaction: string
    }): Promise<T>

    Refund<T = any>(options: { order: string; transaction: string }): Promise<T>
  }

  export interface SettingsEndpoint {
    request: core.RequestFactory
    config: core.Config

    constructor(config: core.Config)

    endpoint: 'settings'

    All<T = any>(): Promise<T>

    Update<T = any>(options: { body: Settings }): Promise<T>
  }

  export interface Settings {
    additional_languages?: string[]
    calculation_method?: string
    list_child_products?: boolean
    page_length?: number
  }

}
