import {Identifiable, Resource, ResourceList, ResourcePage} from './core'

export interface PriceBookPriceModifierBase {
  type: 'product-price'
  attributes: {
    modifier_type: string
    name: string
    currencies: {
      [key: string]: {
        includes_tax: boolean
        amount: number
      }
    }
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
  }): Promise<ResourcePage<PriceBookPriceModifier>>

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

  Limit(value: number): PriceBookPriceModifierEndpoint

  Offset(value: number): PriceBookPriceModifierEndpoint
}
