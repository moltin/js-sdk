/**
 * Products
 * Description: Products are the core resource to any Commerce Cloud project. They can be associated by category, collection, brands, and more.
 */
import { Identifiable, CrudQueryableResource, Resource } from './core'
import { PriceBookPricesEndpoint } from './price-book-prices'
import { PriceBookPriceModifierEndpoint } from './price-book-price-modifiers'
import { PcmJob } from "./pcm";

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
    external_ref?: string | null
    meta?: {
      // TODO
    }
  }
}

export interface PriceBook extends Identifiable, PriceBookBase {
  meta?: {
    owner?: 'organization' | 'store'
    // TODO
  }
}

export interface PriceBookFilter {
  // TODO
}

type PriceBookSort = 'name' | '-name' // TODO

type PriceBookInclude = 'price' // TODO

export type PriceBooksUpdateBody = PriceBookBase & Identifiable

/**
 * PCM Product Endpoints
 */
export interface PriceBooksEndpoint
  extends CrudQueryableResource<
      PriceBook,
      PriceBookBase,
      PriceBooksUpdateBody,
      PriceBookFilter,
      PriceBookSort,
      PriceBookInclude
    > {
  endpoint: 'pricebooks'
  Prices: PriceBookPricesEndpoint
  PriceModifiers: PriceBookPriceModifierEndpoint

  /**
   * Import price books
   * @param file - The file you want to upload. The file type is `.jsonl`.
   * @constructor
   */
  ImportProductPrices(file: FormData): Promise<Resource<PcmJob>>
}
