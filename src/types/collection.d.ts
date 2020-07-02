/**
 * Collections
 * Description: Collections allow you to organize your products into hierarchical groups. Where a dress product might be in the category Clothing, the individual product might also be in the collection Summer.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/collections/index.html
 */
import { core } from './core'

export as namespace collection

export namespace collection {
  /**
   * Core Collection Base Interface
   * For custom flows, extend this interface
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/collections/index.html
   */
  export interface CollectionBase {
    id?: string
    type: string
    name: string
    slug: string
    description: string
    status: string
    meta?: {
      timestamps: {
        created_at: string
        updated_at: string
      }
    }
    relationships: {
      products: {
        data: {
          type: string
          id: string
        } []
      }
    }
  }

  /**
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/collections/filtering.html
   */
  export interface CollectionFilter {
    eq?: {
      name?: string
      slug?: string
      status?: string
    },
    like?: {
      name?: string
      slug?: string
    }
  }

  /**
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/basics/sorting.html
   */
  type CollectionSort = 'created_at' | 'description' | 'name' | 'slug' | 'status' | 'updated_at'
  type CollectionInclude = 'products'

  /**
   * Collection Endpoints
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/collections/index.html
   * Get DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/collections/get-a-collection.html
   * Get All DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/categories/get-all-categories.html
   * Create DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/collections/create-a-collection.html
   * Update DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/collections/update-a-collection.html
   * Delete DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/collections/delete-a-collection.html
   */
  export interface CollectionEndpoint extends core.CrudQueryableResource<CollectionBase, CollectionFilter, CollectionSort, CollectionInclude> {
    endpoint: 'collection'
  }
}