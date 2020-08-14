// Type definitions for @moltin/js-sdk
// Project: @moltin/sdk

import * as config from './types/config';
import * as storage from './types/storage';
export * from './types/storage';

import * as product from './types/product';
import * as core from './types/core';
import * as customer from './types/customer';
import * as order from './types/order';
import * as cart from './types/cart';
import * as address from './types/address';
import * as inventory from './types/inventory';
import * as field from './types/field';
import * as collection from './types/collection';
import * as category from './types/category';
import * as brand from './types/brand';
import * as currency from './types/currency';
import * as integration from './types/integration';
import * as job from './types/job';
import * as file from './types/file';
import * as flow from './types/flow';
import * as transaction from './types/transaction';
import * as settings from './types/settings';

export * from './types/config';
export * from './types/storage';

export * from './types/price';
export * from './types/product';
export * from './types/core';
export * from './types/customer';
export * from './types/order';
export * from './types/cart';
export * from './types/address';
export * from './types/inventory';
export * from './types/field';
export * from './types/collection';
export * from './types/category';
export * from './types/brand';
export * from './types/currency';
export * from './types/integration';
export * from './types/job';
export * from './types/file';
export * from './types/flow';
export * from './types/transaction';
export * from './types/settings';

// UMD
export as namespace moltin

export class Moltin {
  config: config.Config;
  cartId: string;
  request: config.RequestFactory;
  storage: storage.StorageFactory;
  Products: product.ProductsEndpoint;
  Currencies: currency.CurrencyEndpoint;
  Brands: brand.BrandEndpoint;
  Categories: category.CategoryEndpoint;
  Collections: collection.CollectionEndpoint;
  Integrations: integration.IntegrationEndpoint;
  Orders: order.OrdersEndpoint;
  Gateways: moltin.GatewaysEndpoint;
  Customers: customer.CustomersEndpoint;
  Inventories: inventory.InventoryEndpoint;
  Jobs: job.JobEndpoint;
  Files: file.FileEndpoint;
  Flows: flow.FlowEndpoint;
  Fields: field.FieldsEndpoint;
  Addresses: address.AddressesEndpoint;
  Transactions: transaction.TransactionEndpoint;
  Settings: settings.SettingsEndpoint;

  Cart(id?: string): cart.CartEndpoint; // This optional cart id is super worrying when using the SDK in a node server :/
  constructor(config: config.Config);

  Authenticate(): Promise<config.AuthenticateResponseBody>;
}

export function gateway(config: config.ConfigOptions): Moltin;

export namespace moltin {

  export interface GatewaysEndpoint extends core.QueryableResource<null, null, null, null> {
    endpoint: 'gateways'

    Update<RequestBody = any, ResponseBody = any>(
      slug: string,
      body: RequestBody
    ): Promise<ResponseBody>;

    Enabled<T>(slug: string, enabled: boolean): Promise<T>;
  }

  export interface Settings {
    additional_languages?: string[];
    calculation_method?: string;
    list_child_products?: boolean;
    page_length?: number;
  }
}
