import type {
  ResourceList, Resource
} from './core'
import type { ProductResponse } from './catalogs-products'
import type { Catalog, CatalogFilter } from './catalogs'
import type { Node } from './nodes'
import type { Hierarchy } from './hierarchies'
import type { File } from './file'
import { Identifiable } from './core';
  
export interface CatalogResource<T> extends Resource<T> {
  included?: {
    main_images?: File[]
    files?: File[]
  }
}

export interface CatalogResourceList<T> extends ResourceList<T> {
  included?: {
    main_images?: File[]
    files?: File[]
  }
}

export interface CatalogReleaseBase extends Identifiable {
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

interface CatalogQueryableResource<Endpoints, DataType, Filter> {
  Filter(filter: Filter): Endpoints

  Limit(value: number): Endpoints

  Offset(value: number): Endpoints
}

type CatalogProductsInclude = 'main_image' | 'files' | 'component_products'

interface CatalogAdditionalHeaders {
  'EP-Context-Tag'?: string
  'EP-Channel'?: string
}

interface CatalogProductsQueryableResource<
  Endpoints,
  DataType,
  Filter,
  Include
> extends CatalogQueryableResource<Endpoints, DataType, Filter> {
  With(includes: Include | Include[]): Endpoints
}

export interface CatalogProductsEndpoint
  extends CatalogProductsQueryableResource<
      CatalogProductsEndpoint,
      Catalog,
      CatalogFilter,
      CatalogProductsInclude
    > {
  endpoint: 'products'

  All(options?: {
    token?: string
    additionalHeaders?: CatalogAdditionalHeaders
  }): Promise<CatalogResourceList<ProductResponse>>

  Get(options: {
    productId: string
    token?: string
    additionalHeaders?: CatalogAdditionalHeaders
  }): Promise<CatalogResource<ProductResponse>>

  GetProductsByNode(options: {
    nodeId: string
    token?: string
    additionalHeaders?: CatalogAdditionalHeaders
  }): Promise<CatalogResourceList<ProductResponse>>

  GetProductsByHierarchy(options: {
    hierarchyId: string
    token?: string
    additionalHeaders?: CatalogAdditionalHeaders
  }): Promise<CatalogResourceList<ProductResponse>>
}

export interface NodesCatalogEndpoint
  extends CatalogQueryableResource<
      NodesCatalogEndpoint,
      Catalog,
      CatalogFilter
    > {
  endpoint: 'nodes'

  All(options?: {
    token?: string
    additionalHeaders?: CatalogAdditionalHeaders
  }): Promise<CatalogResourceList<Node>>

  Get(options: {
    nodeId: string
    token?: string
    additionalHeaders?: CatalogAdditionalHeaders
  }): Promise<CatalogResource<Node>>

  GetNodeChildren(options: {
    nodeId: string
    token?: string
    additionalHeaders?: CatalogAdditionalHeaders
  }): Promise<CatalogResourceList<Node>>

  GetNodeProducts(options: {
    nodeId: string
    token?: string
    additionalHeaders?: CatalogAdditionalHeaders
  }): Promise<CatalogResourceList<ProductResponse>>
}

export interface PublishedCatalogEndpoint {
  Get(options?: {
    token?: string
    additionalHeaders?: CatalogAdditionalHeaders
  }): Promise<Resource<CatalogReleaseBase>>
}

export interface HierarchiesCatalogEndpoint
  extends CatalogQueryableResource<
      HierarchiesCatalogEndpoint,
      Catalog,
      CatalogFilter
    > {
  endpoint: 'products'

  All(options?: {
    token?: string
    additionalHeaders?: CatalogAdditionalHeaders
  }): Promise<CatalogResourceList<Hierarchy>>

  Get(options: {
    hierarchyId: string
    token?: string
    additionalHeaders?: CatalogAdditionalHeaders
  }): Promise<CatalogResource<Hierarchy>>

  GetHierarchyChildren(options: {
    hierarchyId: string
    token?: string
    additionalHeaders?: CatalogAdditionalHeaders
  }): Promise<CatalogResourceList<Node>>

  GetHierarchyNodes(options?: {
    token?: string
    additionalHeaders?: CatalogAdditionalHeaders
  }): Promise<CatalogResourceList<Hierarchy>>
}

export interface CatalogEndpoint
  extends CatalogQueryableResource<CatalogEndpoint, Catalog, CatalogFilter> {
  endpoint: 'catalog'
  Nodes: NodesCatalogEndpoint
  Products: CatalogProductsEndpoint
  Hierarchies: HierarchiesCatalogEndpoint
  Catalog: PublishedCatalogEndpoint

  All(token?: string): Promise<CatalogResourceList<Catalog>>
}
