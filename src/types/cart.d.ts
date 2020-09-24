/**
 * Carts
 * Description: A Cart contains the product and custom cart items that a user may wish to purchase. Once a Cart is ready
 * for Checkout, you can use the Checkout endpoint to convert the cart to an order.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/index.html
 */
import { Resource } from './core';
import { Address } from './address';
import { Price, FormattedPrice } from './price';
import { Order } from './order';

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

export interface Cart {
  id: string;
  type: string;
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
}

export interface CartItem extends CartItemBase {
  id: string;
  type: string;
  product_id: string;
  name: string;
  description: string;
  sku: string;
  slug: string;
  image: { mime_type: string, file_name: string, href: string };
  quantity: number;
  manage_stock: boolean;
  unit_price: Price;
  value: Price;
  links: {
    product: string;
  };
  meta: {
    display_price: {
      with_tax: {
        unit: FormattedPrice;
        value: FormattedPrice;
      };
      without_tax: {
        unit: FormattedPrice;
        value: FormattedPrice;
      }
      tax: {
        unit: FormattedPrice;
        value: FormattedPrice;
      }
    };
    timestamps: {
      created_at: string;
      updated_at: string;
    };
  };
}

export interface CartItemsResponse {
  data: CartItem[];
  meta: {
    display_price: {
      with_tax: FormattedPrice;
      without_tax: FormattedPrice;
      tax: FormattedPrice;
    };
    timestamps: {
      created_at: string;
      updated_at: string;
    };
  };
}

export interface CartEndpoint {
  // CartEndpoint
  endpoint: 'carts';
  cartId: string;

  Get(): Promise<Resource<Cart>>;

  Items(): Promise<CartItemsResponse>;

  AddProduct(productId: string, quantity?: number, data?: any): Promise<CartItemsResponse>;

  AddCustomItem(item: any): Promise<CartItemsResponse>;

  AddPromotion(code: string): Promise<CartItemsResponse>;

  RemoveItem(itemId: string): Promise<CartItemsResponse>;

  UpdateItem(itemId: string, quantity: number, data?: any): Promise<CartItemsResponse>;

  /**
   * @deprecated Use UpdateItem method
   */
  UpdateItemQuantity(itemId: string, quantity: number): Promise<CartItemsResponse>;

  AddItemTax(itemId: string, taxData: ItemTaxObject): Promise<Resource<ItemTaxObject>>;

  RemoveItemTax(itemId: string, taxItemId: string): Promise<{}>;

  Checkout(
    customer: string | CheckoutCustomer | CheckoutCustomerObject,
    billingAddress: Partial<Address>,
    shippingAddress?: Partial<Address>
  ): Promise<Resource<Order>>;

  Delete(): Promise<{}>;
}
