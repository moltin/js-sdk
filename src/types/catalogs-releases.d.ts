import { Identifiable, Resource, ResourceList, ResourcePage } from './core'
import { Hierarchy } from './hierarchies'
import { ShopperCatalogReleaseBase } from "./catalog";

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

export interface ReleaseBodyBase {
  include_organization_resources: boolean
}

export interface CatalogsReleasesEndpoint {
  endpoint: 'releases'

  All(options: {
    catalogId: string
    token?: string
  }): Promise<ResourceList<ShopperCatalogReleaseBase>>

  Get(options: {
    catalogId: string
    releaseId: string
    token?: string
  }): Promise<Resource<ShopperCatalogReleaseBase>>

  GetAllHierarchies(options: {
    catalogId: string
    releaseId: string
    token?: string
  }): Promise<ResourcePage<Hierarchy>>

  Create(options: {
    catalogId: string
    body?: ReleaseBodyBase
    token?: string
  }): Promise<Resource<ReleaseBase>>

  Limit(value: number): CatalogsReleasesEndpoint

  Offset(value: number): CatalogsReleasesEndpoint
}
