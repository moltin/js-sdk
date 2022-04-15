/**
 * Product Variations
 * Description: Variations allow you to create the variations that your products have.
 * Things like size or color are examples of a Variation.
 */
import {
  Identifiable,
  CrudQueryableResource,
  RelationshipToMany,
  Resource,
  ResourceList, ResourcePage,
} from './core'


  /**
   * Product Variations Base Interface
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

  export interface UpdateVariation extends PCMVariationBase, Identifiable {}

  export interface UpdateVariationOption extends VariationsOption, Identifiable {}

  /**
   * Modifiers object
   * Modifiers help augmenting properties of a variation of a product, price, etc., by creating an array of child products or prices.
   */
  export interface VariationsModifier {
      attributes: {
        type: VariationsModifierType
        value?: string
        seek?: string
        set?: string
      }
  }

  export interface VariationsModifierResponse extends Identifiable, VariationsModifier {
    type: 'product-variation-modifier'
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
    | 'commodity_type'
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
   * Get DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/get-a-product-variation.html
   * Get All DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/create-a-product-variation.html
   * Delete DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/delete-a-product-variation.html
   */
  export interface PCMVariationsEndpoint
    extends CrudQueryableResource<
        PCMVariation,
        PCMVariationBase,
        VariationsOptionResponse,
        never,
        never,
        never
      > {
    endpoint: 'pcm/variations'

    Limit(value: number): PCMVariationsEndpoint

    Offset(value: number): PCMVariationsEndpoint

    /**
     * Create a product variation
     * @param body - The variation object.
     * @constructor
     */
    CreateVariation(body: PCMVariationBase): Promise<Resource<PCMVariation>>

    /**
     * Update a product variation
     * @param id - ID of the variation.
     * @param body - The variation object.
     * @param token - a token to access specific data.
     * @constructor
     */
    UpdateVariation(
      id: string,
      body: UpdateVariation,
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
     * @param variationId - ID of the variation.
     * @constructor
     */
    VariationsOptions(variationId: string): Promise<ResourcePage<VariationsOptionResponse>>

    /**
     * Create a product variation option
     * @param variationId - ID of the variation.
     * @param body - The option object.
     * @constructor
     */
    CreateVariationsOption(variationId: string, body: VariationsOption): Promise<Resource<VariationsOptionResponse>>

    /**
     * Update product variation option
     * @param variationId - ID of the variation.
     * @param optionId - ID of the option.
     * @param body - The option object.
     * @constructor
     */
    UpdateVariationsOption(variationId: string, optionId: string, body: UpdateVariationOption): Promise<Resource<VariationsOptionResponse>>

    /**
     * Delete product variation option
     * @param variationId - ID of the variation.
     * @param optionId - ID of the option.
     * @constructor
     */
    DeleteVariationsOption(variationId: string, optionId: string): Promise<{}>

    /**
     * Get a product modifier
     * @param variationId - ID of the variation.
     * @param optionId - ID of the option.
     * @param modifierId - ID of the modifier.
     * @constructor
     */
    VariationsModifier(
      variationId: string,
      optionId: string,
      modifierId: string
    ): Promise<Resource<VariationsModifierResponse>>

    /**
     * Get all product modifiers
     * @param variationId - ID of the variation.
     * @param optionId - ID of the option.
     * @constructor
     */
    VariationsModifiers(variationId: string, optionId: string): Promise<ResourceList<VariationsModifierResponse>>

    /**
     * Create a new product modifier
     * @param variationId - ID of the variation.
     * @param optionId - ID of the option.
     * @param body - The modifier object.
     * @constructor
     */
    CreateVariationsModifier(
      variationId: string,
      optionId: string,
      body: VariationsModifier
    ): Promise<Resource<VariationsModifierResponse>>

    /**
     * Update a product modifier
     * @param variationId - ID of the variation.
     * @param optionId - ID of the option.
     * @param modifierId - ID of the modifier.
     * @param body - The modifier object.
     * @constructor
     */
    UpdateVariationsModifier(
      variationId: string,
      optionId: string,
      modifierId: string,
      body: VariationsModifier
    ): Promise<Resource<VariationsModifierResponse>>

    /**
     * Delete a product modifier
     * @param variationId - ID of the variation.
     * @param optionId - ID of the option.
     * @param modifierId - ID of the modifier.
     * @constructor
     */
    DeleteVariationsModifier(variationId: string, optionId: string, modifierId: string): Promise<{}>
  }
