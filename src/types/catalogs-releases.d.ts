import { Identifiable, Resource, ResourceList } from './core'
import { Hierarchy } from './hierarchies'

export interface ReleaseBase extends Identifiable {
  name: string
  published_at: string
}

export interface ReleaseResponse extends Identifiable {
  type: 'catalog'
  attributes: {
    hierarchies: {
      id: string
      label: string
      name: string
    }
  }
}

export interface CatalogsReleasesEndpoint {
  endpoint: 'releases'

  All(options: {
    catalogId: string
    token?: string
  }): Promise<ResourceList<ReleaseResponse>>

  Get(options: {
    catalogId: string
    releaseId: string
    token?: string
  }): Promise<Resource<ReleaseResponse>>

  GetAllHierarchies(options: {
    catalogId: string
    releaseId: string
    token?: string
  }): Promise<Resource<Hierarchy>>

  Create(options: {
    catalogId: string
    token?: string
  }): Promise<Resource<ReleaseBase>>
}
