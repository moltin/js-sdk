/**
 * Brands
 * Description: The Brands API allows you to organize products into hierarchical groups. Where a shoe product might be
 * in the category Shoes, the individual product might also be in the brand Nike.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/brands/index.html
 */
import { Identifiable, CrudQueryableResource, RelationshipToMany } from './core'

/**
 * Core Brand Base Interface
 * For custom flows, extend this interface
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/brands/index.html
 */
export interface BrandBase {
  type: 'brand'
  name: string
  slug: string
  description: string
  status: 'live' | 'draft'
}

export interface Brand extends Identifiable, BrandBase {
  meta: {
    timestamps: {
      created_at: string
      updated_at: string
    }
  }
  relationships: {
    products: RelationshipToMany<'product'>
  }
}

/**
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/brands/filtering.html
 */
export interface BrandFilter {
  eq?: {
    name?: string
    slug?: string
    status?: string
  }
  like?: {
    name?: string
    slug?: string
  }
}

/**
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/basics/sorting.html
 */
type BrandSort =
  | 'created_at'
  | 'description'
  | 'name'
  | 'slug'
  | 'status'
  | 'updated_at'

type BrandInclude = 'products'

/**
 * Brand Endpoints
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/brands/get-all-brands.html
 * Get DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/brands/get-a-brand.html
 * Get All DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/brands/get-all-brands.html
 * Create DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/brands/create-a-brand.html
 * Update DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/brands/update-a-brand.html
 * Delete DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/brands/delete-a-brand.html
 */
export interface BrandEndpoint
  extends CrudQueryableResource<
      Brand,
      BrandBase,
      Identifiable & Partial<BrandBase>,
      BrandFilter,
      BrandSort,
      BrandInclude
    > {
  endpoint: 'brand'
}
