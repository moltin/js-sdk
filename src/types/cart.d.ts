/**
 * Carts
 * Description: A Cart contains the product and custom cart items that a user may wish to purchase. Once a Cart is ready
 * for Checkout, you can use the Checkout endpoint to convert the cart to an order.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-orders/carts/index.html
 */
import {
  Resource,
  QueryableResource,
  ResourceIncluded,
  Identifiable
} from './core'
import { Address } from './address'
import { Price, FormattedPrice } from './price'
import { Order } from './order'
import { PcmProductResponse } from './pcm'

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
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-orders/carts/cart-items/tax-items/index.html
 */
export interface ItemTaxObject {
  type: 'tax-item'
  name: string
  jurisdiction: string
  code: string
  rate: number
}

export interface ItemTaxObjectResponse extends ItemTaxObject {
  id: string
}

/**
 * Core Cart Base Interface
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-orders/carts/index.html
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
  discount_settings: {
    custom_discounts_enabled: boolean
  }
}

export interface CartItemBase {
  id: string
  quantity: number

  [key: string]: any
}

/**
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-orders/carts/cart-items/index.html
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
  shipping_group_id?: string
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
      discount?: {
        unit: FormattedPrice
        value: FormattedPrice
      }
      without_discount?: {
        unit: FormattedPrice
        value: FormattedPrice
      }
      discounts?: FormattedPrice
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
  included?: {
    tax_items?: ItemTaxObjectResponse[]
  }
}

export interface BulkAddOptions {
  add_all_or_nothing: boolean
}

export interface BulkCustomDiscountOptions {
  add_all_or_nothing: boolean
}

export interface MergeCartOptions {
  add_all_or_nothing: boolean
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

export interface CartTaxItemObject {
  type: string
  name: string
  jurisdiction: string
  code: string
  rate: number
  relationships: {
    item: {
      data: {
        type: string
        id: string
      }
    }
  }
}

export type CartInclude = 'items' | 'tax_items'

interface CartQueryableResource<R, F, S>
  extends QueryableResource<Cart, F, S, CartInclude> {
  With(includes: CartInclude | CartInclude[]): CartEndpoint
}

export interface CartIncluded {
  items: CartItem[]
}

export interface CartAdditionalHeaders {
  'EP-Context-Tag'?: string
  'EP-Channel'?: string
  'X-MOLTIN-CURRENCY'?: string
}

export interface CartShippingGroupBase {
  type: string
  include_tax: boolean
  shipping_type: string
  tracking_reference?: string
  address: Address
  delivery_estimate: {
    start: string
    end: string
  }
}

export interface ShippingGroupResponse {
  type: string
  relation: string
  order_id?: string
  cart_id?: string
  shipping_type?: string
  tracking_reference?: string
  address?: Partial<Address>
  payment_status?: string
  shipping_status?: string
  delivery_estimate: {
    start: string
    end: string
  }
  created_at: string
  updated_at: string
  relationships: {
    cart: {
      data: {
        type: string
        id: string
      }
    }
  }
  meta: {
    display_price: {
      tota: {
        amount: number
        currency: string
        formatted: string
      }
      base: {
        amount: number
        currency: string
        formatted: string
      }
      tax: {
        amount: number
        currency: string
        formatted: string
      }
      fees: {
        amount: number
        currency: string
        formatted: string
      }
    }
  }
}

/**
 * DOCS: https://elasticpath.dev/docs/commerce-cloud/carts/custom-discounts/add-custom-discount-to-cart
 */
export interface CartCustomDiscount extends Identifiable {
  type: 'custom_discount'
  external_id: string
  discount_engine: string
  amount: FormattedPrice
  description: string
  discount_code: string
}

export interface CustomDiscountResponse {
  data: CartCustomDiscount
}

