/**
 * Products
 * Description: Products are the core resource to any Commerce Cloud project. They can be associated by category, collection, brands, and more.
 */
import {
  Identifiable,
  CrudQueryableResource
} from './core'

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
    created_at: string
    updated_at: string
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
export interface CatalogsEndpoint
  extends CrudQueryableResource<Catalog,
    CatalogBase,
    Partial<CatalogBase>,
    CatalogFilter,
    CatalogSort,
    CatalogInclude> {
  endpoint: 'catalogs'
}
