/**
 * Promotions
 * Description:Promotions allow you to provide discounts to customers.
 * A Promotion can be automatic which is applied provided any criteria are satisfied,
 * or require codes, which are then used by the end user to get a discount.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/promotions/index.html
 */
import {
    CrudQueryableResource,
    Identifiable,
  } from './core'

  export interface actionLimitation {
    max_discount?: number
    max_quantity?: number
    items?: {
        max_items?: number
        price_strategy?: string
    }
  }

  export interface actionCondition {
    strategy: string
    operator?: string
    args?: any[]
    children?: {
        strategy?: string
        operator?: string
        args?: any[]
    }[]
  }

  export interface action {
    strategy: string
    args: any[]
    limitations?: actionLimitation
    conditions?: actionCondition
  }

  export interface condition {
    strategy: string
    operator?: string
    args?: any[]
    children?: condition[]
  }

  export interface RulePromotionBase {
    type: 'rule_promotion'
    name: string
    description: string
    enabled: boolean
    automatic?: boolean
    start: string
    end: string
    rule_set: {
      currencies: string[]
      catalog_ids: string[]
      rules: condition
      actions: action[]
    }
  }
  
  export interface RulePromotionMeta {
    timestamps: {
      created_at: string
      updated_at: string
    }
  }
  
  export interface RulePromotion extends Identifiable, RulePromotionBase {
    meta: RulePromotionMeta
  }
  
 
  export interface RulePromotionsEndpoint
    extends CrudQueryableResource<
      RulePromotion,
      RulePromotionBase,
      Partial<RulePromotionBase>,
      never,
      never,
      never
    > {
    endpoint: 'rule-promotions'

  }
