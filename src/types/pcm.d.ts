/**
 * Products
 * Description: Products are the core resource to any Commerce Cloud project. They can be associated by category, collection, brands, and more.
 */
import {
  Identifiable,
  CrudQueryableResource
} from './core'
import { PcmFileRelationshipEndpoint } from "./pcm-file-relationship";
import { PcmTemplateRelationshipEndpoint } from './pcm-template-relationship'

/**
 * Core PCM Product Base Interface
 * For custom flows, extend this interface
 */
export interface PcmProductBase {
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
    // TODO
  }
}

export interface PcmProductFilter {
  // TODO
}

type PcmProductSort = // TODO
  | 'name'

type PcmProductInclude = // TODO
  | 'price'

export type PcmProductUpdateBody = Partial<PcmProductBase> & Identifiable
/**
 * PCM Product Endpoints
 */
export interface PcmProductsEndpoint
  extends CrudQueryableResource<PcmProduct,
    PcmProductBase,
    PcmProductUpdateBody,
    PcmProductFilter,
    PcmProductSort,
    PcmProductInclude> {
  endpoint: 'products'

  FileRelationships: PcmFileRelationshipEndpoint
  TemplateRelationships: PcmTemplateRelationshipEndpoint
}
