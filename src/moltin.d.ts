// Type definitions for @moltin/js-sdk
// Project: @moltin/sdk
import {
  product, core, order, customer, cart, address, inventory, field, collection, category, brand, currency,
  integration, job, file, flow, transaction
} from './types'

export * from './types'

// UMD
export as namespace moltin

export class Moltin {
  config: core.Config
  cartId: string
  request: core.RequestFactory
  storage: core.StorageFactory
  Products: product.ProductsEndpoint
  Currencies: currency.CurrencyEndpoint
  Brands: brand.BrandEndpoint
  Categories: category.CategoryEndpoint
  Collections: collection.CollectionEndpoint
  Integrations: integration.IntegrationEndpoint
  Orders: order.OrdersEndpoint
  Gateways: moltin.GatewaysEndpoint
  Customers: customer.CustomersEndpoint
  Inventories: inventory.InventoryEndpoint
  Jobs: job.JobEndpoint
  Files: file.FileEndpoint
  Flows: flow.FlowEndpoint
  Fields: field.FieldsEndpoint
  Addresses: address.AddressesEndpoint
  Transactions: transaction.TransactionEndpoint

  Cart(id?: string): cart.CartEndpoint // This optional cart id is super worrying when using the SDK in a node server :/
  constructor(config: core.Config)

  Authenticate(): Promise<core.AuthenticateResponseBody>
}

export function gateway(config: core.ConfigOptions): Moltin

export namespace moltin {

  export interface GatewaysEndpoint extends core.QueryableResource<null, null, null, null> {
    endpoint: 'gateways'

    Update<RequestBody = any, ResponseBody = any>(
      slug: string,
      body: RequestBody
    ): Promise<ResponseBody>

    Enabled<T>(slug: string, enabled: boolean): Promise<T>
  }

  export interface Settings {
    additional_languages?: string[]
    calculation_method?: string
    list_child_products?: boolean
    page_length?: number
  }
}
