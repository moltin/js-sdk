import 'fetch-everywhere';
import 'es6-promise';

import Config from './config';
import RequestFactory from './factories/request';
import StorageFactory from './factories/storage';
import ProductsEndpoint from './endpoints/products';
import CurrenciesEndpoint from './endpoints/currencies';
import BrandsEndpoint from './endpoints/brands';
import CartEndpoint from './endpoints/cart';
import CategoriesEndpoint from './endpoints/categories';
import CollectionsEndpoint from './endpoints/collections';
import OrdersEndpoint from './endpoints/orders';
import GatewaysEndpoint from './endpoints/gateways';
import CustomersEndpoint from './endpoints/customers';

export default class Moltin {
  constructor(config) {
    this.config = config;
    this.request = new RequestFactory(config);
    this.storage = new StorageFactory();

    this.Products = new ProductsEndpoint(config);
    this.Currencies = new CurrenciesEndpoint(config);
    this.Brands = new BrandsEndpoint(config);
    this.Cart = new CartEndpoint(config);
    this.Categories = new CategoriesEndpoint(config);
    this.Collections = new CollectionsEndpoint(config);
    this.Orders = new OrdersEndpoint(config);
    this.Gateways = new GatewaysEndpoint(config);
    this.Customers = new CustomersEndpoint(config);
  }

  // Expose `authenticate` function on the Moltin class
  Authenticate() {
    return this.request.authenticate();
  }
}

// Export a function to instantiate the Moltin class
const gateway = config => new Moltin(new Config(config));

export { gateway };
