/**
 * Transactions
 * Description: Each product has its own Inventory and stock history.
 * This is useful when auditing product movements across your project.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/payments/transactions.html
 */
import { Identifiable, ResourceList } from './core'

export interface TransactionsResponse {
  data: {
    id: string
    type: string
    reference: string
    gateway: string
    amount: number
    currency: string
    transaction_type: string
    status: string
    relationships: {
      order: {
        data: {
          type: string
          id: string
        }
      }
      timestamps?: {
        created_at: string
        updated_at: string
      }
    }
    meta: {
      display_price: {
        amount: number
        currency: string
        formatted: string
      }
      timestamps: {
        created_at: string
        updated_at: string
      }
      display_refunded_amount?: {
        total: {
          amount: number
          currency: string
          formatted: string
        }
      }
    }
  }
}

/**
 * Core Transaction Base Interface
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/payments/transactions.html#the-transaction-object
 */
export interface TransactionBase {
  type: string
  reference: string
  gateway: string
  amount: number
  currency: string
  refunded_amount: number
  transaction_type: 'purchase' | 'capture' | 'authorize' | 'refund'
  status: 'complete' | 'failed'
  relationships: any
  meta: {
    display_price: {
      amount: number
      currency: string
      formatted: string
    }
    timestamps: {
      created_at: string
      updated_at: string
    }
    display_refunded_amount?: {
      total: {
        amount: number
        currency: string
        formatted: string
      }
    }
  }
  timestamps: any
}

export interface Transaction extends Identifiable, TransactionBase {}

/**
 * Transaction Endpoints
 * Get All DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/payments/transactions.html#get-get-all-transactions
 * Get single DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/payments/transactions.html#get-get-single-transaction
 * Capture DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/payments/transactions.html#post-capture-payment
 * Refund DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/payments/transactions.html#post-refund-payment
 */
export interface TransactionEndpoint {
  endpoint: 'transaction'

  All(options: { order: string }): Promise<ResourceList<Transaction>>

  Get(options: {
    order: string
    transaction: string
  }): Promise<TransactionsResponse>

  Capture(options: {
    order: string
    transaction: string
  }): Promise<TransactionsResponse>

  Refund(options: {
    order: string
    transaction: string
  },
  body?: { amount: number }
  ): Promise<TransactionsResponse>
}