export interface CartEndpoint
  extends CartQueryableResource<Cart, never, never> {
  endpoint: 'carts'
  cartId: string

  /**
   * Get a Cart by reference
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-orders/carts/get-a-cart.html
   */
  Get(): Promise<ResourceIncluded<Cart, CartIncluded>>

  /**
   * Get Cart Items
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-orders/carts/cart-items/get-cart-items.html
   */
  Items(): Promise<CartItemsResponse>

  /**
   * Add Product to Cart
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-orders/carts/add-product-to-cart.html
   * @param productId the ID of the product you want to add to cart.
   * @param quantity the amount of products to add to cart
   * @param data
   * @param isSku the default value is `false`, which adds products by product ID. To add products by SKU, set to `true`.
   * @param token customer token
   */
  AddProduct(
    productId: string,
    quantity?: number,
    data?: any,
    isSku?: boolean,
    token?: string,
    additionalHeaders?: CartAdditionalHeaders
  ): Promise<CartItemsResponse>

  /**
   * Add Custom Item to Cart
   * Description: You want to add a custom item to the cart to handle things like shipping, taxes and inventory you don’t manage with Commerce Cloud.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-orders/carts/add-custom-item-to-cart.html
   * @param item An custom item you want to add to the cart
   */
  AddCustomItem(item: any): Promise<CartItemsResponse>

  CreateShippingGroup(
    ShippingGroup: CartShippingGroupBase
  ): Promise<ShippingGroupResponse>

  /**
   * Add Promotion to Cart
   * Description: You can use the Promotions API to apply discounts to your cart as a special cart item type.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-orders/carts/add-promotion-to-cart.html
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
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-orders/carts/cart-items/remove-cart-item.html
   * @param itemId the unique identifier for this cart item.

   /**
   * Get Cart Items
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-orders/carts/cart-items/get-cart-items.html
   */
  RemoveItem(itemId: string): Promise<CartItemsResponse>

  Items(): Promise<CartItemsResponse>

  /**
   * Add Product to Cart
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-orders/carts/add-product-to-cart.html
   * @param productId the ID of the product you want to add to cart.
   * @param quantity the amount of products to add to cart
   * @param data
   */
  AddProduct(
    productId: string,
    quantity?: number,
    data?: any,
    additionalHeaders?: CartAdditionalHeaders
  ): Promise<CartItemsResponse>

  RemoveAllItems(): Promise<CartItemsResponse>

  /**
   * Add Custom Item to Cart
   * Description: You want to add a custom item to the cart to handle things like shipping, taxes and inventory you don’t manage with Commerce Cloud.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-orders/carts/add-custom-item-to-cart.html
   * @param item An custom item you want to add to the cart
   */
  AddCustomItem(item: any): Promise<CartItemsResponse>

  /**
   * Update Cart Item
   * Description: You can easily update a Cart item. A successful update returns the cart items.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-orders/carts/cart-items/update-cart-item.html
   * @param itemId the unique identifier for this cart item.
   * @param quantity The amount of products to add to cart.
   * @param customData
   */
  UpdateItem(
    itemId: string,
    quantity: number,
    customData?: any,
    additionalHeaders?: CartAdditionalHeaders
  ): Promise<CartItemsResponse>

  /**
   * Add Promotion to Cart
   * Description: You can use the Promotions API to apply discounts to your cart as a special cart item type.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-orders/carts/add-promotion-to-cart.html
   * @param code the promotion code.
   */
  AddPromotion(code: string): Promise<CartItemsResponse>

  /**
   * Bulk Update Items to Cart
   * Description: When you enable the bulk update feature, a shopper can update an array of items to their cart in one action, rather than updating each item one at a time.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-orders/carts/bulk-update-to-cart.html
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
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-orders/carts/bulk-add-to-cart.html
   * @param data Cart items or custom items
   * @param options Optional config object for add to cart behaviour
   */
  BulkAdd(
    data: CartItemObject[],
    options?: BulkAddOptions
  ): Promise<CartItemsResponse>

  /**
   * Get Carts List
   * @param token a customer token to access specific customer orders.
   */
  GetCartsList(token?: string): Promise<CartItemsResponse>

  /**
   * Remove Cart Item
   * Description: You can easily remove items from the Cart. A successful Cart item removal request returns the cart items.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-orders/carts/cart-items/remove-cart-item.html
   * @param itemId the unique identifier for this cart item.

   */
  RemoveItem(itemId: string): Promise<CartItemsResponse>

  RemoveAllItems(): Promise<CartItemsResponse>

  /**
   * Update Cart Item
   * Description: You can easily update a Cart item. A successful update returns the cart items.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-orders/carts/cart-items/update-cart-item.html
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
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-orders/carts/bulk-update-to-cart.html
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
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-orders/carts/customer-cart-associations.html
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
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-orders/carts/customer-cart-associations.html
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
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-orders/carts/cart-items/tax-items/create-a-tax-item.html
   * @param itemId the unique identifier for this cart item.
   * @param taxData the tax item object
   */
  AddItemTax(
    itemId: string,
    taxData: ItemTaxObject
  ): Promise<Resource<ItemTaxObjectResponse>>

  /**
   * Bulk Add Items tax to Cart
   * Description: When you enable the bulk add feature, a shopper can add an array of items to their cart in one action, rather than adding each item one at a time.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-orders/carts/bulk-add-to-cart.html
   * @param data Cart items or custom items
   * @param options Optional config object for add to cart behaviour
   */
  BulkAddItemTax(
    data: CartTaxItemObject[],
    options?: BulkAddOptions
  ): Promise<CartTaxItemObject[]>
  /**
   * Update a Tax Item
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-orders/carts/cart-items/tax-items/update-a-tax-item.html
   * @param itemId the unique identifier for this cart item.
   * @param taxItemId ID of the tax item to update.
   * @param taxData the tax item object
   */
  UpdateItemTax(
    itemId: string,
    taxItemId: string,
    taxData: ItemTaxObject
  ): Promise<Resource<ItemTaxObjectResponse>>

  /**
   * Delete a Tax Item
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-orders/carts/cart-items/tax-items/delete-a-tax-item.html
   * @param itemId the unique identifier for this cart item.
   * @param taxItemId ID of the tax item to update.
   */
  RemoveItemTax(itemId: string, taxItemId: string): Promise<{}>

  /**
   * Checkout
   * Description: Once a Cart is ready to checkout, you can easily convert your Cart to an Order.
   * The Cart remains and can be modified and checked out again if required.
   * Once a successful Checkout is completed, the response contains the order.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-orders/checkout.html
   * @param customer the customer ID or Customer object.
   * @param billingAddress billing address
   * @param shippingAddress shipping address, billingAddress is used if shippingAddress not provided
   */
  Checkout(
    customer: string | CheckoutCustomer | CheckoutCustomerObject,
    billingAddress: Partial<Address>,
    shippingAddress?: Partial<Address>,
    additionalHeaders?: CartAdditionalHeaders
  ): Promise<Resource<Order>>

  /**
   * Merge
   * Description: Allows to merge two carts. Moves the cart items from one cart to another.
   * If both the cart items are same, the cart items quantity will be increased
   * DOCS: https://elasticpath.dev/docs/carts/cart-items/merging-carts.html
   * @param cartId the cart Id of the cart to be merged.
   * @param token the customer token of the cart to whom it is associated or to be associated with
   * @param options When true, if an error occurs for any item, no items are added to the cart. When false, valid items are added to the cart and the items with errors are reported in the response. Default is true
   */

  Merge(
    cartId: string,
    token?: string,
    options?: MergeCartOptions
  ): Promise<PcmProductResponse[]>
  /**
   * Delete a Cart
   * Description: You can easily remove all items from a cart.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-orders/carts/delete-a-cart.html
   */
  Delete(): Promise<{}>

  /**
   * Create a Cart Custom Discount
   * DOCS: https://elasticpath.dev/docs/commerce-cloud/carts/custom-discounts/add-custom-discount-to-cart
   * @param data the custom Discount object
   */
  AddCartCustomDiscount(
    data: CartCustomDiscount
  ): Promise<Resource<CustomDiscountResponse>>

  UpdateCartCustomDiscount(
    customDiscountId: string,
    body: CartCustomDiscount
  ): Promise<Resource<CustomDiscountResponse>>

  RemoveCartCustomDiscount(customDiscountId: string): Promise<{}>

  AddItemCustomDiscount(
    itemId: string,
    data: CartCustomDiscount
  ): Promise<Resource<CustomDiscountResponse>>

  UpdateItemCustomDiscount(
    itemId: string,
    customDiscountId: string,
    body: CartCustomDiscount
  ): Promise<Resource<CustomDiscountResponse>>

  RemoveItemCustomDiscount(
    itemId: string,
    customDiscountId: string
  ): Promise<{}>

  BulkAddCartCustomDiscount(
    data: CartCustomDiscount[],
    options?: BulkCustomDiscountOptions
  ): Promise<CustomDiscountResponse[]>
}
