/**
 * Products
 * Description: Products are the core resource to any Commerce Cloud project. They can be associated by category, collection, brands, and more.
 */
import {
  Identifiable,
  CrudQueryableResource
} from './core'
import { PriceBookPricesEndpoint } from './price-book-prices'

/**
 * Core PCM Product Base Interface
 * For custom flows, extend this interface
 */
export interface PriceBookBase {
  type: string
  attributes: {
    name: string
    description?: string
    created_at?: string
    updated_at?: string
    meta?: {
      // TODO
    }
  }
}

export interface PriceBook extends Identifiable, PriceBookBase {
  meta?: {
    // TODO
  }
}

export interface PriceBookFilter {
  // TODO
}

type PriceBookSort = // TODO
  | 'name'
  | '-name'

type PriceBookInclude = // TODO
  | 'price'

export type PriceBooksUpdateBody = PriceBookBase & Identifiable

/**
 * PCM Product Endpoints
 */
export interface PriceBooksEndpoint
  extends CrudQueryableResource<PriceBook,
    PriceBookBase,
    PriceBooksUpdateBody,
    PriceBookFilter,
    PriceBookSort,
    PriceBookInclude> {
  endpoint: 'pricebooks'
  Prices: PriceBookPricesEndpoint
}
