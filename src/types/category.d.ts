/**
 * Categories
 * Description: Categories allow you to organize your Products into hierarchical groups. That means these groups can
 * also contain other Categories, which can then be viewed in a tree structure.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/categories/index.html
 */
import { core } from './core'

export as namespace category

export namespace category {
  /**
   * Core Category Base Interface
   * For custom flows, extend this interface
   * DOCS:
   */
  export interface CategoryBase {
    id?: string
    type: string
    name: string
    slug: string
    description: string
    status: string
    children?: CategoryBase
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
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/categories/filtering.html
   */
  export interface CategoryFilter {
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

  type CategorySort = 'created_at' | 'description' | 'name' | 'slug' | 'status' | 'updated_at'

  type CategoryInclude = 'products'

  /**
   * Category Endpoints
   */
  export interface CategoryEndpoint extends core.CrudQueryableResource<CategoryBase, CategoryFilter, CategorySort, CategoryInclude> {
    endpoint: 'category'

    /**
     * Title: Tree (Relationships)
     * Description: You can use the Categories API to associate categories with each other in a hierarchical tree
     * structure. The relationship between Categories is known as parents and children. You can create relationships
     * between categories by attaching parent and child category IDs to the category of interest. A category can have 1
     * parent but many children. The Category Relationship endpoint allows you to specify the parent and children of a
     * category in one request.
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/categories/relationships/index.html
     */
    Tree(): Promise<CategoryBase>
  }
}