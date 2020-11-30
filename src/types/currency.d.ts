/**
 * Currencies
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/currencies/index.html
 */
import { Identifiable, CrudQueryableResource } from './core'

/**
 * Core Currency Base Interface
 * For custom flows, extend this interface
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/currencies/index.html
 */
export interface CurrencyBase {
  type: string
  default: boolean
  code: string
  exchange_rate: number
  enabled: boolean
  format: string
  decimal_point: string
  thousand_separator: string
  decimal_places: number
}

export interface Currency extends Identifiable, CurrencyBase {
  links: {
    self: string
  }
  meta: {
    timestamps: {
      created_at: string
      updated_at: string
    }
  }
}

/**
 * Currency Endpoints
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/currencies/index.html
 * Get DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/currencies/get-a-currency.html
 * Get All DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/currencies/get-all-currencies.html
 * Create DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/currencies/create-a-currency.html
 * Update DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/currencies/update-a-currency.html
 * Delete DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/currencies/delete-a-currency.html
 */
export interface CurrencyEndpoint
  extends CrudQueryableResource<
      Currency,
      CurrencyBase,
      Partial<CurrencyBase>,
      never,
      never,
      never
    > {
  endpoint: 'currency'
  storage: Storage

  Set(id: string): Promise<string>
  Active(): Promise<string>
}
