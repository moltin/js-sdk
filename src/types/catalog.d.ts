import type {
  ResourceList, Resource
} from './core'
import type { ProductResponse } from './catalogs-products'
import type { Catalog, CatalogFilter } from './catalogs'
import type { Node } from './nodes'
import type { Hierarchy } from './hierarchies'
import type { File } from './file'
import { Identifiable } from './core';
  
export interface ShopperCatalogResource<T> extends Resource<T> {
  included?: {
    main_images?: File[]
    files?: File[]
  }
}

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

interface ShopperCatalogAdditionalHeaders {
  'EP-Context-Tag'?: string
  'EP-Channel'?: string
}

interface ShopperCatalogProductsQueryableResource<
  Endpoints,
  DataType,
  Filter,
  Include
> extends ShopperCatalogQueryableResource<Endpoints, DataType, Filter> {
  With(includes: Include | Include[]): Endpoints
}

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
  }): Promise<ShopperCatalogResourceList<ProductResponse>>

  Get(options: {
    productId: string
    token?: string
    additionalHeaders?: ShopperCatalogAdditionalHeaders
  }): Promise<ShopperCatalogResource<ProductResponse>>

  GetProductsByNode(options: {
    nodeId: string
    token?: string
    additionalHeaders?: ShopperCatalogAdditionalHeaders
  }): Promise<ShopperCatalogResourceList<ProductResponse>>

  GetProductsByHierarchy(options: {
    hierarchyId: string
    token?: string
    additionalHeaders?: ShopperCatalogAdditionalHeaders
  }): Promise<ShopperCatalogResourceList<ProductResponse>>
}

export interface NodesShopperCatalogEndpoint
  extends ShopperCatalogQueryableResource<
      NodesShopperCatalogEndpoint,
      Catalog,
      CatalogFilter
    > {
  endpoint: 'nodes'

  All(options?: {
    token?: string
    additionalHeaders?: ShopperCatalogAdditionalHeaders
  }): Promise<ShopperCatalogResourceList<Node>>

  Get(options: {
    nodeId: string
    token?: string
    additionalHeaders?: ShopperCatalogAdditionalHeaders
  }): Promise<ShopperCatalogResource<Node>>

  GetNodeChildren(options: {
    nodeId: string
    token?: string
    additionalHeaders?: ShopperCatalogAdditionalHeaders
  }): Promise<ShopperCatalogResourceList<Node>>

  GetNodeProducts(options: {
    nodeId: string
    token?: string
    additionalHeaders?: ShopperCatalogAdditionalHeaders
  }): Promise<ShopperCatalogResourceList<ProductResponse>>
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
  }): Promise<ShopperCatalogResourceList<Hierarchy>>

  Get(options: {
    hierarchyId: string
    token?: string
    additionalHeaders?: ShopperCatalogAdditionalHeaders
  }): Promise<ShopperCatalogResource<Hierarchy>>

  GetHierarchyChildren(options: {
    hierarchyId: string
    token?: string
    additionalHeaders?: ShopperCatalogAdditionalHeaders
  }): Promise<ShopperCatalogResourceList<Node>>

  GetHierarchyNodes(options?: {
    token?: string
    additionalHeaders?: ShopperCatalogAdditionalHeaders
  }): Promise<ShopperCatalogResourceList<Hierarchy>>
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
