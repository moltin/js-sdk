/**
 * Products
 * Description: Products are the core resource to any Commerce Cloud project. They can be associated by category, collection, brands, and more.
 */
import {
  Identifiable,
  CrudQueryableResource,
  ResourcePage,
  ResourceList,
  Resource
} from './core'
import { PcmFileRelationshipEndpoint } from './pcm-file-relationship'
import { PcmTemplateRelationshipEndpoint } from './pcm-template-relationship'
import { PcmVariationsRelationshipsEndpoint } from './pcm-variations-relationships'
import { PcmMainImageRelationshipEndpoint } from './pcm-main-image-relationship'
import { PcmJobBase, PcmJobsEndpoint } from './pcm-jobs'
import { File } from './file'
import { Locales } from './locales'
import { Node } from './nodes'

/**
§ * Core PCM Product Base Interface
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
    external_ref?: string | null
    build_rules?: BuildRules
    extensions?: Object
    locales?: { [key in Locales]?: { name?: string; description?: string } }
    components?: ProductComponents
    custom_inputs?: CustomInputs
    tags?: string[]
  }
}

export interface PcmJob extends Identifiable, PcmJobBase {
  meta: {
    file_locations: string[]
    filter: string
  }
}

export interface ProductComponents {
  [key: string]: {
    name: string
    min?: number
    max?: number
    sort_order?: number | null
    options: ProductComponentOption[]
  }
}

export interface CustomInputsValidationRules {
  type: string,
  options: {
    max_length?: number
  }
}

export interface CustomInputs {
  [key: string]: {
    name?: string
    required?: boolean
    validation_rules?: CustomInputsValidationRules[]
  }
}

export interface BuildRules {
  default: 'include' | 'exclude'
  include?: string[][]
  exclude?: string[][]
}

export interface ProductComponentOption {
  id: string
  quantity: number
  type: string
  sort_order?: number | null
  meta: {
    name: string
    sku: string
    status: string
  }
}

type productType = 'standard' | 'parent' | 'child'| 'bundle'

export interface PcmProduct extends Identifiable, PcmProductBase {
  meta: {
    variation_matrix: { [key: string]: string } | {}
    owner?: 'organization' | 'store'
    product_types?: productType[]
  }
}

export type PartialPcmProductBase = Omit<PcmProductBase, 'attributes'> & {attributes: Partial<PcmProductBase['attributes']>}

export interface PcmProductRelationships {
  relationships?: {
    base_product?: {
      data: {
        id: string
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
  'name'

export type PcmProductInclude = 'main_image' | 'component_products'

interface PcmProductsIncluded {
  main_images: File[]
  component_products: PcmProduct[]
}

export interface PcmProductResponse {
  data: PcmProduct
  included: PcmProductsIncluded
}

export type PcmProductsResponse = ResourcePage<PcmProduct, PcmProductsIncluded>
export type PcmProductUpdateBody = PartialPcmProductBase & Identifiable
/**
 * PCM Product nodes attachment body
 */
export interface PcmProductAttachmentBody {
  filter: string
  node_ids: string[]
}
/**
 * PCM Product nodes attachment response
 */
export interface PcmProductAttachmentResponse {
  meta: {
    nodes_attached: number
    nodes_not_found: string[]
  }
}
export type BuildChildProductsJob = Identifiable & PcmJobBase

/**
 * PCM Product Endpoints
 */
export interface PcmProductsEndpoint
  extends Omit<
    CrudQueryableResource<
      PcmProduct,
      PcmProductBase,
      PcmProductUpdateBody,
      PcmProductFilter,
      PcmProductSort,
      PcmProductInclude
    >,
    'Get' | 'Limit' | 'Offset' | 'With'
  > {
  endpoint: 'products'

  FileRelationships: PcmFileRelationshipEndpoint
  TemplateRelationships: PcmTemplateRelationshipEndpoint
  VariationsRelationships: PcmVariationsRelationshipsEndpoint
  MainImageRelationships: PcmMainImageRelationshipEndpoint
  Jobs: PcmJobsEndpoint

  Limit(value: number): PcmProductsEndpoint

  Offset(value: number): PcmProductsEndpoint

  With(included: string): PcmProductsEndpoint

  Get(id: string): PcmProductResponse

  /**
   * Build Child Products
   * @param productId - The ID of the base product to build the child products for.
   * @constructor
   */
  BuildChildProducts(productId: string): Promise<Resource<BuildChildProductsJob>>

  /**
   * Get Child Products
   * @param productId - The ID of the base product to get the child products for.
   * @constructor
   */

  GetChildProducts(productId: string): Promise<ResourcePage<PcmProduct>>

  /**
   * Get Product Nodes
   * https://documentation.elasticpath.com/commerce-cloud/docs/api/pcm/products/relationships/get-a-products-nodes.html
   * @param productId - The ID of the product to get the nodes for.
   * @constructor
   */
  GetProductNodes(productId: string): Promise<ResourceList<Node>>

  /**
   * Import Products
   * @param file - The file you want to upload. The file type is `.csv`.
   * @constructor
   */
  ImportProducts(file: FormData): Promise<Resource<PcmJob>>

  /**
   * Attach Nodes
   * @param body - filter and node id's
   * @constructor
   */
  AttachNodes(
    body: PcmProductAttachmentBody
  ): Promise<PcmProductAttachmentResponse>

  /**
   * Detach Nodes
   * @param body - filter and node id's
   * @constructor
   */
  DetachNodes(
    body: PcmProductAttachmentBody
  ): Promise<PcmProductAttachmentResponse>

  /**
   * Export products
   * @param filter - products filters
   * @constructor
   */
  ExportProducts(filter?: PcmProductFilter, useTemplateSlugs?: boolean): Promise<Resource<PcmJob>>
}
