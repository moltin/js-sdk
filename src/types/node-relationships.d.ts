import { ResourcePage, Resource, Identifiable } from './core'
import { PcmProduct } from './pcm'

export interface NodeRelationshipBase {
  type: 'product'
  id: string
}

export interface NodeRelationship extends NodeRelationshipBase {
  relationships: {}
}

export interface NodeRelationshipParent {
  type: 'node'
  id: string
}

export interface CreateChildrenSortOrderBody extends Identifiable {
  type: 'node'
  meta: {
    sort_order: number
  }
}

export interface NodeProduct extends PcmProduct {
  attributes: PcmProduct['attributes'] & {
    curated_product?: boolean
  }
}

export interface NodeRelationshipsEndpoint {
  endpoint: 'relationships/products'

  Create(options: {
    hierarchyId: string
    nodeId: string
    body: NodeRelationshipBase[]
    token?: string
  }): Promise<Resource<NodeRelationship>>

  Update(options: {
    hierarchyId: string
    nodeId: string
    body: NodeRelationshipBase[]
    token?: string
  }): Promise<Resource<NodeRelationship>>

  Delete(options: {
    hierarchyId: string
    nodeId: string
    body: NodeRelationshipBase[]
    token?: string
  }): Promise<{}>

  Products(options: {
    hierarchyId: string
    nodeId: string
    token?: string
  }): Promise<ResourcePage<NodeProduct>>

  ChangeParent(options: {
    hierarchyId: string
    nodeId: string
    body: NodeRelationshipParent
    token?: string
  }): Promise<void>

  DeleteParent(options: {
    hierarchyId: string
    nodeId: string
    token?: string
  }): Promise<void>

  CreateChildrenSortOrder(options: {
    hierarchyId: string
    nodeId: string
    body: CreateChildrenSortOrderBody[]
    token?: string
  }): Promise<void>

  Limit(value: number): NodeRelationshipsEndpoint

  Offset(value: number): NodeRelationshipsEndpoint
}
