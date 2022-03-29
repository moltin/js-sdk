import './utils/fetch-polyfill'
import 'es6-promise'

import Config from './config'
import RequestFactory from './factories/request'
import ProductsEndpoint from './endpoints/products'
import CurrenciesEndpoint from './endpoints/currencies'
import BrandsEndpoint from './endpoints/brands'
import CartEndpoint from './endpoints/cart'
import PCMEndpoint from './endpoints/pcm'
import CategoriesEndpoint from './endpoints/categories'
import CollectionsEndpoint from './endpoints/collections'
import IntegrationsEndpoint from './endpoints/integrations'
import OrdersEndpoint from './endpoints/orders'
import GatewaysEndpoint from './endpoints/gateways'
import CustomersEndpoint from './endpoints/customers'
import InventoriesEndpoint from './endpoints/inventories'
import JobsEndpoint from './endpoints/jobs'
import FlowsEndpoint from './endpoints/flows'
import PriceBooksEndpoint from './endpoints/price-books'
import FieldsEndpoint from './endpoints/fields'
import FilesEndpoint from './endpoints/files'
import CustomerAddressesEndpoint from './endpoints/customer-addresses'
import AccountAddressesEndpoint from './endpoints/account-addresses'
import TransactionsEndpoint from './endpoints/transactions'
import SettingsEndpoint from './endpoints/settings'
import LocalStorageFactory from './factories/local-storage'
import MemoryStorageFactory from './factories/memory-storage'
import PromotionsEndpoint from './endpoints/promotions'
import VariationsEndpoint from './endpoints/variations'
import AuthenticationRealmEndpoint from './endpoints/authentication-realm'
import OidcProfileEndpoint from './endpoints/oidc-profile'
import UserAuthenticationInfoEndpoint from './endpoints/user-authentication-info'
import PasswordProfileEndpoint from './endpoints/password-profile'
import UserAuthenticationPasswordProfileEndpoint from './endpoints/user-authentication-password-profile'
import AuthenticationSettingsEndpoint from './endpoints/authentication-settings'
import HierarchiesEndpoint from './endpoints/hierarchies'
import MerchantRealmMappingsEndpoint from './endpoints/merchant-realm-mappings'
import Accounts from './endpoints/accounts'
import AccountMembersEndpoint from './endpoints/account-members'
import AccountAuthenticationSettingsEndpoint from './endpoints/account-authentication-settings'
import AccountMembershipsEndpoint from './endpoints/account-memberships'
import PCMVariationsEndpoint from './endpoints/pcm-variations'
import MetricsEndpoint from './endpoints/metrics'
import PersonalDataEndpoint from './endpoints/personal-data'

import { cartIdentifier, tokenInvalid, getCredentials } from './utils/helpers'
import CatalogsEndpoint from './endpoints/catalogs'
import CatalogEndpoint from './endpoints/catalog'

export default class Moltin {
  constructor(config) {
    this.config = config

    if (!config.disableCart) this.cartId = cartIdentifier(config.storage)

    this.tokenInvalid = () => tokenInvalid(config)

    this.request = new RequestFactory(config)
    this.storage = config.storage
    this.credentials = () => getCredentials(config.storage)

    this.Products = new ProductsEndpoint(config)
    this.PCM = new PCMEndpoint(config)
    this.Catalogs = new CatalogsEndpoint(config)
    this.Catalog = new CatalogEndpoint(config)
    this.Currencies = new CurrenciesEndpoint(config)
    this.Brands = new BrandsEndpoint(config)
    this.PriceBooks = new PriceBooksEndpoint(config)
    this.Categories = new CategoriesEndpoint(config)
    this.Hierarchies = new HierarchiesEndpoint(config)
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
    this.CustomerAddresses = new CustomerAddressesEndpoint(config)
    this.AccountAddresses = new AccountAddressesEndpoint(config)
    this.Transactions = new TransactionsEndpoint(config)
    this.Settings = new SettingsEndpoint(config)
    this.Promotions = new PromotionsEndpoint(config)
    this.Variations = new VariationsEndpoint(config)
    this.PCMVariations = new PCMVariationsEndpoint(config)
    this.PersonalData = new PersonalDataEndpoint(config)
    this.AuthenticationRealm = new AuthenticationRealmEndpoint(config)
    this.OidcProfile = new OidcProfileEndpoint(config)
    this.UserAuthenticationInfo = new UserAuthenticationInfoEndpoint(config)
    this.PasswordProfile = new PasswordProfileEndpoint(config)
    this.AuthenticationSettings = new AuthenticationSettingsEndpoint(config)
    this.MerchantRealmMappings = new MerchantRealmMappingsEndpoint(config)
    this.Accounts = new Accounts(config)
    this.AccountAuthenticationSettings = new AccountAuthenticationSettingsEndpoint(
      config
    )
    this.AccountMembers = new AccountMembersEndpoint(config)
    this.AccountMemberships = new AccountMembershipsEndpoint(config)
    this.UserAuthenticationPasswordProfile = new UserAuthenticationPasswordProfileEndpoint(
      config
    )
    this.Metrics = new MetricsEndpoint(config)
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
