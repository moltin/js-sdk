import {
  Identifiable,
  Resource, ResourceList
} from './core'

export interface PriceBookPriceBase {
  type: 'product-price'
  attributes: {
    currencies: {
      [key: string]: {
        description?: string
        amount: number
        includes_tax: boolean
      }
    }
    product_id: string
  }
}

export interface PriceBookPrice extends Identifiable, PriceBookPriceBase {
  relationships: {}
}

export interface PriceBookPricesEndpoint {
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
  }): Promise<ResourceList<PriceBookPrice>>

  Create(options: {
    pricebookId: string
    body: PriceBookPriceBase
    token?: string
  }): Promise<Resource<PriceBookPrice>>

  Update(options: {
    pricebookId: string
    priceId: string
    body: Identifiable & PriceBookPrice
    token?: string
  }): Promise<Resource<PriceBookPrice>>

  Delete(options: {
    pricebookId: string
    priceId: string
    token?: string
  }): Promise<{}>
}
