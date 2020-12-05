import { StorageFactory } from './storage'

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

  constructor(config: Config): void
}

export interface ConfigOptions {
  application?: string
  client_id?: string
  client_secret?: string
  language?: string
  currency?: string
  host?: string
  custom_fetch?: Function
  custom_authenticator?: () => Promise<CustomAuthenticatorResponseBody>
  storage?: StorageFactory
  headers?: { [key: string]: string }
  disableCart?: Boolean
  reauth?: Boolean
}

export interface Config {
  application?: string
  client_id: string
  client_secret?: string
  host: string
  protocol: 'https'
  version: 'v2'
  currency?: string
  language?: string
  custom_fetch?: Function
  custom_authenticator?: () => Promise<CustomAuthenticatorResponseBody>
  auth: {
    expires: 3600
    uri: 'oauth/access_token'
    fetch: Function
  }
  sdk: {
    version: string
    language: 'JS'
  }
  storage?: StorageFactory

  constructor(options: ConfigOptions): void
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

export interface CustomAuthenticatorResponseBody {
  expires: number
  access_token: string
}
