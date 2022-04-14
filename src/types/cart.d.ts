/**
 * Carts
 * Description: A Cart contains the product and custom cart items that a user may wish to purchase. Once a Cart is ready
 * for Checkout, you can use the Checkout endpoint to convert the cart to an order.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/index.html
 */
import { Resource, QueryableResource } from './core'
import { Address } from './address'
import { Price, FormattedPrice } from './price'
import { Order } from './order'

export interface CheckoutCustomer {
  id: string
}

export interface CheckoutCustomerObject {
  email: string
  name: string
}

export interface CreateCartObject {
  id?: string
  name: string
  description?: string
}

/**
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/cart-items/tax-items/index.html
 */
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

export interface Cart {
  id: string
  type: string
  links?: {}
  meta?: {
    display_price?: {
      with_tax?: FormattedPrice
      without_tax?: FormattedPrice
      tax?: FormattedPrice
    }
    timestamps?: {
      created_at: string
      updated_at: string
      expires_at: string
    }
  }
}

export interface CartItemBase {
  id: string
  quantity: number

  [key: string]: any
}

/**
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/cart-items/index.html
 */
export interface CartItem extends CartItemBase {
  id: string
  type: string
  product_id: string
  name: string
  description: string
  sku: string
  slug: string
  image: { mime_type: string; file_name: string; href: string }
  quantity: number
  manage_stock: boolean
  unit_price: Price
  value: Price
  links: {
    product: string
  }
  meta: {
    display_price: {
      with_tax: {
        unit: FormattedPrice
        value: FormattedPrice
      }
      without_tax: {
        unit: FormattedPrice
        value: FormattedPrice
      }
      tax: {
        unit: FormattedPrice
        value: FormattedPrice
      }
    }
    timestamps: {
      created_at: string
      updated_at: string
      expires_at: string
    }
  }
}

export interface CartItemsResponse {
  data: CartItem[]
  meta: {
    display_price: {
      with_tax: FormattedPrice
      without_tax: FormattedPrice
      tax: FormattedPrice
    }
    timestamps: {
      created_at: string
      updated_at: string
      expires_at: string
    }
  }
}

export interface CartItemObject {
  type: string
  name?: string
  sku?: string
  description?: string
  quantity?: number
  price?: any
  id?: string
  code?: string
}

