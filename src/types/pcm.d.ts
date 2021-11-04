/**
 * Products
 * Description: Products are the core resource to any Commerce Cloud project. They can be associated by category, collection, brands, and more.
 */
import {
  Identifiable,
  CrudQueryableResource,
  ResourcePage,
  ResourceList
} from './core'
import { PcmFileRelationshipEndpoint } from './pcm-file-relationship'
import { PcmTemplateRelationshipEndpoint } from './pcm-template-relationship'
import { PcmVariationsRelationshipsEndpoint } from './pcm-variations-relationships'
import { PcmMainImageRelationshipEndpoint } from './pcm-main-image-relationship'
import { File } from './file'
import { NodeBaseResponse } from './catalogs-nodes'

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
    sku: string
    status?: string
    commodity_type?: string
    upc_ean?: string | null
    mpn?: string | null
    extensions?: Object
  }
}

export interface PcmProduct extends Identifiable, PcmProductBase {
  meta: {
    variation_matrix: { [key: string]: string } | {}
  }
}

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

type PcmProductSort = 'name' // TODO

export type PcmProductInclude = 'main_image'

interface PcmProductsIncluded {
  main_images: File[]
}

export type PcmProductResponse = ResourcePage<PcmProduct, PcmProductsIncluded>

export type PcmProductUpdateBody = Partial<PcmProductBase> & Identifiable
/**
 * PCM Product Endpoints
 */
export interface PcmProductsEndpoint
  extends CrudQueryableResource<
      PcmProduct,
      PcmProductBase,
      PcmProductUpdateBody,
      PcmProductFilter,
      PcmProductSort,
      PcmProductInclude
    > {
  endpoint: 'products'

  FileRelationships: PcmFileRelationshipEndpoint
  TemplateRelationships: PcmTemplateRelationshipEndpoint
  VariationsRelationships: PcmVariationsRelationshipsEndpoint
  MainImageRelationships: PcmMainImageRelationshipEndpoint

  /**
   * Get Nodes By Product
   * @param productId - The ID of the base product to get the nodes for.
   * @constructor
   */
  GetNodesByProduct(productId: string): Promise<ResourceList<NodeBaseResponse>>

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

  GetChildProducts(productId: string): Promise<ResourceList<PcmProduct>>
}
