/**
 * Products
 * Description: Products are the core resource to any Commerce Cloud project. They can be associated by category, collection, brands, and more.
 */
import {
  Identifiable,
  CrudQueryableResource,
  ResourcePage,
} from './core'
import { PcmFileRelationshipEndpoint } from "./pcm-file-relationship";
import { PcmTemplateRelationshipEndpoint } from './pcm-template-relationship'
import { PcmVariationsRelationshipsEndpoint } from './pcm-variations-relationships'
import { PcmMainImageRelationshipEndpoint } from './pcm-main-image-relationship'
import { File } from './file'
import Locales from "./locales";

/**
 * Core PCM Product Base Interface
 * For custom flows, extend this interface
 */
export interface PcmProductBase extends PcmProductRelationships {
  type: string
  attributes: {
    name: string
    description?: string | null
    slug?: string | null
    sku?: string | null
    status?: string
    commodity_type?: string
    upc_ean?: string | null
    mpn?: string | null
    extensions?: Object
    locales?:{[key in Locales]?: {name?: string, description?: string}}
    components?: ProductComponents
  }
}

export interface ProductComponents {
  [key: string]: {
    name: string
    options: ProductComponentOption[]
  }
}

export interface ProductComponentOption {
  id: string
  quantity: number
  type: string
  meta: {
    name: string
    sku: string
    status: string
  }
}

export interface PcmProduct extends Identifiable, PcmProductBase {
  meta: {
    variation_matrix: {[key: string]: string} | {}
  }
}

export interface PcmProductRelationships {
  relationships?: {
    base_product?: {
      data: {
        id: string,
        type: string
      }
    }
    main_image?: {
      data: {
        id: string
      }
    }
  }
}

export interface PcmProductFilter {
  // TODO
}

type PcmProductSort = // TODO
  | 'name'

export type PcmProductInclude = | 'main_image' | 'component_products'

interface PcmProductsIncluded {
  main_images: File[]
  component_products: PcmProduct[]
}

export interface PcmProductResponse {
  data: PcmProduct,
  included: PcmProductsIncluded
}

export type PcmProductsResponse = ResourcePage<PcmProduct, PcmProductsIncluded>
export type PcmProductUpdateBody = Partial<PcmProductBase> & Identifiable
/**
 * PCM Product Endpoints
 */
export interface PcmProductsEndpoint
    extends Omit<CrudQueryableResource<PcmProduct,
    PcmProductBase,
    PcmProductUpdateBody,
    PcmProductFilter,
    PcmProductSort,
    PcmProductInclude>, 'Get' | 'Limit' | 'Offset' | 'With'> {
  endpoint: 'products'

  FileRelationships: PcmFileRelationshipEndpoint
  TemplateRelationships: PcmTemplateRelationshipEndpoint
  VariationsRelationships: PcmVariationsRelationshipsEndpoint
  MainImageRelationships: PcmMainImageRelationshipEndpoint

  Limit(value: number): PcmProductsEndpoint

  Offset(value: number): PcmProductsEndpoint

  With(included: string): PcmProductsEndpoint

  Get(id: string): PcmProductResponse

  /**
   * Build Child Products
   * @param productId - The ID of the base product to build the child products for.
   * @constructor
   */
  BuildChildProducts(productId: string): Promise<{}>

  /**
   * Get Child Products
   * @param productId - The ID of the base product to get the child products for.
   * @constructor
   */

  GetChildProducts(
    productId: string,
  ): Promise<ResourcePage<PcmProduct>>

  /**
   * Import Products
   * @param file - The file you want to upload. The file type is `.csv`.
   * @constructor
   */
  ImportProducts(file: FormData): Promise<{}>
}

