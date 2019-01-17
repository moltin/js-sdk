// Type definitions for @moltin/js-sdk
// Project: @moltin/sdk

// UMD
export as namespace moltin

export class Moltin {
  config: moltin.Config
  cartId: string
  request: moltin.RequestFactory
  storage: moltin.StorageFactory
  Products: moltin.ProductsEndpoint
  Currencies: moltin.CurrenciesEndpoint
  Brands: moltin.BrandsEndpoint
  Categories: moltin.CategoriesEndpoint
  Collections: moltin.CollectionsEndpoint
  Integrations: moltin.IntegrationsEndpoint
  Orders: moltin.OrdersEndpoint
  Gateways: moltin.GatewaysEndpoint
  Customers: moltin.CustomersEndpoint
  Inventories: moltin.InventoriesEndpoint
  Jobs: moltin.JobsEndpoint
  Files: moltin.FilesEndpoint
  Flows: moltin.FlowsEndpoint
  Fields: moltin.FieldsEndpoint
  Addresses: moltin.AddressesEndpoint
  Transactions: moltin.TransactionsEndpoint
  Cart(id?: string): moltin.CartEndpoint // This optional cart id is super worrying when using the SDK in a node server :/
  constructor(config: moltin.Config)
  Authenticate(): Promise<moltin.AuthenticateResponseBody>
}

export function gateway(config: moltin.ConfigOptions): Moltin

export namespace moltin {
  export interface ConfigOptions {
    application?: string
    client_id: string
    client_secret?: string
    currency?: string
    host?: string
  }

  export interface Config {
    application?: string
    client_id: string
    client_secret?: string
    host: string
    protocol: 'https'
    version: 'v2'
    currency?: string
    auth: {
      expires: 3600
      uri: 'oauth/access_token'
    }
    sdk: {
      version: string
      language: 'JS'
    }
    constructor(options: ConfigOptions)
  }

  export interface StorageFactory {
    localStorage: Storage
    set(key: string, value: string): void
    get(key: string): string | null
    delete(key: string): void
  }

  export enum HttpVerbs {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Patch = 'PATCH',
    Delete = 'DELETE'
  }

  export enum GrantType {
    ClientCredentials = 'client_credentials',
    Implicit = 'implicit'
  }

  export interface AuthenticateResponseBody {
    expires: number
    identifier: GrantType
    expires_in: number
    access_token: string
    token_type: 'Bearer'
  }

  export interface RequestFactory {
    config: Config
    storage: StorageFactory
    authenticate(): Promise<AuthenticateResponseBody>
    send<T = any>(
      uri: string,
      method: HttpVerbs,
      body?: any,
      token?: string
    ): Promise<T>
    constructor(Config)
  }

  export interface BaseExtend {
    request: RequestFactory
    config: Config
    constructor(config: Config)
    All<T = any>(token?: string): Promise<T>
    Get<T = any>(id: string, token?: string): Promise<T>
    Filter(filter: any): this
    Limit(value: number): this
    Offset(value: number): this
    Sort(value: string): this
    With(includes: string | string[]): this
  }

  export interface CRUDExtend extends BaseExtend {
    Create<RequestBody = any, ResponseBody = any>(
      body: RequestBody
    ): Promise<ResponseBody>
    Delete<T = any>(id: string): Promise<T>
    Update<RequestBody = any, ResponseBody = any>(
      id: string,
      body: RequestBody
    ): Promise<ResponseBody>
  }

  export interface ProductsEndpoint extends CRUDExtend {
    endpoint: 'products'
    CreateRelationships<T = any>(
      id: string,
      type: string,
      resources: string[]
    ): Promise<T>
    DeleteRelationships<T = any>(
      id: string,
      type: string,
      resources: string[]
    ): Promise<T>
    UpdateRelationships<T = any>(
      id: string,
      type: string,
      resources: string[]
    ): Promise<T>
  }

  export interface CurrenciesEndpoint extends BaseExtend {
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

  export interface IntegrationsEndpoint extends CRUDExtend {
    endpoint: 'integrations'
  }

  export interface BrandsEndpoint extends CRUDExtend {
    endpoint: 'brands'
  }

  export interface CategoriesEndpoint extends CRUDExtend {
    endpoint: 'categories'
    Tree<T = any>(): Promise<T>
  }

  export interface CollectionsEndpoint extends CRUDExtend {
    endpoint: 'collections'
  }

  export interface OrdersEndpoint extends BaseExtend {
    endpoint: 'orders'
    Items<T = any>(id: string): Promise<T>
    Payment<RequestBody = any, ResponseBody = any>(
      id: string,
      body: RequestBody
    ): Promise<ResponseBody>
    Update<RequestBody = any, ResponseBody = any>(
      id: string,
      body: RequestBody
    ): Promise<ResponseBody>
  }

