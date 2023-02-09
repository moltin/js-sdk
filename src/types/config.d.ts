import { StorageFactory } from './storage'
import { Moltin } from '../moltin'

export interface RequestFactory {
  config: Config
  storage: StorageFactory

  authenticate(): Promise<AuthenticateResponseBody>

  send<T = any>(
    uri: string,
    method: HttpVerbs,
    body?: any,
    token?: string,
    instance?: Moltin,
    wrapBody?: Boolean,
    version?: 'v1' | 'v2' | 'v3' | 'pcm',
    additionalHeaders?: { [key: string]: string }
  ): Promise<T>

  constructor(config: Config): void
}

export interface ConfigOptions {
  name?: string
  application?: string
  client_id?: string
  client_secret?: string
  language?: string
  currency?: string
  host?: string
  custom_fetch?: Function
  custom_authenticator?: () => Promise<CustomAuthenticatorResponseBody>
  storage?: StorageFactory
  storage_type?: 'cookies' | 'localStorage'
  headers?: { [key: string]: string }
  disableCart?: boolean
  reauth?: boolean
  retryDelay?: number
  retryJitter?: number
  fetchMaxAttempts?: number
  throttleEnabled?: boolean
  throttleLimit?: number
  throttleInterval?: number
}

export interface Config {
  name?: string
  application?: string
  client_id: string
  client_secret?: string
  host: string
  protocol: 'https'
  version: 'v1' | 'v2' | 'v3' | 'pcm'
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
  storage_type?: 'cookies' | 'localStorage'
  retryDelay?: number
  retryJitter?: number
  fetchMaxAttempts?: number
  throttleConfig?: {
    throttleEnabled?: boolean
    throttleLimit?: number
    throttleInterval?: number
  }
  constructor(options: ConfigOptions): void
}

export type HttpVerbs = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export const enum GrantType {
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
