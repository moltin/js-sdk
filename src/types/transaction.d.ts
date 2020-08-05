/**
 * Transactions
 * Description: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/inventory/stock-transactions.html
 * DOCS:
 */
import { Identifiable, CrudQueryableResource } from './core';

/**
 * Core Transaction Base Interface
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/inventory/stock-transactions.html
 */
export interface TransactionBase {
  type: string;
  action: string;
  product_id: string;
  quantity: number;
}

export interface Transaction extends Identifiable, TransactionBase {
}

/**
 * Transaction Endpoints
 */
export interface TransactionEndpoint extends CrudQueryableResource<
  Transaction,
  TransactionBase,
  Partial<TransactionBase>,
  never,
  never,
  never
> {
  endpoint: 'transaction';

  Capture<T = any>(options: {
    order: string
    transaction: string
  }): Promise<T>;

  Refund<T = any>(options: { order: string; transaction: string }): Promise<T>
}
