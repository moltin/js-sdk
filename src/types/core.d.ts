export as namespace core

export interface ResourcePage<R> {
  data: R[]
  links: { [key: string]: string | null }
  meta: {
    page: {
      current: number
      limit: number
      offset: number
      total: number
    }
    results: {
      total: number
    }
  }
}

export interface Resource<R> {
  data: R
}

export interface Relationship<T> {
  data: {
    id: string
    type: T
  }
}

export namespace core {
  export interface QueryableResource<R, F, S, I> {
    All<ER extends R = R>(token?: string): Promise<ResourcePage<ER>>

    Get<ER extends R = R>(id: string, token?: string): Promise<Resource<ER>>

    Filter(filter: F): QueryableResource<R, F, S, I>

    Limit(value: number): QueryableResource<R, F, S, I>

    Offset(value: number): QueryableResource<R, F, S, I>

    Sort(value: S): QueryableResource<R, F, S, I>

    With(includes: I | I[]): QueryableResource<R, F, S, I>
  }

  export interface CrudQueryableResource<R, F, S, I> extends QueryableResource<R, F, S, I> {
    Create<ER extends R = R>(
      body: R
    ): Promise<Resource<ER>>

    Delete<ER extends R = R>(id: string): Promise<ResourcePage<ER>>

    Update<ER extends R = R>(
      id: string,
      body: R
    ): Promise<ResourcePage<ER>>
  }

  export interface RequestFactory {
    config: Config
    storage: StorageFactory

    authenticate(): Promise<AuthenticateResponseBody>

    send<T = any>(
      uri: string,
      method: HttpVerbs,
      body?: any,
      token?: string
    ): Promise<T>

    constructor(Config)
  }

  export interface ConfigOptions {
    application?: string
    client_id: string
    client_secret?: string
    currency?: string
    host?: string
    custom_fetch?: Function
  }

  export interface Config {
    application?: string
    client_id: string
    client_secret?: string
    host: string
    protocol: 'https'
    version: 'v2'
    currency?: string,
    language?: string,
    custom_fetch?: Function
    auth: {
      expires: 3600
      uri: 'oauth/access_token'
    }
    sdk: {
      version: string
      language: 'JS'
    }

    constructor(options: ConfigOptions)
  }

  export interface StorageFactory {
    localStorage: Storage

    set(key: string, value: string): void

    get(key: string): string | null

    delete(key: string): void
  }

  export enum HttpVerbs {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Patch = 'PATCH',
    Delete = 'DELETE'
  }

  export enum GrantType {
    ClientCredentials = 'client_credentials',
    Implicit = 'implicit'
  }

  export interface AuthenticateResponseBody {
    expires: number
    identifier: GrantType
    expires_in: number
    access_token: string
    token_type: 'Bearer'
  }
}