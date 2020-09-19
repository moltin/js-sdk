import { singularize } from 'inflected';

import { BaseExtend, Filter } from './base';

export class CRUDExtend<R, F extends Filter, S, I> extends BaseExtend<R, F, S, I> {
  Create(body: any) {
    return this.request.send(this.endpoint, 'POST', {
      ...body,
      type: singularize(this.endpoint)
    });
  }

  Delete(id: string) {
    return this.request.send(`${this.endpoint}/${id}`, 'DELETE')
  }

  Update(id: string, body: any, token: string | null = null) {
    return this.request.send(
      `${this.endpoint}/${id}`,
      'PUT',
      {
        ...body,
        type: singularize(this.endpoint)
      },
      token
    );
  }
}
