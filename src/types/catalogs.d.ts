/**
 * Products
 * Description: Products are the core resource to any Commerce Cloud project. They can be associated by category, collection, brands, and more.
 */
import {
  Identifiable,
  CrudQueryableResource, Resource, ResourcePage
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

export type CatalogSort = // TODO
  | ''

export type CatalogInclude = // TODO
  | ''

/**
 * PCM Product Endpoints
 */
export interface CatalogsEndpoint {
  endpoint: 'catalogs'
  // Nodes: CatalogsNodesEndpoint
  // Products: CatalogsProductsEndpoint
  // Releases: CatalogsReleasesEndpoint
  // Rules: CatalogsRulesEndpoint

  All(token?: string): Promise<ResourcePage<Catalog[]>>
}
