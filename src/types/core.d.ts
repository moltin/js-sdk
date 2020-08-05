
export interface Identifiable {
  id: string;
}

export interface Resource<R> {
  data: R;
}

export interface ResourceList<R> {
  data: R[];
}

export interface ResourcePage<R> extends ResourceList<R> {
  links: { [key: string]: string | null };
  meta: {
    page: {
      current: number;
      limit: number;
      offset: number;
      total: number;
    };
    results: {
      total: number;
    };
  };
}

export interface Relationship<T> {
  data: {
    id: string;
    type: T;
  };
}

export interface RelationshipToMany<T> {
  data: {
    id: string;
    type: T;
  }[];
}

export interface QueryableResource<R, F, S, I> {
  All(token?: string): Promise<ResourcePage<R>>;

  Get(id: string, token?: string): Promise<Resource<R>>;

  Filter(filter: F): QueryableResource<R, F, S, I>;

  Limit(value: number): QueryableResource<R, F, S, I>;

  Offset(value: number): QueryableResource<R, F, S, I>;

  Sort(value: S): QueryableResource<R, F, S, I>;

  With(includes: I | I[]): QueryableResource<R, F, S, I>;
}

export interface CrudQueryableResource<R, C, U, F, S, I> extends QueryableResource<R, F, S, I> {
  Create(
    body: C
  ): Promise<Resource<R>>;

  Delete(id: string): Promise<Resource<R>>;

  Update(
    id: string,
    body: U
  ): Promise<Resource<R>>;
}

export interface RequestFactory {
  config: Config;
  storage: StorageFactory;

  authenticate(): Promise<AuthenticateResponseBody>;

  send<T = any>(
    uri: string,
    method: HttpVerbs,
    body?: any,
    token?: string
  ): Promise<T>;

  constructor(config: Config): void;
}

export interface ConfigOptions {
  application?: string;
  client_id: string;
  client_secret?: string;
  language?: string;
  currency?: string;
  host?: string;
  custom_fetch?: Function;
}

export interface Config {
  application?: string;
  client_id: string;
  client_secret?: string;
  host: string;
  protocol: 'https';
  version: 'v2';
  currency?: string;
  language?: string;
  custom_fetch?: Function;
  auth: {
    expires: 3600;
    uri: 'oauth/access_token';
  }
  sdk: {
    version: string;
    language: 'JS';
  }

  constructor(options: ConfigOptions): void;
}

export interface StorageFactory {
  localStorage: Storage;

  set(key: string, value: string): void;

  get(key: string): string | null;

  delete(key: string): void;
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
  expires: number;
  identifier: GrantType;
  expires_in: number;
  access_token: string;
  token_type: 'Bearer';
}
