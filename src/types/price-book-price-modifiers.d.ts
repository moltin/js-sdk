import { Identifiable, Resource, ResourceList } from './core'

export interface PriceBookPriceModifierBase {
  type: 'product-price'
  attributes: {
    currencies: {
      [key: string]: {
        includes_tax: boolean
        amount: number
      }
    }
    modifier_type: 'price_increment'
    name: 'large_supplement'
  }
}

export interface PriceBookPriceModifier
  extends Identifiable,
    PriceBookPriceModifierBase {
  relationships: {}
}

export interface PriceBookPriceModifierEndpoint {
  endpoint: 'prices'

  All(options: {
    pricebookId: string
    token?: string
  }): Promise<ResourceList<PriceBookPriceModifier>>

  Get(options: {
    pricebookId: string
    priceModifierId: string
    token?: string
  }): Promise<Resource<PriceBookPriceModifier>>

  Create(options: {
    pricebookId: string
    body: PriceBookPriceModifier
    token?: string
  }): Promise<Resource<PriceBookPriceModifier>>

  Update(options: {
    pricebookId: string
    priceModifierId: string
    body: PriceBookPriceModifier
    token?: string
  }): Promise<Resource<PriceBookPriceModifier>>

  Delete(options: {
    pricebookId: string
    priceModifierId: string
    token?: string
  }): Promise<{}>
}
