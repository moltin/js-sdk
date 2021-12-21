import { AccountMemberBase } from "./account-members";

export interface Identifiable {
  id: string
}

export interface Resource<R> {
  data: R
}

export interface ResourceList<R> {
  data: R[]
}

export interface Attribute {
  label: string
  value: string
  type: string
  required: boolean
  options?: string[]
  description?: string
  validation_rules?: Validation[]
  validation?: {
    regex: string
  }
}

export interface Validation {
  type: string,
  to?: string,
  options?: any
}

export interface AttributesMeta {
  entity: string
  version: string
}

export interface Attributes extends ResourceList<Attribute> {
  meta: AttributesMeta
}

export interface ResourcePage<R, I = never> extends ResourceList<R> {
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
  included?: I
}

export interface Relationship<T> {
  data: {
    id: string
    type: T
  }
}

export interface RelationshipToMany<T> {
  data: {
    id: string
    type: T
  }[]
}

export interface RelationshipToOne<T> {
  data: {
    id: string;
    type: T;
  };
}

export interface QueryableResource<R, F, S, I> {
  All(token?: string): Promise<ResourcePage<R>>

  Get(id: string, token?: string): Promise<Resource<R>>

  Filter(filter: F): QueryableResource<R, F, S, I>

  Limit(value: number): QueryableResource<R, F, S, I>

  Offset(value: number): QueryableResource<R, F, S, I>

  Sort(value: S): QueryableResource<R, F, S, I>

  With(includes: I | I[]): QueryableResource<R, F, S, I>

  Attributes(token?: string): Promise<Attributes>

  GetChildProducts(id: string): Promise<ResourcePage<R>>

  VariationsOptions(id: string): Promise<ResourcePage<S>>
}

export interface CrudQueryableResource<R, C, U, F, S, I>
  extends QueryableResource<R, F, S, I> {
  Create(body: C): Promise<Resource<R>>

  Delete(id: string): Promise<{}>

  Update(id: string, body: U, token?: string): Promise<Resource<R>>
}
