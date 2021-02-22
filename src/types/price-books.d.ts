/**
 * Products
 * Description: Products are the core resource to any Commerce Cloud project. They can be associated by category, collection, brands, and more.
 */
import {
  Identifiable,
  CrudQueryableResource
} from './core'
import { PriceBookPrice } from './price-book-prices'

/**
 * Core PCM Product Base Interface
 * For custom flows, extend this interface
 */
export interface PriceBookBase {
  type: string
  attributes: {
    name: string
    description?: string
  }
}

export interface PriceBook extends Identifiable, PriceBookBase {
  create_at: string
  updated_at: string
  meta: {
    // TODO
  }
}

export interface PriceBookFilter {
  // TODO
}

type PriceBookSort = // TODO
  | 'name'

type PriceBookInclude = // TODO
  | 'price'

/**
 * PCM Product Endpoints
 */
export interface PriceBooksEndpoint
  extends CrudQueryableResource<PriceBook,
    PriceBookBase,
    Partial<PriceBookBase>,
    PriceBookFilter,
    PriceBookSort,
    PriceBookInclude> {
  endpoint: 'pricebooks'
  Price: PriceBookPrice
}
