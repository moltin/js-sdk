import RequestFactory from './request'
import { buildURL } from './helpers'
import { ResourcePage, Resource } from './core';
import { DEFINEME } from './helper';
import Config from './config';

export type FilterOp = { [prop: string]: any };
export type Filter = { [op: string]: FilterOp };

export interface UrlParams {
  includes: string;
  sort: string;
  limit: number;
  offset: number;
  filter: Filter;
}

export class BaseExtend<R, F extends Filter, S, I> {
  request: DEFINEME;
  config: Config;
  call: DEFINEME;
  includes: DEFINEME;
  sort: DEFINEME;
  limit: DEFINEME;
  offset: DEFINEME;
  filter?: F;
  endpoint: DEFINEME;

  constructor(config: Config) {
    this.request = new RequestFactory(config);
    this.config = config;
  }

  All(token: string | null = null): Promise<ResourcePage<R>> {
    const { includes, sort, limit, offset, filter } = this;

    this.call = this.request.send(
      buildURL(this.endpoint, {
        includes,
        sort,
        limit,
        offset,
        filter
      }),
      'GET',
      undefined,
      token,
      this
    );

    return this.call;
  }

  Get(id: string, token?: string): Promise<Resource<R>> {
    this.call = this.request.send(
      buildURL(`${this.endpoint}/${id}`, {
        includes: this.includes
      }),
      'GET',
      undefined,
      token,
      this
    );

    return this.call;
  }

  Filter(filter: DEFINEME): BaseExtend<R, F, S, I> {
    this.filter = filter;

    return this;
  }

  Limit(value: string): BaseExtend<R, F, S, I> {
    this.limit = value;

    return this;
  }

  Offset(value: string): BaseExtend<R, F, S, I> {
    this.offset = value;

    return this;
  }

  Sort(value: string): BaseExtend<R, F, S, I> {
    this.sort = value;

    return this;
  }

  With(includes: string): BaseExtend<R, F, S, I> {
    if (includes) this.includes = includes.toString().toLowerCase();

    return this;
  }
}
