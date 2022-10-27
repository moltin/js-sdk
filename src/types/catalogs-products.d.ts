import type { Identifiable, Resource, ResourceList, ResourcePage } from './core'
import type { ProductFilter } from './product'
import type { PcmProduct, ProductComponents } from './pcm'
import type { MatrixObject, Option, Variation } from './variations'
import type {Extensions} from "./extensions";
import type { FormattedPrice } from './price'


export interface CatalogsProductVariation extends Omit<Variation, 'relationships' | 'options'> {
  options: Omit<Option, 'modifiers'>[]
}

export interface ProductResponse extends Identifiable {
  type: 'product'
  attributes: {
    availability: string
    base_product: boolean
    base_product_id: string
    commodity_type: string
    components: ProductComponents
    created_at: string
    description: string
    dimensions: string
    manage_stock: boolean
    name: string
    price: {
      [key: string]: {
        amount: number
        includes_tax: boolean
      }
    }
    product_hash: string
    sku: string
    slug: string
    status: string
    store_id: string
    translations: string[]
    updated_at: string
    weight: string,
    extensions?: Extensions
  };
  meta: {
    catalog_id?: string
    catalog_source?: 'pcm'
    pricebook_id?: string
    display_price?: {
      without_tax: FormattedPrice
    }
    original_display_price?: {
      without_tax: FormattedPrice
    }
    variation_matrix?: MatrixObject
    variations?: CatalogsProductVariation[]
    bundle_configuration?: {
      selected_options: {
        [key: string]: {
          [key: string]: number
        }
      }
    },
    component_products?: {
      [key: string]: {
        display_price: {
          without_tax: FormattedPrice
        },
        price: {
          [key: string]: {
            includes_tax: boolean
            amount: number
          }
        },
        pricebook_id: string
      }
    }
  };
  relationships: {
    categories: {
      id: string
      node_type: string
    }[]
    brands: {
      id: string
      node_type: string
    }[]
    collections: {
      id: string
      node_type: string
    }[]
    parent: {
      data: {
        id: string
        type: 'product'
      }
    }
    children: {
      id: string
      type: string
    }[]
    'custom-modifiers': string[]
    files: {
      data: {
        created_at: string
        id: string
        type: string
      }[]
    }
    main_image: {
      data: {
        id: string
        type: string
      } | null
    }
    modifiers: string[]
    'product-spec': string[]
    variationOpts: string[]
    variations: string[]
  }
}

export interface CatalogsProductsEndpoint {
  endpoint: 'products'

  Limit(value: number): CatalogsProductsEndpoint

  Offset(value: number): CatalogsProductsEndpoint

  Filter(filter: ProductFilter): CatalogsProductsEndpoint

  All(options: { token?: string }): Promise<ResourceList<ProductResponse>>

  Get(options: {
    productId: string
    token?: string
  }): Promise<Resource<ProductResponse>>

  GetProduct(options: {
    catalogId: string
    releaseId: string
    productId: string
    token?: string
  }): Promise<Resource<ProductResponse>>

  GetCatalogNodeProducts(options: {
    catalogId: string
    releaseId: string
    nodeId: string
    token?: string
  }): Promise<ResourceList<ProductResponse>>

  GetProductsByNode(options: {
    nodeId: string
    token?: string
  }): Promise<ResourceList<ProductResponse>>

  GetCatalogProducts(options: {
    catalogId: string
    releaseId: string
    token?: string
  }): Promise<ResourcePage<PcmProduct>>

  GetCatalogProductChildren(options: {
    catalogId: string
    releaseId: string
    productId: string
    token?: string
  }): Promise<ResourcePage<PcmProduct>>

  GetProductsInCatalogRelease(options: {
    catalogId: string
    releaseId: string
    token?: string
  }): Promise<ResourcePage<ProductResponse>>
}
