import { Identifiable, Resource, ResourcePage, CrudQueryableResource } from './core'

export interface ApplicationKeyBase {
  name: string
  type: 'application_key'
  reserved_rate_limit?: number
}

export interface ApplicationKey extends ApplicationKeyBase, Identifiable {
    id: string
    client_id: string
    client_secret?: string
    meta: {
      timestamps: {
        created_at: string
        updated_at: string
        last_used_at: string | null
      }
    }
}

interface MetaReservedRps {
  meta: {
    total_reserved_rate_limit: number
  }
}

export interface ApplicationKeyResponse extends Resource<ApplicationKey> {
  links: {
    self: string
  }
}

export interface ApplicationKeysEndpoint extends CrudQueryableResource<
  ApplicationKey,
  ApplicationKeyBase,
  Partial<ApplicationKey>,
  never,
  never,
  never
> {
  All(): Promise<ResourcePage<ApplicationKey> & MetaReservedRps>
  Create(body: ApplicationKeyBase): Promise<ApplicationKeyResponse>
  Delete(id: string): Promise<{}>
}
