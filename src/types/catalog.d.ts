import type { ResourceList, Resource, ResourcePage } from './core'
import type { ProductResponse } from './catalogs-products'
import type { Catalog, CatalogFilter } from './catalogs'
import type { Node } from './nodes'
import type { Hierarchy } from './hierarchies'
import type { File } from './file'
import { Identifiable } from './core'

export interface ShopperCatalogResource<T> extends Resource<T> {
  included?: {
    main_images?: File[]
    files?: File[]
    component_products?: ProductResponse[]
  }
}

/** @deprecated Use ShopperCatalogResourcePage instead. Will be removed on next major release. */
export interface ShopperCatalogResourceList<T> extends ResourceList<T> {
  included?: {
    main_images?: File[]
    files?: File[]
  }
}

export interface ShopperCatalogReleaseBase extends Identifiable {
  type: 'catalog-release'
  attributes: {
    published_at: string
    hierarchies: {
      id: string
      label?: string
      name?: string
    }[]
    description?: string
    name?: string
    catalog_id?: string
  }
  relationships: {
    hierarchies: {
      links: {
        related: string
      }
    }
    products: {
      links: {
        related: string
      }
    }
    delta: {
      links: {
        related: string
      }
    }
  }
  meta: {
    created_at: string
    is_full_delta: boolean
    is_full_publish: boolean
    owner: 'store' | 'organization'
    percent_completed: number
    total_nodes: number
    total_products: number
    release_status: 'PENDING' | 'IN_PROGRESS' | 'FAILED' | 'PUBLISHED'
    started_at: string
  }
  links: {
    self: string
  }
}

interface ShopperCatalogQueryableResource<Endpoints, DataType, Filter> {
  Filter(filter: Filter): Endpoints

  Limit(value: number): Endpoints

  Offset(value: number): Endpoints
}

type ShopperCatalogProductsInclude =
  | 'main_image'
  | 'files'
  | 'component_products'

type ShopperCatalogNodesInclude = 'main_image' | 'files' | 'component_products'

interface ShopperCatalogAdditionalHeaders {
  'EP-Context-Tag'?: string
  'EP-Channel'?: string
  'X-MOLTIN-LANGUAGE'?: string
  'X-MOLTIN-CURRENCY'?: string
}

interface ShopperCatalogProductsQueryableResource<
  Endpoints,
  DataType,
  Filter,
  Include
> extends ShopperCatalogQueryableResource<Endpoints, DataType, Filter> {
  With(includes: Include | Include[]): Endpoints
}

interface ShopperCatalogNodesQueryableResource<
  Endpoints,
  DataType,
  Filter,
  Include
> extends ShopperCatalogQueryableResource<Endpoints, DataType, Filter> {
  With(includes: Include | Include[]): Endpoints
}

interface ShopperCatalogResourcePageIncluded {
  main_images?: File[]
  files?: File[]
  component_products?: ProductResponse[]
}

export type ShopperCatalogResourcePage<T> = ResourcePage<
  T,
  ShopperCatalogResourcePageIncluded
>

export interface ShopperCatalogProductsEndpoint
  extends ShopperCatalogProductsQueryableResource<
    ShopperCatalogProductsEndpoint,
    Catalog,
    CatalogFilter,
    ShopperCatalogProductsInclude
  > {
  endpoint: 'products'

  All(options?: {
    token?: string
    additionalHeaders?: ShopperCatalogAdditionalHeaders
  }): Promise<ShopperCatalogResourcePage<ProductResponse>>

  Configure(options: {
    token?: string
    additionalHeaders?: ShopperCatalogAdditionalHeaders
    productId: string
    selectedOptions: {
      [key: string]: {
        [key: string]: number
      }
    }
  }): Promise<ShopperCatalogResource<ProductResponse>>

  Get(options: {
    productId: string
    token?: string
    additionalHeaders?: ShopperCatalogAdditionalHeaders
  }): Promise<ShopperCatalogResource<ProductResponse>>

  GetProductsByNode(options: {
    nodeId: string
    token?: string
    additionalHeaders?: ShopperCatalogAdditionalHeaders
  }): Promise<ShopperCatalogResourcePage<ProductResponse>>

  GetProductsByHierarchy(options: {
    hierarchyId: string
    token?: string
    additionalHeaders?: ShopperCatalogAdditionalHeaders
  }): Promise<ShopperCatalogResourcePage<ProductResponse>>

  GetProductChildren(options: {
    productId: string
    token?: string
    additionalHeaders?: ShopperCatalogAdditionalHeaders
  }): Promise<ShopperCatalogResourcePage<ProductResponse>>
}

export interface NodesShopperCatalogEndpoint
  extends ShopperCatalogNodesQueryableResource<
    NodesShopperCatalogEndpoint,
    Catalog,
    CatalogFilter,
    ShopperCatalogNodesInclude
  > {
  endpoint: 'nodes'

  All(options?: {
    token?: string
    additionalHeaders?: ShopperCatalogAdditionalHeaders
  }): Promise<ShopperCatalogResourcePage<Node>>

  Get(options: {
    nodeId: string
    token?: string
    additionalHeaders?: ShopperCatalogAdditionalHeaders
  }): Promise<ShopperCatalogResource<Node>>

  GetNodeChildren(options: {
    nodeId: string
    token?: string
    additionalHeaders?: ShopperCatalogAdditionalHeaders
  }): Promise<ShopperCatalogResourcePage<Node>>

  GetNodeProducts(options: {
    nodeId: string
    token?: string
    additionalHeaders?: ShopperCatalogAdditionalHeaders
  }): Promise<ShopperCatalogResourcePage<ProductResponse>>
}

export interface HierarchiesShopperCatalogEndpoint
  extends ShopperCatalogQueryableResource<
    HierarchiesShopperCatalogEndpoint,
    Catalog,
    CatalogFilter
  > {
  endpoint: 'products'

  All(options?: {
    token?: string
    additionalHeaders?: ShopperCatalogAdditionalHeaders
  }): Promise<ShopperCatalogResourcePage<Hierarchy>>

  Get(options: {
    hierarchyId: string
    token?: string
    additionalHeaders?: ShopperCatalogAdditionalHeaders
  }): Promise<ShopperCatalogResource<Hierarchy>>

  GetHierarchyChildren(options: {
    hierarchyId: string
    token?: string
    additionalHeaders?: ShopperCatalogAdditionalHeaders
  }): Promise<ShopperCatalogResourcePage<Node>>

  GetHierarchyNodes(options?: {
    hierarchyId: string
    token?: string
    additionalHeaders?: ShopperCatalogAdditionalHeaders
  }): Promise<ShopperCatalogResourcePage<Node>>
}

export interface ShopperCatalogEndpoint
  extends ShopperCatalogQueryableResource<
    ShopperCatalogEndpoint,
    Catalog,
    CatalogFilter
  > {
  endpoint: 'catalog'
  Nodes: NodesShopperCatalogEndpoint
  Products: ShopperCatalogProductsEndpoint
  Hierarchies: HierarchiesShopperCatalogEndpoint

  Get(options?: {
    token?: string
    additionalHeaders?: ShopperCatalogAdditionalHeaders
  }): Promise<Resource<ShopperCatalogReleaseBase>>
}
