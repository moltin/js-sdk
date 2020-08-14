/**
 * Carts
 * Description: A Cart contains the product and custom cart items that a user may wish to purchase. Once a Cart is ready
 * for Checkout, you can use the Checkout endpoint to convert the cart to an order.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/index.html
 */
import { Identifiable, ResourcePage, Resource } from './core';
import { Address } from './address';

export interface CheckoutCustomer {
  id: string
}

export interface CheckoutCustomerObject {
  email: string
  name: string
}

export interface ItemTaxObject {
  name: string;
  jurisdiction: string;
  code: string;
  rate: number;
}

/**
 * Core Cart Base Interface
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/index.html
 */
export interface CartBase {
  type: string;
}

export interface Cart extends Identifiable, CartBase {
  links?: {};
  meta?: {
    display_price?: {
      with_tax?: {
        amount: number;
        currency: string;
        formatted: string;
      };
      display_price?: {
        amount: number;
        currency: string;
        formatted: string;
        tax: {
          amount: number;
          currency: string;
          formatted: string;
        };
      };
      timestamps?: {
        created_at: string;
        updated_at: string;
      };
    };
  };
}

export interface CartItemBase {
  tax: {}[];
  quantity: number;
  type: string;
}

export interface CartItem extends Identifiable, CartItemBase {
}

export interface CartEndpoint {
  // CartEndpoint
  endpoint: 'carts';
  cartId: string;

  Get(): Promise<Cart>;

  Items(): Promise<ResourcePage<CartItem>>;

  AddProduct(
    productId: string,
    quantity?: number,
    data?: any
  ): Promise<ResourcePage<CartItem>>;

  AddCustomItem(item: any): Promise<ResourcePage<CartItem>>;

  AddPromotion(code: string): Promise<ResourcePage<CartItem>>;

  RemoveItem(itemId: string): Promise<ResourcePage<CartItem>>;

  UpdateItem(
    itemId: string,
    quantity: number,
    data?: any
  ): Promise<ResourcePage<CartItem>>;

  /**
   * @deprecated Use UpdateItem method
   */
  UpdateItemQuantity(itemId: string, quantity: number): Promise<ResourcePage<CartItem>>;

  AddItemTax(itemId: string, taxData: ItemTaxObject): Promise<Resource<ItemTaxObject>>;

  RemoveItemTax(itemId: string, taxItemId: string): Promise<{}>;

  Checkout(
    customer: string | CheckoutCustomer | CheckoutCustomerObject,
    billingAddress: Partial<Address>,
    shippingAddress?: Partial<Address>
  ): Promise<ResourcePage<CartItem>>;

  Delete(): Promise<{}>;
}
