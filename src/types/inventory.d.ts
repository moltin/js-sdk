/**
 * Inventory
 * Description: The Inventory API allows you to manage stock for products in your project catalog. Each product keeps a
 * history of inventory transactions, enabling easier stock auditing.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/inventory/index.html
 */
import { Identifiable, QueryableResource, ResourceList, Resource } from './core'

/**
 * Inventory Action types
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/inventory/update-inventory.html#action-types
 */
export type InventoryActionTypes =
  | 'increment'  // Use this when you receive stock from a supplier, making products available for purchase.
  | 'decrement'  //	Use this when you want to remove stock from product inventory.
  | 'allocate'   // Use this when you want to allocate stock, normally to a reseller who sells on the stock.
  | 'deallocate' //	Use this when you want to deallocate any previously allocated stock.

/**
 * Update Inventory Interface
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/inventory/update-inventory.html#post-create-a-stock-transaction-for-a-product
 */
export interface InventoryResponse extends Identifiable {
  type: string
  action: InventoryActionTypes
  product_id: string
  quantity: number
  timestamps: {
    created_at: string
  }
}

/**
 * Core Inventory Base Interface
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/inventory/index.html#the-stock-object
 */
export interface InventoryBase {
  type: string
  total: number
  available: number
  allocated: number
}

export interface Inventory extends Identifiable, InventoryBase {}

/**
 * Inventory Endpoints
 */
export interface InventoryEndpoint
  extends QueryableResource<Inventory, never, never, never> {
  endpoint: 'inventory'

  /**
   * Create Inventory
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/inventory/create-inventory.html
   * @param productId The ID for the product you’re performing this action on.
   * @param quantity The amount of stock affected by this transaction.
   */
  Create(
    productId: string,
    quantity: number
  ): Promise<Resource<InventoryResponse>>

  /**
   * Delete Inventory
   * @param productId The ID for the product you’re performing this action on.
   */
  Delete(
    productId: string
  ): Promise<{}>

  /**
   * Increment Stock
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/inventory/update-inventory.html#post-create-a-stock-transaction-for-a-product
   * @param productId The ID for the product you’re performing this action on.
   * @param quantity The amount of stock affected by this transaction.
   */
  IncrementStock(
    productId: string,
    quantity: number
  ): Promise<Resource<InventoryResponse>>

  /**
   * Decrement Stock
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/inventory/update-inventory.html#post-create-a-stock-transaction-for-a-product
   * @param productId The ID for the product you’re performing this action on.
   * @param quantity The amount of stock affected by this transaction.
   */
  DecrementStock(
    productId: string,
    quantity: number
  ): Promise<Resource<InventoryResponse>>

  /**
   * Allocate Stock
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/inventory/update-inventory.html#post-create-a-stock-transaction-for-a-product
   * @param productId The ID for the product you’re performing this action on.
   * @param quantity The amount of stock affected by this transaction.
   */
  AllocateStock(productId: string, quantity: number): Promise<Resource<InventoryResponse>>

  /**
   * Deallocate Stock
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/inventory/update-inventory.html#post-create-a-stock-transaction-for-a-product
   * @param productId The ID for the product you’re performing this action on.
   * @param quantity The amount of stock affected by this transaction.
   */
  DeallocateStock(
    productId: string,
    quantity: number
  ): Promise<Resource<InventoryResponse>>

  /**
   * Get Transactions
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/inventory/get-a-product-stock-transactions.html
   * @param productId The ID for the product you’re performing this action on.
   */
  GetTransactions(productId: string): Promise<ResourceList<InventoryResponse>>

  /**
   * Get Transaction
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/inventory/get-a-product-stock-transaction.html
   * @param productId The ID for the product you’re performing this action on.
   * @param transactionId The ID for the transaction created on the product.
   */
  GetTransaction(productId: string, transactionId: string): Promise<Resource<InventoryResponse>>
}
