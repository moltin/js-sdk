
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

  Delete(id: string): Promise<{}>;

  Update(
    id: string,
    body: U,
    token?: string
  ): Promise<Resource<R>>;
}
