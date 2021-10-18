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
    ResourceList,
  } from './core'

  
  /**
   * Product Variations Base Interface
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/index.html#the-variation-object
   */
  export interface PCMVariationBase {
      attributes: {
        name: string
      }
  }
  
  export interface PCMVariation extends Identifiable, PCMVariationBase {
    type: 'product-variation'
    options: VariationsOption[]
    relationships: {
      options: RelationshipToMany<'option'>
    }
  }
  
  /**
   * The Product Variation Option object
   * A variation option represents an option for selection for a single product-variation.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/options/index.html
   */
  export interface VariationsOption {
    attributes: {
        name: string
        description: string
    }
  }
  
  export interface VariationsOptionResponse extends Identifiable {
    type: 'product-variation-option'
    attributes : {
        name: string
        description: string
    }
    relationships: {
      modifiers: {
        data: VariationsModifierTypeObj[]
      }
    }
  }
  
  /**
   * Modifiers object
   * Modifiers help augmenting properties of a variation of a product, price, etc., by creating an array of child products or prices.
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/modifiers/index.html
   */
  export interface VariationsModifier {
      attributes: {
        type: VariationsModifierType
        value: string  | VariationsBuilderModifier
      }
 
  }
  
  export interface VariationsModifierResponse extends Identifiable {
    type: 'modifier'
    modifier_type: VariationsModifierType
    value: string | VariationsBuilderModifier
  }
  
  export type VariationsModifierTypeObj =
    | { name_equals: string }
    | { name_append: string }
    | { name_prepend: string }
    | { description_equals: string }
    | { description_append: string }
    | { description_prepend: string }
    | { commoditytype: string }
    | { slug_equals: string }
    | { slug_append: string }
    | { slug_prepend: string }
    | { slug_builder: VariationsBuilderModifier }
    | { sku_equals: string }
    | { sku_append: string }
    | { sku_prepend: string }
    | { sku_builder: VariationsBuilderModifier }
    | { status: string }
  
  export type VariationsModifierType =
    | 'name_equals'
    | 'name_append'
    | 'name_prepend'
    | 'description_equals'
    | 'description_append'
    | 'description_prepend'
    | 'commoditytype'
    | 'slug_equals'
    | 'slug_append'
    | 'slug_prepend'
    | 'slug_builder'
    | 'sku_equals'
    | 'sku_append'
    | 'sku_prepend'
    | 'sku_builder'
    | 'status'
  
  export interface VariationsBuilderModifier {
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
  export interface PCMVariationsEndpoint
    extends CrudQueryableResource<
        PCMVariation,
        PCMVariationBase,
        never,
        never,
        never,
        never
      > {
    endpoint: 'pcm/variations'
  
    /**
     * Create a product variation
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/create-a-product-variation.html
     * @param body - The variation object.
     * @constructor
     */
    CreateVariation(body: PCMVariationBase): Promise<Resource<PCMVariation>>
  
    /**
     * Update a product variation
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/update-a-product-variation.html
     * @param id - ID of the variation.
     * @param body - The variation object.
     * @param token - a token to access specific data.
     * @constructor
     */
    UpdateVariation(
      id: string,
      body: PCMVariationBase,
      token?: string
    ): Promise<Resource<PCMVariation>>
  
    /**
     * Get a product variation option
     * Description: Use this endpoint to retrieve a single variation option.
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/options/get-a-product-variation-option.html
     * @param variationId - ID of the variation.
     * @param optionId - ID of the option.
     * @constructor
     */
    VariationsOption(
      variationId: string,
      optionId: string
    ): Promise<Resource<VariationsOptionResponse>>
  
    /**
     * Get all product variation options
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/options/get-all-product-variation-options.html
     * @param variationId - ID of the variation.
     * @constructor
     */
    VariationsOptions(variationId): Promise<ResourceList<VariationsOptionResponse>>
  
    /**
     * Create a product variation option
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/options/create-product-variation-option.html
     * @param variationId - ID of the variation.
     * @param body - The option object.
     * @constructor
     */
    CreateVariationsOption(variationId, body): Promise<Resource<VariationsOptionResponse>>
  
    /**
     * Update product variation option
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/options/update-product-variation-option.html
     * @param variationId - ID of the variation.
     * @param optionId - ID of the option.
     * @param body - The option object.
     * @constructor
     */
    UpdateVariationsOption(variationId, optionId, body): Promise<Resource<VariationsOptionResponse>>
  
    /**
     * Delete product variation option
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/options/delete-product-variation-option.html
     * @param variationId - ID of the variation.
     * @param optionId - ID of the option.
     * @constructor
     */
    DeleteVariationsOption(variationId, optionId): Promise<{}>
  
    /**
     * Get a product modifier
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/modifiers/get-a-product-modifier.html
     * @param variationId - ID of the variation.
     * @param optionId - ID of the option.
     * @param modifierId - ID of the modifier.
     * @constructor
     */
    VariationsModifier(
      variationId,
      optionId,
      modifierId
    ): Promise<Resource<VariationsModifierResponse>>
  
    /**
     * Get all product modifiers
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/modifiers/get-all-product-modifiers.html
     * @param variationId - ID of the variation.
     * @param optionId - ID of the option.
     * @constructor
     */
    VariationsModifiers(variationId, optionId): Promise<ResourceList<VariationsModifierResponse>>
  
    /**
     * Create a new product modifier
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/modifiers/create-a-product-modifier.html
     * @param variationId - ID of the variation.
     * @param optionId - ID of the option.
     * @param body - The modifier object.
     * @constructor
     */
    CreateVariationsModifier(
      variationId,
      optionId,
      body
    ): Promise<Resource<VariationsModifierResponse>>
  
    /**
     * Update a product modifier
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/modifiers/update-a-product-modifier.html
     * @param variationId - ID of the variation.
     * @param optionId - ID of the option.
     * @param modifierId - ID of the modifier.
     * @param body - The modifier object.
     * @constructor
     */
    UpdateVariationsModifier(
      variationId,
      optionId,
      modifierId,
      body
    ): Promise<Resource<VariationsModifierResponse>>
  
    /**
     * Delete a product modifier
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/modifiers/delete-a-product-modifier.html
     * @param variationId - ID of the variation.
     * @param optionId - ID of the option.
     * @param modifierId - ID of the modifier.
     * @constructor
     */
    DeleteVariationsModifier(variationId, optionId, modifierId): Promise<{}>
  }
  