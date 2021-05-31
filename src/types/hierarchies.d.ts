/**
 * Products
 * Description: Products are the core resource to any Commerce Cloud project. They can be associated by category, collection, brands, and more.
 */
import {
  Identifiable,
  CrudQueryableResource, ResourceList, ResourcePage
} from './core'
import { NodesEndpoint, Node } from './nodes'
import { NodeRelationshipsEndpoint } from './node-relationships'

/**
 * Core PCM Product Base Interface
 * For custom flows, extend this interface
 */
export interface HierarchyBase {
  type: 'hierarchy'
  attributes: {
    name: string
    description?: string
    slug?: string
  }
}

export interface Hierarchy extends Identifiable, HierarchyBase {
  relationships?: {
    children?: {
      data: {
        type: 'node'
        id: string
      }[]
    }
  }
}

export interface HierarchyFilter {
  // TODO
}

type HierarchySort = // TODO
  | ''

type HierarchyInclude = // TODO
  | ''

/**
 * PCM Product Endpoints
 */
export interface HierarchiesEndpoint
  extends CrudQueryableResource<Hierarchy,
    HierarchyBase,
    Partial<HierarchyBase>,
    HierarchyFilter,
    HierarchySort,
    HierarchyInclude> {
  endpoint: 'hierarchies'
  Nodes: NodesEndpoint
  Relationships: NodeRelationshipsEndpoint
  Children(id: string, token?: string): Promise<ResourcePage<Node>>
  Limit(value: number): HierarchiesEndpoint
  Offset(value: number): HierarchiesEndpoint
}
