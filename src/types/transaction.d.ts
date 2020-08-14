/**
 * Transactions
 * Description: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/inventory/stock-transactions.html
 * DOCS:
 */
import { Identifiable, ResourceList } from './core';

/**
 * Core Transaction Base Interface
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/inventory/stock-transactions.html
 */
export interface TransactionBase {
  type: string;
  reference: string;
  gateway: string;
  amount: number;
  currency: string;
  transaction_type: 'purchase' | 'capture' | 'authorize' | 'refund';
  status: 'complete' | 'failed';
  relationships:	any;
  timestamps:	any;
}

export interface Transaction extends Identifiable, TransactionBase {
}

/**
 * Transaction Endpoints
 */
export interface TransactionEndpoint 
{
  endpoint: 'transaction';

  All(options: { order: string }): Promise<ResourceList<Transaction>>;

  Capture<T = any>(options: {
    order: string
    transaction: string
  }): Promise<T>;

  Refund<T = any>(options: { order: string; transaction: string }): Promise<T>
}
