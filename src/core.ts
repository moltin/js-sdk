
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
