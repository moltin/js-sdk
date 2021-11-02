import { Identifiable, Resource, ResourceList } from './core'

export interface NodeBaseResponse extends Identifiable {
  type: 'node'
  attributes: {
    created_at: string
    published_at?: string
    description: string
    label: string
    name: string
    slug: string
    status: string
    updated_at: string
  }
  relationships: {
    children: {
      id: string
      label: string
      name: string
    }[]
    products: {
      id: string
      type: string
    }[]
    parent: {
      data: {
        id: string
        type: 'node'
      }
      links: {
        related: string
      }
    }
  }
}

export interface NodesResponse extends NodeBaseResponse {
  links: {
    self: string
  }
}

export interface CatalogsNodesEndpoint {
  endpoint: 'nodes'

  Limit(value: number): CatalogsNodesEndpoint

  Offset(value: number): CatalogsNodesEndpoint

  All(options: { token?: string }): Promise<ResourceList<NodesResponse>>

  Get(options: {
    nodeId: string
    token?: string
  }): Promise<Resource<NodeBaseResponse>>

  GetNodeChildren(options: {
    nodeId: string
    token?: string
  }): Promise<ResourceList<NodesResponse>>

  GetNodeChildrenFromCatalogReleases(options: {
    catalogId: string
    releaseId: string
    nodeId: string
    token?: string
  }): Promise<ResourceList<NodesResponse>>

  GetAllCatalogNodes(options: {
    catalogId: string
    releaseId: string
    token?: string
  }): Promise<ResourceList<NodesResponse>>

  GetNodeInCatalogRelease(options: {
    catalogId: string
    releaseId: string
    nodeId: string
    token?: string
  }): Promise<Resource<NodeBaseResponse>>
}
