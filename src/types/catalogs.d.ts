/**
 * Products
 * Description: Products are the core resource to any Commerce Cloud project. They can be associated by category, collection, brands, and more.
 */
import {
  Identifiable,
  CrudQueryableResource
} from './core'
import { CatalogsNodesEndpoint } from './catalogs-nodes'
import { CatalogsProductsEndpoint } from './catalogs-products'
import { CatalogsReleasesEndpoint } from './catalogs-releases'
import { CatalogsRulesEndpoint } from './catalogs-rules'

/**
 * Core PCM Product Base Interface
 * For custom flows, extend this interface
 */
export interface CatalogBase {
  type: 'catalog'
  attributes: {
    name: string
    description?: string
    hierarchy_ids: string[]
    pricebook_id: string
    created_at?: string
    updated_at?: string
  }
}

export interface Catalog extends Identifiable, CatalogBase {
  relationships?: {
    children?: {
      data: {
        type: 'node'
        id: string
      }[]
    }
  }
}

export interface CatalogFilter {
  // TODO
}

type CatalogSort = // TODO
  | ''

type CatalogInclude = // TODO
  | ''

/**
 * PCM Product Endpoints
 */

export type CatalogUpdateBody = Partial<CatalogBase> & Identifiable

export interface CatalogsEndpoint
  extends CrudQueryableResource<Catalog,
    CatalogBase,
    CatalogUpdateBody,
    CatalogFilter,
    CatalogSort,
    CatalogInclude> {
  endpoint: 'catalogs'
  Nodes: CatalogsNodesEndpoint
  Products: CatalogsProductsEndpoint
  Releases: CatalogsReleasesEndpoint
  Rules: CatalogsRulesEndpoint
}
