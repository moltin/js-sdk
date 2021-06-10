import {
  ResourceList, Resource
} from './core'
import { ProductResponse } from './catalogs-products'
import { Catalog, CatalogFilter, CatalogInclude, CatalogSort } from './catalogs'
import { NodeBase } from './nodes'
import { Hierarchy } from './hierarchies'
import { Product } from './product'

interface CatalogQueryableResource<Endpoints, DataType, Filter> {

  Filter(filter: Filter): Endpoints

  Limit(value: number): Endpoints

  Offset(value: number): Endpoints

}

export interface CatalogProductsEndpoint
  extends CatalogQueryableResource<CatalogProductsEndpoint,
    Catalog,
    CatalogFilter> {
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

export interface NodesCatalogEndpoint
  extends CatalogQueryableResource<NodesCatalogEndpoint,
    Catalog,
    CatalogFilter> {
  endpoint: 'nodes'

  All(options?: {
    token?: string
  }): Promise<ResourceList<NodeBase>>

  Get(options: {
    nodeId: string
    token?: string
  }): Promise<Resource<NodeBase>>

  GetNodeChildren(options: {
    nodeId: string
    token?: string
  }): Promise<ResourceList<NodeBase>>
}

export interface HierarchiesCatalogEndpoint
  extends CatalogQueryableResource<HierarchiesCatalogEndpoint,
    Catalog,
    CatalogFilter> {
  endpoint: 'products'

  All(options?: {
    token?: string
  }): Promise<ResourceList<Hierarchy>>

  Get(options: {
    hierarchyId: string
    token?: string
  }): Promise<Resource<Hierarchy>>

  GetHierarchyChildren(options: {
    hierarchyId: string
    token?: string
  }): Promise<ResourceList<Hierarchy>>

  GetHierarchyNodes(options?: {
    token?: string
  }): Promise<ResourceList<Hierarchy>>
}

export interface CatalogEndpoint
  extends CatalogQueryableResource<CatalogEndpoint,
    Catalog,
    CatalogFilter> {
  endpoint: 'catalog'
  Nodes: NodesCatalogEndpoint
  Products: CatalogProductsEndpoint
  Hierarchies: HierarchiesCatalogEndpoint
}
