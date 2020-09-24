/**
 * Inventory
 * Description: The Inventory API allows you to manage stock for products in your project catalog. Each product keeps a
 * history of inventory transactions, enabling easier stock auditing.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/inventory/index.html
 */
import { Identifiable, QueryableResource, ResourceList } from './core';

/**
 * Core Inventory Base Interface
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/products/index.html
 */
export interface InventoryBase {
  type: string;
  total: number;
  available: number;
  allocated: number;
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
  endpoint: 'inventory';

  IncrementStock(productId: string, quantity: number): Promise<InventoryBase>;
  DecrementStock(productId: string, quantity: number): Promise<InventoryBase>;
  AllocateStock(productId: string, quantity: number): Promise<InventoryBase>;
  DeallocateStock(productId: string, quantity: number): Promise<InventoryBase>;
  GetTransactions(productId: string): Promise<ResourceList<InventoryBase>>;
}
