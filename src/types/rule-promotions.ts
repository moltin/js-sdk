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

  export interface RulePromotionBase {
    type: 'rule_promotion'
    name: string
    description: string
    enabled: boolean
    automatic?: boolean
    start: string
    end: string
    rule: {
        name: string
        description: string
        salience: number
        when: Object
        then: any[]
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
  