import {
  Identifiable,
  CrudQueryableResource, ResourceList, Resource
} from './core'
import { ProductResponse } from './catalogs-products'
import { Catalog, CatalogBase, CatalogFilter, CatalogInclude, CatalogSort } from './catalogs'

export type CatalogUpdateBody = Partial<CatalogBase> & Identifiable

export interface CatalogProductsEndpoint {
  endpoint: 'products'

  All(options?: {
    token?: string
  }): Promise<ResourceList<ProductResponse>>

  Get(options: {
    productId: string
    token?: string
  }): Promise<Resource<ProductResponse>>

  GetProductsByNode(options: {
    nodeId: string
    token?: string
  }): Promise<ResourceList<ProductResponse>>

  GetProductsByHierarchy(options: {
    hierarchyId: string
    token?: string
  }): Promise<ResourceList<ProductResponse>>

}

export interface NodesCatalogEndpoint {
  endpoint: 'nodes'

  All(options?: {
    token?: string
  }): Promise<ResourceList<ProductResponse>>

  Get(options: {
    nodeId: string
    token?: string
  }): Promise<Resource<ProductResponse>>

  GetNodeChildren(options: {
    nodeId: string
    token?: string
  }): Promise<ResourceList<ProductResponse>>
}

export interface HierarchiesCatalogEndpoint {
  endpoint: 'products'

  All(options?: {
    token?: string
  }): Promise<ResourceList<ProductResponse>>

  Get(options: {
    hierarchyId: string
    token?: string
  }): Promise<Resource<ProductResponse>>

  GetHierarchyChildren(options: {
    hierarchyId: string
    token?: string
  }): Promise<ResourceList<ProductResponse>>

  GetHierarchyNodes(options?: {
    token?: string
  }): Promise<ResourceList<ProductResponse>>
}

export interface CatalogEndpoint
  extends CrudQueryableResource<Catalog,
    CatalogBase,
    CatalogUpdateBody,
    CatalogFilter,
    CatalogSort,
    CatalogInclude> {
  endpoint: 'catalog'
  Nodes: NodesCatalogEndpoint
  Products: CatalogProductsEndpoint
  Hierarchies: HierarchiesCatalogEndpoint
}
