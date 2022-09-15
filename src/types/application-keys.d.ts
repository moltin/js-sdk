import { Identifiable, Resource, ResourcePage } from './core'

export interface ApplicationKeyBase {
  name: string
  type: 'application_key'
}

export interface ApplicationKey extends ApplicationKeyBase, Identifiable {
    id: string
    client_id: string
    client_secret?: string
    meta: {
      timestamps: {
        created_at: string
        updated_at: string
      }
    }
}
export interface ApplicationKeyResponse extends Resource<ApplicationKey> {
  links: {
    self: string
  }
}

export interface ApplicationKeysEndpoint {
  All(): Promise<ResourcePage<ApplicationKey>>
  Create(body: ApplicationKeyBase): Promise<ApplicationKeyResponse>
  Delete(id: string): Promise<{}>
}
