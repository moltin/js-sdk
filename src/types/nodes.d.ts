/**
 * Products
 * Description: Products are the core resource to any Commerce Cloud project. They can be associated by category, collection, brands, and more.
 */

import { Identifiable, Resource, ResourceList, ResourcePage } from './core'
import { Locales } from './locales'

/**
 * Core PCM Product Base Interface
 * For custom flows, extend this interface
 */
export interface NodeBase {
  type: 'node'
  attributes: {
    name: string
    description?: string
    slug?: string
    curated_products?: string[]
    locales?: { [key in Locales]?: { name?: string; description?: string } }
  }
  relationships?: {
    parent: {
      data: {
        type: string
        id: string
      }
    }
  },
  meta?: {
    sort_order: number
  }
}

export interface Node extends Identifiable, NodeBase {
  relationships: {
    children: {
      data: []
      links: {
        related: string
      }
    }
    products: {
      data: {
        type: 'product'
        id: string
      }[]
    }
    parent: {
      data: {
        type: string
        id: string
      }
    }
  }
}

export type UpdateNodeBody = Omit<NodeBase, 'relationships' | 'attributes'> &
  Identifiable & {
    attributes: Partial<NodeBase['attributes']>
  }

export interface NodeFilter {
  // TODO
}

type NodeSort = // TODO
  ''

type NodeInclude = // TODO
  ''

/**
 * PCM Product Endpoints
 */
export interface NodesEndpoint {
  endpoint: 'nodes'

  Get(options: {
    hierarchyId: string
    nodeId: string
    token?: string
  }): Promise<Resource<Node>>

  // TODO: API - currently not working! (can get from hierarchy relationships)
  All(options: {
    hierarchyId: string
    token?: string
  }): Promise<ResourceList<Node>>

  Create(options: {
    hierarchyId: string
    body: NodeBase
    token?: string
  }): Promise<Resource<Node>>

  Update(options: {
    hierarchyId: string
    nodeId: string
    body: UpdateNodeBody
    token?: string
  }): Promise<Resource<Node>>

  Delete(options: {
    hierarchyId: string
    nodeId: string
    token?: string
  }): Promise<{}>

  GetNodeChildren(options: {
    hierarchyId: string
    nodeId: string
    token?: string
  }): Promise<ResourcePage<Node>>

  Limit(value: number): NodesEndpoint

  Offset(value: number): NodesEndpoint
}
