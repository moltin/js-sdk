import 'fetch-everywhere'
import 'es6-promise'

import Config from './config'
import RequestFactory from './factories/request'
import ProductsEndpoint from './endpoints/products'
import CurrenciesEndpoint from './endpoints/currencies'
import BrandsEndpoint from './endpoints/brands'
import CartEndpoint from './endpoints/cart'
import CategoriesEndpoint from './endpoints/categories'
import CollectionsEndpoint from './endpoints/collections'
import IntegrationsEndpoint from './endpoints/integrations'
import OrdersEndpoint from './endpoints/orders'
import GatewaysEndpoint from './endpoints/gateways'
import CustomersEndpoint from './endpoints/customers'
import InventoriesEndpoint from './endpoints/inventories'
import JobsEndpoint from './endpoints/jobs'
import FlowsEndpoint from './endpoints/flows'
import FieldsEndpoint from './endpoints/fields'
import FilesEndpoint from './endpoints/files'
import AddressesEndpoint from './endpoints/addresses'
import TransactionsEndpoint from './endpoints/transactions'
import SettingsEndpoint from './endpoints/settings'
import LocalStorageFactory from './factories/local-storage'
import MemoryStorageFactory from './factories/memory-storage'
import PromotionsEndpoint from './endpoints/promotions'
import VariationsEndpoint from './endpoints/variations'
import AuthenticationRealmEndpoint from './endpoints/authentication-realm'
import OidcProfileEndpoint from './endpoints/oidc-profile'
import PasswordProfileEndpoint from './endpoints/password-profile'
import UserAuthenticationPasswordProfileEndpoint from './endpoints/user-authentication-password-profile'
import AuthenticationSettingsEndpoint from './endpoints/authentication-settings'
import Accounts from './endpoints/accounts'
import AccountMembersEndpoint from './endpoints/account-members'
import AccountAuthenticationSettingsEndpoint from './endpoints/account-authentication-settings'
import AccountMembershipsEndpoint from './endpoints/account-memberships'
import UserAuthenticationPasswordProfileEndpoint from './endpoints/user-authentication-password-profile'

import { cartIdentifier, tokenInvalid } from './utils/helpers'

export default class Moltin {
  constructor(config) {
    this.config = config

    if (!config.disableCart) this.cartId = cartIdentifier(config.storage)

    this.tokenInvalid = () => tokenInvalid(config)

    this.request = new RequestFactory(config)
    this.storage = config.storage

    this.Products = new ProductsEndpoint(config)
    this.Currencies = new CurrenciesEndpoint(config)
    this.Brands = new BrandsEndpoint(config)
    this.Categories = new CategoriesEndpoint(config)
    this.Collections = new CollectionsEndpoint(config)
    this.Integrations = new IntegrationsEndpoint(config)
    this.Orders = new OrdersEndpoint(config)
    this.Gateways = new GatewaysEndpoint(config)
    this.Customers = new CustomersEndpoint(config)
    this.Inventories = new InventoriesEndpoint(config)
    this.Jobs = new JobsEndpoint(config)
    this.Files = new FilesEndpoint(config)
    this.Flows = new FlowsEndpoint(config)
    this.Fields = new FieldsEndpoint(config)
    this.Addresses = new AddressesEndpoint(config)
    this.Transactions = new TransactionsEndpoint(config)
    this.Settings = new SettingsEndpoint(config)
    this.Promotions = new PromotionsEndpoint(config)
    this.Variations = new VariationsEndpoint(config)
    this.AuthenticationRealm = new AuthenticationRealmEndpoint(config)
    this.OidcProfile = new OidcProfileEndpoint(config)
    this.PasswordProfile = new PasswordProfileEndpoint(config)
    this.AuthenticationSettings = new AuthenticationSettingsEndpoint(config)
    this.Accounts = new Accounts(config)
    this.AccountAuthenticationSettings = new AccountAuthenticationSettingsEndpoint(
      config
    )
    this.AccountMembers = new AccountMembersEndpoint(config)
    this.AccountMemberships = new AccountMembershipsEndpoint(config)
    this.UserAuthenticationPasswordProfile = new UserAuthenticationPasswordProfileEndpoint(
      config
    )
  }

  // Expose `Cart` class on Moltin class
  Cart(id = this.cartId) {
    return !this.config.disableCart ? new CartEndpoint(this.request, id) : null
  }

  // Expose `authenticate` function on the Moltin class
  Authenticate() {
    return this.request.authenticate()
  }
}

// Export a function to instantiate the Moltin class
const gateway = config => new Moltin(new Config(config))

export { gateway, MemoryStorageFactory, LocalStorageFactory }
