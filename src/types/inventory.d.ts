/**
 * Inventory
 * Description: The Inventory API allows you to manage stock for products in your project catalog. Each product keeps a
 * history of inventory transactions, enabling easier stock auditing.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/inventory/index.html
 */
import { Identifiable, QueryableResource, ResourceList } from './core'

/**
 * Update Inventory Interface
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/inventory/update-inventory.html
 */
export interface InventoryResponse {
  type: string
  action: string
  product_id: string
  quantity: number
  timestamps: {
    created_at: string
  }
}

/**
 * Core Inventory Base Interface
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/inventory/index.html
 */
export interface InventoryBase {
  type: string
  total: number
  available: number
  allocated: number
}

export interface Inventory extends Identifiable, InventoryBase {
}

/**
 * Inventory Endpoints
 * TODO Need to check on actually functionality
 */
export interface InventoryEndpoint extends QueryableResource<
  Inventory,
  never,
  never,
  never
> {
  endpoint: 'inventory'

  /**
   * Increment Stock
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/inventory/update-inventory.html
   * @param productId The ID for the product you’re performing this action on.
   * @param quantity The amount of stock affected by this transaction.
   */
  IncrementStock(
    productId: string,
    quantity: number
  ): Promise<InventoryResponse>

  /**
   * Decrement Stock
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/inventory/update-inventory.html
   * @param productId The ID for the product you’re performing this action on.
   * @param quantity The amount of stock affected by this transaction.
   */
  DecrementStock(
    productId: string,
    quantity: number
  ): Promise<InventoryResponse>

  /**
   * Allocate Stock
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/inventory/update-inventory.html
   * @param productId The ID for the product you’re performing this action on.
   * @param quantity The amount of stock affected by this transaction.
   */
  AllocateStock(
    productId: string,
    quantity: number
  ): Promise<InventoryResponse>

  /**
   * Deallocate Stock
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/inventory/update-inventory.html
   * @param productId The ID for the product you’re performing this action on.
   * @param quantity The amount of stock affected by this transaction.
   */
  DeallocateStock(
    productId: string,
    quantity: number
  ): Promise<InventoryResponse>

  /**
   * Get Transactions
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/inventory/stock-transactions.html
   * @param productId The ID for the product you’re performing this action on.
   */
  GetTransactions(productId: string): Promise<ResourceList<InventoryBase>>
}
