/**
 * Product Variations
 * Description: Variations allow you to create the variations that your products have.
 * Things like size or color are examples of a Variation.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/index.html#product-variations
 */
import {
  Identifiable,
  CrudQueryableResource,
  RelationshipToMany,
  Resource,
  ResourceList
} from './core'
import { Price } from './price'

/**
 * Product Variations Base Interface
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/index.html#the-variation-object
 */
export interface VariationBase {
  name: string
}

export interface Variation extends Identifiable, VariationBase {
  type: 'product-variation'
  options: Option[]
  relationships: {
    options: RelationshipToMany<'option'>
  }
}

/**
 * The Product Variation Option object
 * A variation option represents an option for selection for a single product-variation.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/options/index.html
 */
export interface Option extends Identifiable {
  name: string
  description: string
  modifiers: Modifier[]
}

export interface OptionResponse extends Identifiable {
  type: 'option'
  name: string
  description: string
  relationships: {
    modifiers: {
      data: ModifierTypeObj[]
    }
  }
}

/**
 * Modifiers object
 * Modifiers help augmenting properties of a variation of a product, price, etc., by creating an array of child products or prices.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/modifiers/index.html
 */
export interface Modifier extends Identifiable {
  type: ModifierType
  value: string | Price[] | BuilderModifier
}

export interface ModifierResponse extends Identifiable {
  type: 'modifier'
  modifier_type: ModifierType
  value: string | Price[] | BuilderModifier
}

export type ModifierTypeObj =
  | { name_equals: string }
  | { name_append: string }
  | { name_prepend: string }
  | { description_equals: string }
  | { description_append: string }
  | { description_prepend: string }
  | { commoditytype: string }
  | { price_increment: Price[] }
  | { price_decrement: Price[] }
  | { price_equals: Price[] }
  | { slug_equals: string }
  | { slug_append: string }
  | { slug_prepend: string }
  | { slug_builder: BuilderModifier }
  | { sku_equals: string }
  | { sku_append: string }
  | { sku_prepend: string }
  | { sku_builder: BuilderModifier }
  | { status: string }

export type ModifierType =
  | 'name_equals'
  | 'name_append'
  | 'name_prepend'
  | 'description_equals'
  | 'description_append'
  | 'description_prepend'
  | 'commoditytype'
  | 'price_increment'
  | 'price_decrement'
  | 'price_equals'
  | 'slug_equals'
  | 'slug_append'
  | 'slug_prepend'
  | 'slug_builder'
  | 'sku_equals'
  | 'sku_append'
  | 'sku_prepend'
  | 'sku_builder'
  | 'status'

export interface BuilderModifier {
  seek: string
  set: string
}

/**
 * Variations Endpoints
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/index.html
 * Get DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/get-a-product-variation.html
 * Get All DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/create-a-product-variation.html
 * Delete DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/delete-a-product-variation.html
 */
export interface VariationsEndpoint
  extends CrudQueryableResource<
      Variation,
      VariationBase,
      never,
      never,
      never,
      never
    > {
  endpoint: 'variations'

  /**
   * Create a product variation
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/create-a-product-variation.html
   * @param body - The variation object.
   * @constructor
   */
  Create(body: VariationBase): Promise<Resource<Variation>>

  /**
   * Update a product variation
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/update-a-product-variation.html
   * @param id - ID of the variation.
   * @param body - The variation object.
   * @param token - a token to access specific data.
   * @constructor
   */
  Update(
    id: string,
    body: VariationBase,
    token?: string
  ): Promise<Resource<Variation>>

  /**
   * Get a product variation option
   * Description: Use this endpoint to retrieve a single variation option.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/options/get-a-product-variation-option.html
   * @param variationId - ID of the variation.
   * @param optionId - ID of the option.
   * @constructor
   */
  Option(
    variationId: string,
    optionId: string
  ): Promise<Resource<OptionResponse>>

  /**
   * Get all product variation options
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/options/get-all-product-variation-options.html
   * @param variationId - ID of the variation.
   * @constructor
   */
  Options(variationId): Promise<ResourceList<OptionResponse>>

  /**
   * Create a product variation option
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/options/create-product-variation-option.html
   * @param variationId - ID of the variation.
   * @param body - The option object.
   * @constructor
   */
  CreateOption(variationId, body): Promise<Resource<OptionResponse>>

  /**
   * Update product variation option
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/options/update-product-variation-option.html
   * @param variationId - ID of the variation.
   * @param optionId - ID of the option.
   * @param body - The option object.
   * @constructor
   */
  UpdateOption(variationId, optionId, body): Promise<Resource<OptionResponse>>

  /**
   * Delete product variation option
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/options/delete-product-variation-option.html
   * @param variationId - ID of the variation.
   * @param optionId - ID of the option.
   * @constructor
   */
  DeleteOption(variationId, optionId): Promise<{}>

  /**
   * Get a product modifier
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/modifiers/get-a-product-modifier.html
   * @param variationId - ID of the variation.
   * @param optionId - ID of the option.
   * @param modifierId - ID of the modifier.
   * @constructor
   */
  Modifier(
    variationId,
    optionId,
    modifierId
  ): Promise<Resource<ModifierResponse>>

  /**
   * Get all product modifiers
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/modifiers/get-all-product-modifiers.html
   * @param variationId - ID of the variation.
   * @param optionId - ID of the option.
   * @constructor
   */
  Modifiers(variationId, optionId): Promise<ResourceList<ModifierResponse>>

  /**
   * Create a new product modifier
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/modifiers/create-a-product-modifier.html
   * @param variationId - ID of the variation.
   * @param optionId - ID of the option.
   * @param body - The modifier object.
   * @constructor
   */
  CreateModifier(
    variationId,
    optionId,
    body
  ): Promise<Resource<ModifierResponse>>

  /**
   * Update a product modifier
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/modifiers/update-a-product-modifier.html
   * @param variationId - ID of the variation.
   * @param optionId - ID of the option.
   * @param modifierId - ID of the modifier.
   * @param body - The modifier object.
   * @constructor
   */
  UpdateModifier(
    variationId,
    optionId,
    modifierId,
    body
  ): Promise<Resource<ModifierResponse>>

  /**
   * Delete a product modifier
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/modifiers/delete-a-product-modifier.html
   * @param variationId - ID of the variation.
   * @param optionId - ID of the option.
   * @param modifierId - ID of the modifier.
   * @constructor
   */
  DeleteModifier(variationId, optionId, modifierId): Promise<{}>
}
