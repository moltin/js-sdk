/**
 * Products
 * Description: Products are the core resource to any Commerce Cloud project. They can be associated by category, collection, brands, and more.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/products/index.html
 */
import {
  Identifiable,
  Relationship,
  RelationshipToMany,
  CrudQueryableResource
} from './core'
import { Price, FormattedPrice } from './price'

/**
 * Core Product Base Interface
 * For custom flows, extend this interface
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/products/index.html
 */
export interface ProductBase {
  type: string
  name: string
  slug: string
  sku: string
  manage_stock: boolean
  description: string
  price: Price[]
  status?: 'draft' | 'live'
  commodity_type: 'physical' | 'digital'
}

export interface Product extends Identifiable, ProductBase {
  meta: {
    timestamps: {
      created_at: string
      updated_at: string
    }
    stock: {
      level: number
      availability: 'in-stock' | 'out-stock'
    }
    display_price: {
      with_tax: FormattedPrice
      without_tax: FormattedPrice
    }
    variations: any
  }
  relationships: {
    main_image?: Relationship<'main_image'>
    files?: RelationshipToMany<'file'>
    categories?: Relationship<'category'>[]
    brands?: Relationship<'brand'>[]
    parent?: Relationship<'product'>
    children?: RelationshipToMany<'product'>
  }
}

/**
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/products/filtering.html
 */
export interface ProductFilter {
  eq?: {
    name?: string
    slug?: string
    sku?: string
    status?: string
    commodity_type?: string
    manage_stock?: string
    brand?: {
      id?: string
    }
    category?: {
      id?: string
    }
    collection?: {
      id?: string
    }
  }
  lt?: {
    stock?: number
  }
  gt?: {
    stock?: number
  }
  like?: {
    name?: string
    slug?: string
    sku?: string
    status?: string
    description?: string
  }
}

type ProductSort =
  | 'commodity_type'
  | '-commodity_type'
  | 'created_at'
  | '-created_at'
  | 'description'
  | '-description'
  | 'manage_stock'
  | '-manage_stock'
  | 'name'
  | '-name'
  | 'sku'
  | '-sku'
  | 'slug'
  | '-slug'
  | 'status'
  | '-status'
  | 'updated_at'
  | '-updated_at'

type ProductInclude =
  | 'main_images'
  | 'files'
  | 'brands'
  | 'categories'
  | 'collections'
  | 'variations'

/**
 * Product Endpoints
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/orders-and-customers/products/index.html
 * Get DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/products/get-a-product.html
 * Get All DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/products/get-all-products.html
 * Update DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/products/update-a-product.html
 */
export interface ProductsEndpoint
  extends CrudQueryableResource<
      Product,
      ProductBase,
      Partial<ProductBase>,
      ProductFilter,
      ProductSort,
      ProductInclude
    > {
  endpoint: 'products'

  /**
   * Create Relationships
   * Description: Create a Product relationship to on or more Categories, Main Images, Variations, Files, Brands or Collections. If any relationships already exist, the one’s made in the request will be added to them
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/products/relationships/index.html
   * Category DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/products/relationships/brand-relationship.html
   * Brand DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/products/relationships/category-relationship.html
   * Collection DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/products/relationships/collection-relationships.html
   * File DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/products/relationships/file-relationships.html
   * Main Image DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/products/relationships/main-image-relationship.html
   * Variation DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/products/relationships/variations-relationship.html
   * @param id productId
   * @param type resource types
   * @param resources [] Array of resource ids to add
   * @constructor
   */
  CreateRelationships<T = any>(
    id: string,
    type: string,
    resources: string | string[]
  ): Promise<T>

  /**
   * Delete Relationship
   * Description: Remove a relationship between a Product and Resource(s). This deletes the relationships specified in the payload.
   * DOCS: Same as Create Relationships
   * @param id productId
   * @param type resource types
   * @param resources [] Array of resource ids to remove
   * @constructor
   */
  DeleteRelationships<T = any>(
    id: string,
    type: string,
    resources: string | string[]
  ): Promise<T>

  /**
   * Update Relationship
   * Description: Replace the relationships between a Product and a Resource. Unlike a POST to this endpoint, a PUT overrides any existing relationships.
   * DOCS: Same as Create Relationships
   * @param id productId
   * @param type resource types
   * @param resources [] Array of resource ids to update
   * @constructor
   */
  UpdateRelationships<T = any>(
    id: string,
    type: string,
    resources?: string | string[]
  ): Promise<T>

  /**
   * Build Child Products
   * Description: This endpoint builds your child/variation products. After you have a base product and have attached
   * some variations, this endpoint triggers the process that applies those variations to the base product.
   * The result is a list of child products that each have one combination of the variation options applied to it.
   * The id you should use in the url is that of the base product.
   * DOCS:https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/product-variations/build-child-products.html#docsNav
   * @param id productId
   * @constructor
   */
  BuildChildProducts<T = any>(id: string): Promise<T>
}
