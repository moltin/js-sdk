/**
 * Carts
 * Description: A Cart contains the product and custom cart items that a user may wish to purchase. Once a Cart is ready
 * for Checkout, you can use the Checkout endpoint to convert the cart to an order.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/index.html
 */
import { ResourcePage } from './core'

export as namespace cart

export namespace cart {
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

  /**
   * Core Cart Base Interface
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/index.html
   */
  export interface CartBase {
    id: string
    type: string
    links: {}
    meta?: {
      display_price: {
        with_tax: {
          amount: number
          currency: string
          formatted: string
        }
        display_price: {
          amount: number
          currency: string
          formatted: string
          tax: {
            amount: number
            currency: string
            formatted: string
          }
        }
        timestamps: {
          created_at: string
          updated_at: string
        }
      }
    }
  }

  export interface CartItem {
    id?: string
    tax: {}[]
    quantity?: number
    type: string
  }


  type CartInclude = 'items'

  export interface CartEndpoint {
    // CartEndpoint
    endpoint: 'carts'
    cartId: string

    Get(): Promise<CartBase>

    Items(): Promise<ResourcePage<CartItem>>

    AddProduct(
      productId: string,
      quantity?: number,
      data?: any
    ): Promise<ResourcePage<CartItem>>

    AddCustomItem(body: { reference: string }): Promise<ResourcePage<CartItem>>


    AddPromotion(code: string): Promise<ResourcePage<CartItem>>

    RemoveItem(itemId: string): Promise<ResourcePage<CartItem>>

    UpdateItem(
      itemId: string,
      quantity: number,
      data?: any
    ): Promise<ResourcePage<CartItem>>

    /**
     * @deprecated Use UpdateItem method
     */
    UpdateItemQuantity(itemId: string, quantity: number): Promise<ResourcePage<CartItem>>

    AddItemTax(itemId: string, taxData: ItemTaxObject): Promise<ResourcePage<CartItem>>

    RemoveItemTax(itemId: string, taxItemId: string): Promise<ResourcePage<CartItem>>

    Checkout(
      customer: CheckoutCustomer | CheckoutCustomerObject,
      billingAddress: Address,
      shippingAddress?: Address
    ): Promise<ResourcePage<CartItem>>

    Delete(): Promise<ResourcePage<CartItem>>
  }
}