  export interface GatewaysEndpoint extends BaseExtend {
    endpoint: 'gateways'
    Update<RequestBody = any, ResponseBody = any>(
      slug: string,
      body: RequestBody
    ): Promise<ResponseBody>
    Enabled<T>(slug: string, enabled: boolean): Promise<T>
  }

  export interface CustomersEndpoint extends CRUDExtend {
    endpoint: 'customers'
    Token<T = any>(email: string, password: string): Promise<T>
  }

  export interface InventoriesEndpoint extends BaseExtend {
    endpoint: 'inventories'
    Get<T = any>(productId: string): Promise<T>
    IncrementStock<T = any>(productId: string, quantity: number): Promise<T>
    DecrementStock<T = any>(productId: string, quantity: number): Promise<T>
    AllocateStock<T = any>(productId: string, quantity: number): Promise<T>
    DeallocateStock<T = any>(productId: string, quantity: number): Promise<T>
    GetTransactions<T = any>(productId: string): Promise<T>
  }

  export interface JobsEndpoint extends BaseExtend {
    endpoint: 'jobs'
    Create<RequestBody = any, ResponseBody = any>(
      body: RequestBody
    ): Promise<ResponseBody>
  }

  export interface FilesEndpoint extends BaseExtend {
    endpoint: 'files'
  }

  export interface FlowsEndpoint extends CRUDExtend {
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

  export interface FieldsEndpoint extends CRUDExtend {
    endpoint: 'fields'
  }

  // NOTE: The implementation of `AddressesEndpoint` extends `BaseExtend` however it breaks
  // polymorphism my defining an incompatible signature for `All` and `Get` so having to
  // redeclare the BaseExtend methods.
  export interface AddressesEndpoint {
    // BaseExtend
    request: RequestFactory
    config: Config
    constructor(config: Config)
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

  // NOTE: The implementation of `TransactionsEndpoint` extends `BaseExtend` however it breaks
  // polymorphism my defining an incompatible signature for `All` so having to redeclare the
  // BaseExtend methods.
  export interface TransactionsEndpoint {
    // BaseExtend
    request: RequestFactory
    config: Config
    constructor(config: Config)
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

  export interface CheckoutCustomer {
    id: string
  }

  export interface CheckoutCustomerObject {
    email: string
    name: string
  }

  export interface Address {
    first_name: string
    last_name: string
    company_name?: string
    line_1: string
    line_2?: string
    city?: string
    postcode: string
    county: string
    country: string
    phone_number?: string
    instructions?: string
  }

  export interface ItemTaxObject {
    name: string
    jurisdiction: string
    code: string
    rate: number
  }

  // NOTE: The implementation of `CartEndpoint` extends `BaseExtend` however it breaks
  // polymorphism my defining an incompatible signature for `constructor` so having to
  // redeclare the BaseExtend methods.
  // NOTE: It actually results in a runtime bug where `this.config instanceof RequestFactory`
  interface CartEndpoint {
    // BaseExtend
    request: RequestFactory
    config: Config
    // constructor(config: Config)
    All<T = any>(token?: string): Promise<T>
    Filter(filter: any): this
    Limit(value: number): this
    Offset(value: number): this
    Sort(value: string): this
    With(includes: string | string[]): this

    // CartEndpoint
    endpoint: 'carts'
    cartId: string
    constructor(request: RequestFactory, id: string)
    Get<T = any>(): Promise<T>
    Items<T = any>(): Promise<T>
    AddProduct<T = any>(productId: string, quantity?: number, data?: any): Promise<T>
    AddCustomItem<RequestBody = any, ResponseBody = any>(
      body: RequestBody
    ): Promise<ResponseBody>
    AddPromotion<T = any>(code: string): Promise<T>
    RemoveItem<T = any>(itemId: string): Promise<T>
    UpdateItem<T = any>(itemId: string, quantity: number, data?: any): Promise<T>

    /**
     * @deprecated Use UpdateItem method
     */
    UpdateItemQuantity<T = any>(itemId: string, quantity: number): Promise<T>
    AddItemTax<T = any>(itemId: string, taxData: ItemTaxObject)
    RemoveItemTax<T = any>(itemId: string, taxItemId: string)
    Checkout<T = any>(
      customer: CheckoutCustomer | CheckoutCustomerObject,
      billingAddress: Address,
      shippingAddress?: Address
    ): Promise<T>
    Delete<T = any>(): Promise<T>
  }
}