export interface CartEndpoint
  extends QueryableResource<Cart, never, never, never> {
  endpoint: 'carts'
  cartId: string

  /**
   * Get a Cart by reference
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/get-a-cart.html
   */
  Get(): Promise<Resource<Cart>>

  /**
   * Get Cart Items
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/cart-items/get-cart-items.html
   */
  Items(): Promise<CartItemsResponse>

  /**
   * Add Product to Cart
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/add-product-to-cart.html
   * @param productId the ID of the product you want to add to cart.
   * @param quantity the amount of products to add to cart
   * @param data
   */
  AddProduct(
    productId: string,
    quantity?: number,
    data?: any,
    isSku?: boolean
  ): Promise<CartItemsResponse>

  /**
   * Add Custom Item to Cart
   * Description: You want to add a custom item to the cart to handle things like shipping, taxes and inventory you don’t manage with Commerce Cloud.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/add-custom-item-to-cart.html
   * @param item An custom item you want to add to the cart
   */
  AddCustomItem(item: any): Promise<CartItemsResponse>

  /**
   * Add Promotion to Cart
   * Description: You can use the Promotions API to apply discounts to your cart as a special cart item type.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/add-promotion-to-cart.html
   * @param code the promotion code.
   * @param token a customer token to apply customer specific promotions.
   */
  AddPromotion(code: string, token?: string): Promise<CartItemsResponse>

  /**
   * Get a Cart by reference
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/get-a-cart.html
   */
  Get(): Promise<Resource<Cart>>

  /**
   * Remove Cart Item
   * Description: You can easily remove items from the Cart. A successful Cart item removal request returns the cart items.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/cart-items/remove-cart-item.html
   * @param itemId the unique identifier for this cart item.

   /**
   * Get Cart Items
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/cart-items/get-cart-items.html
   */
  RemoveItem(itemId: string): Promise<CartItemsResponse>

  Items(): Promise<CartItemsResponse>

  /**
   * Add Product to Cart
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/add-product-to-cart.html
   * @param productId the ID of the product you want to add to cart.
   * @param quantity the amount of products to add to cart
   * @param data
   */
  AddProduct(
    productId: string,
    quantity?: number,
    data?: any
  ): Promise<CartItemsResponse>

  RemoveAllItems(): Promise<CartItemsResponse>

  /**
   * Add Custom Item to Cart
   * Description: You want to add a custom item to the cart to handle things like shipping, taxes and inventory you don’t manage with Commerce Cloud.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/add-custom-item-to-cart.html
   * @param item An custom item you want to add to the cart
   */
  AddCustomItem(item: any): Promise<CartItemsResponse>

  /**
   * Update Cart Item
   * Description: You can easily update a Cart item. A successful update returns the cart items.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/cart-items/update-cart-item.html
   * @param itemId the unique identifier for this cart item.
   * @param quantity The amount of products to add to cart.
   * @param customData
   */
  UpdateItem(
    itemId: string,
    quantity: number,
    customData?: any
  ): Promise<CartItemsResponse>

  /**
   * Add Promotion to Cart
   * Description: You can use the Promotions API to apply discounts to your cart as a special cart item type.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/add-promotion-to-cart.html
   * @param code the promotion code.
   */
  AddPromotion(code: string): Promise<CartItemsResponse>

  /**
   * Bulk Update Items to Cart
   * Description: When you enable the bulk update feature, a shopper can update an array of items to their cart in one action, rather than updating each item one at a time.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/bulk-update-to-cart.html
   * @param items a cart items or custom items
   */
  UpdateItems(items: CartItemBase[]): Promise<CartItemsResponse>

  /**
   * Create Cart
   * @param token a customer token to access specific customer orders.
   * @param data a cart data.
   */
  CreateCart(data: CreateCartObject, token?: string): Promise<Resource<Cart>>

  /**
   * Update Cart
   * @param token a customer token to access specific customer orders.
   * @param data a cart data.
   */
  UpdateCart(data: CreateCartObject, token?: string): Promise<CartItemsResponse>

  /**
   * Bulk Add Items to Cart
   * Description: When you enable the bulk add feature, a shopper can add an array of items to their cart in one action, rather than adding each item one at a time.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/bulk-add-to-cart.html
   * @param data An cart items or custom items
   */
  BulkAdd(data: CartItemObject[]): Promise<CartItemsResponse>

  /**
   * Get Carts List
   * @param token a customer token to access specific customer orders.
   */
  GetCartsList(token?: string): Promise<CartItemsResponse>

  /**
   * Remove Cart Item
   * Description: You can easily remove items from the Cart. A successful Cart item removal request returns the cart items.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/cart-items/remove-cart-item.html
   * @param itemId the unique identifier for this cart item.

   */
  RemoveItem(itemId: string): Promise<CartItemsResponse>

  RemoveAllItems(): Promise<CartItemsResponse>

  /**
   * Update Cart Item
   * Description: You can easily update a Cart item. A successful update returns the cart items.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/cart-items/update-cart-item.html
   * @param itemId the unique identifier for this cart item.
   * @param quantity The amount of products to add to cart.
   * @param customData
   */
  UpdateItem(
    itemId: string,
    quantity: number,
    customData?: any
  ): Promise<CartItemsResponse>

  /**
   * Bulk Update Items to Cart
   * Description: When you enable the bulk update feature, a shopper can update an array of items to their cart in one action, rather than updating each item one at a time.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/bulk-update-to-cart.html
   * @param items a cart items or custom items
   */
  UpdateItems(items: CartItemBase[]): Promise<CartItemsResponse>

  /**
   * Create Cart
   * @param token a customer token to access specific customer orders.
   * @param data a cart data.
   */
  CreateCart(data: CreateCartObject, token?: string): Promise<CartItemsResponse>

  /**
   * Update Cart
   * @param token a customer token to access specific customer orders.
   * @param data a cart data.
   */
  UpdateCart(data: CreateCartObject, token?: string): Promise<CartItemsResponse>

  /**
   * Get Carts List
   * @param token a customer token to access specific customer orders.
   */
  GetCartsList(token?: string): Promise<CartItemsResponse>

  /**
   * Customer Cart Associations
   * Description: You can create an association between a customer and a cart with the capability to delete any associations as required.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/customer-cart-associations.html
   * @param customerId the id of the customer.
   * @param token a customer token to access specific customer orders.
   */
  AddCustomerAssociation(
    customerId: string,
    token: string
  ): Promise<CartItemsResponse>

  /**
   * Customer Cart Associations
   * Description: You can create an association between a customer and a cart with the capability to delete any associations as required.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/customer-cart-associations.html
   * @param customerId the id of the customer.
   * @param token a customer token to access specific customer orders.
   */
  AddCustomerAssociation(
    customerId: string,
    token: string
  ): Promise<CartItemsResponse>

  /**
   * @deprecated Use UpdateItem method
   */
  UpdateItemQuantity(
    itemId: string,
    quantity: number
  ): Promise<CartItemsResponse>

  /**
   * Create a Tax Item
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/cart-items/tax-items/create-a-tax-item.html
   * @param itemId the unique identifier for this cart item.
   * @param taxData the tax item object
   */
  AddItemTax(
    itemId: string,
    taxData: ItemTaxObject
  ): Promise<Resource<ItemTaxObject>>

  /**
   * Update a Tax Item
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/cart-items/tax-items/update-a-tax-item.html
   * @param itemId the unique identifier for this cart item.
   * @param taxItemId ID of the tax item to update.
   * @param taxData the tax item object
   */
  UpdateItemTax(
    itemId: string,
    taxItemId: string,
    taxData: ItemTaxObject
  ): Promise<Resource<ItemTaxObject>>

  /**
   * Delete a Tax Item
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/cart-items/tax-items/delete-a-tax-item.html
   * @param itemId the unique identifier for this cart item.
   * @param taxItemId ID of the tax item to update.
   */
  RemoveItemTax(itemId: string, taxItemId: string): Promise<{}>

  /**
   * Checkout
   * Description: Once a Cart is ready to checkout, you can easily convert your Cart to an Order.
   * The Cart remains and can be modified and checked out again if required.
   * Once a successful Checkout is completed, the response contains the order.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/checkout.html
   * @param customer the customer ID or Customer object.
   * @param billingAddress billing address
   * @param shippingAddress shipping address, billingAddress is used if shippingAddress not provided
   */
  Checkout(
    customer: string | CheckoutCustomer | CheckoutCustomerObject,
    billingAddress: Partial<Address>,
    shippingAddress?: Partial<Address>
  ): Promise<Resource<Order>>

  /**
   * Delete a Cart
   * Description: You can easily remove all items from a cart.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/carts/delete-a-cart.html
   */
  Delete(): Promise<{}>
}
