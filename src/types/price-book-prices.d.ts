import {
  CrudQueryableResource,
  Identifiable,
  Resource, ResourcePage
} from './core'

export interface PriceBookPriceBase {
  type: 'product-price'
  attributes: {
    currencies: {
      [key: string]: {
        includes_tax: boolean
        amount: number
        tiers?: {
          [key: string]: {
            minimum_quantity: number
            amount: number
          }
        }
      }
    }
    sales?: {
      [key: string]: {
        bundle_ids?: string[]
        schedule?: {
          valid_from: string
          valid_to: string
        }
        currencies: {
          [key: string]: {
            includes_tax: boolean
            amount: number
            tiers?: {
              [key: string]: {
                minimum_quantity: number
                amount: number
              }
            }
          }
        }
      }
    }
    sku: string
  }
}

export interface PriceBookPricesCreateBody {
  options: {
    pricebookId: string
    body: PriceBookPriceBase
    token?: string
  }
}

export interface PriceBookPricesUpdateBody {
  options: {
    pricebookId: string
    priceId: string
    body: Identifiable & PriceBookPrice
    token?: string
  }
}

export interface PriceBookPrice extends Identifiable, PriceBookPriceBase {
  relationships: {}
}

export interface PricesFilter {}

export interface PriceBookPricesEndpoint
    extends Omit<CrudQueryableResource<
        PriceBookPrice,
        PriceBookPricesCreateBody,
        PriceBookPricesUpdateBody,
        PricesFilter,
        never,
        never
        >, 'Get' | 'All' | 'Filter' | 'Create' | 'Update' | 'Delete'> {
  endpoint: 'prices'

  Get(options: {
    pricebookId: string
    priceId: string
    token?: string
  }): Promise<Resource<PriceBookPrice>>

  // TODO: API - currently not working! (can get from pricebook relationships)
  All(options: {
    pricebookId: string
    token?: string
  }): Promise<ResourcePage<PriceBookPrice>>

  Filter(filter: PricesFilter): PriceBookPricesEndpoint

  Create(PriceBookPricesCreateBody): Promise<Resource<PriceBookPrice>>

  Update(PriceBookPricesUpdateBody): Promise<Resource<PriceBookPrice>>

  Delete(options: {
    pricebookId: string
    priceId: string
    token?: string
  }): Promise<{}>
}
