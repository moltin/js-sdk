import Abstract from '../abstract';

class ProductsEndpoint extends Abstract {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'products';
  }
}

export default ProductsEndpoint;
