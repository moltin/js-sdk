/**
 * Promotions
 * Description:Promotions allow you to provide discounts to customers.
 * A Promotion can be automatic which is applied provided any criteria are satisfied,
 * or require codes, which are then used by the end user to get a discount.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/promotions/index.html
 */
import {
    Attributes,
    CrudQueryableResource,
    Identifiable,
    Resource,
    ResourceList,
    ResourcePage
  } from './core'

  export interface action {
    strategy: string
    args?: any[]
    children?: any
  }

  export interface conditionChildren {
      strategy: string
      operator: string
      args: any[]
      children: {
        strategy: 'and' | 'or'
        children: {
          strategy: string
          operator: string
          args: any[]
        }[]
      }[]
  }

  export interface condition {
    strategy: 'and' | 'or'
    children: conditionChildren
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
  