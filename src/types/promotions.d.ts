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

/**
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/promotions/index.html#fixed-discount
 */
export interface FixedDiscountSchema {
  currencies: CurrencyAmount[]
  exclude?: {
    targets: string[]
  }
}

/**
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/promotions/index.html#percent-discount
 */
export interface PercentDiscountSchema {
  currencies: CurrencyPercentage[]
  exclude?: {
    targets: string[]
  }
}

/**
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/promotions/index.html#x-for-y
 */
export interface XforYSchema {
  x: number
  y: number
  targets: string[]
}

/**
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/promotions/index.html#x-for-amount
 */
export interface XforAmountSchema {
  x: number
  targets: CurrencyAmount[]
}

/**
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/promotions/index.html#bundle-discount
 */
export interface Requirements {
  targets: string[]
  quantity: number
}

export interface BundleDiscountSchema {
  requirements: Requirements[]
  currencies: CurrencyAmount[]
}

export interface BundleGiftSchema {
  requirements: Requirements[]
  gifts: string[]
}

/**
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/promotions/index.html#item-fixed-discount
 */
export interface ItemFixedDiscountSchema {
  targets: string[]
  currencies: CurrencyAmount[]
}

/**
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/promotions/index.html#item-percent-discount
 */
export interface ItemPercentDiscountSchema {
  targets: string[] | 'all'
  percent: number
}

export interface CurrencyAmount {
  amount: number
  currency: string
}

export interface CurrencyPercentage {
  percentage: number
  currency: string
}

/**
 * Core Promotion Base Interface
 * For custom flows, extend this interface
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/promotions/index.html#the-promotion-object
 */
export interface PromotionBase {
  type: string
  name: string
  description: string
  enabled: boolean
  automatic?: boolean
  promotion_type:
    | 'fixed_discount'
    | 'percent_discount'
    | 'x_for_y'
    | 'x_for_amount'
    | 'bundle_fixed_discount'
    | 'item_fixed_discount'
    | 'item_percent_discount'
    | 'bundle_gift'
  schema:
    | FixedDiscountSchema
    | PercentDiscountSchema
    | XforYSchema
    | XforAmountSchema
    | BundleDiscountSchema
    | ItemFixedDiscountSchema
    | ItemPercentDiscountSchema
    | BundleGiftSchema
  min_cart_value?: CurrencyAmount[]
  max_discount_value?: CurrencyAmount[]
  start: string
  end: string
  max_applications_per_cart?: number
}

export interface PromotionMeta {
  timestamps: {
    created_at: string
    updated_at: string
  }
}

export interface Promotion extends Identifiable, PromotionBase {
  meta: PromotionMeta
}

/**
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/promotions/index.html#the-promotion-code-object
 */
export interface PromotionCode {
  code: string
  uses?: number
  user?: string
}

export interface DeletePromotionCodesBodyItem extends ResourceList<any> {
  code: string
}

/**
 * Promotion Endpoints
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/promotions/index.html
 * Get DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/promotions/get-a-promotion.html
 * Get All DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/promotions/get-promotions.html
 * Create DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/promotions/create-promotion.html
 * Update DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/promotions/update-promotions.html
 * Delete DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/brands/delete-a-brand.html
 */
export interface PromotionsEndpoint
  extends CrudQueryableResource<
    Promotion,
    PromotionBase,
    Identifiable & Partial<PromotionBase>,
    never,
    never,
    never
  > {
  endpoint: 'promotions'

  Attributes(): Promise<Attributes>

  /**
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/promotions/index.html#the-promotion-code-object
   */
  Codes(promotionId: string): Promise<ResourcePage<PromotionCode>>

  /**
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/promotions/create-promotion-codes.html
   */
  AddCodes(
    promotionId: string,
    codes: PromotionCode[]
  ): Promise<Resource<PromotionBase>>

  /**
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/promotions/delete-promotion-codes.html#delete-delete-a-promotion-code
   */
  DeleteCode(promotionId: string, codeId: string): Promise<{}>

  /**
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/carts-and-checkout/promotions/delete-promotion-codes.html#delete-delete-multiple-promotion-codes
   */
  DeleteCodes(
    promotionId: string,
    codes: DeletePromotionCodesBodyItem[]
  ): Promise<{}>

  History(promotionId:string): Promise<ResourcePage<Promotion>>
}

