import { Identifiable, Resource, ResourceList } from './core'
import { ProductFilter } from './product'
import { ProductComponents } from './pcm'

export interface ProductResponse extends Identifiable {
  type: 'product'
  attributes: {
    availability: string
    base_product: boolean
    base_product_id: string
    commodity_type: string
    components: string[] | ProductComponents
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
    weight: string
  }
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
  }): Promise<ResourceList<ProductResponse>>
}
