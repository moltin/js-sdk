import {
  Identifiable,
  Resource, ResourceList
} from './core'
import { Product } from './product'

export interface NodeRelationshipBase {
  type: 'product'
  id: string
}

export interface NodeRelationship extends NodeRelationshipBase {
  relationships: {}
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
}
