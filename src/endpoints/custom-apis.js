import CRUDExtend from '../extends/crud'

import { buildURL } from '../utils/helpers'

class CustomApisEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'settings/extensions/custom-apis'
    this.entriesEndpoint = 'extensions'
  }

  Create(body) {
    return this.request.send(
      this.endpoint, 
      'POST', 
      body
    )
  }

  Update(id, body) {
    return this.request.send(
      `${this.endpoint}/${id}`,
      'PUT',
      body
    )
  }

  GetFields(customApiId) {
    const { limit, offset, sort } = this

    return this.request.send(
      buildURL(`${this.endpoint}/${customApiId}/fields`, {
        limit,
        offset,
        sort
      }),
      'GET'
    )
  }

  GetField(customApiId, customApiFieldId) {
    return this.request.send(
      `${this.endpoint}/${customApiId}/fields/${customApiFieldId}`,
      'GET'
    )
  }

  CreateField(customApiId, body) {
    return this.request.send(
      `${this.endpoint}/${customApiId}/fields`,
      'POST',
      body
    )
  }
  
  UpdateField(customApiId, customApiFieldId, body) {
    return this.request.send(
      `${this.endpoint}/${customApiId}/fields/${customApiFieldId}`,
      'PUT',
      body
    )
  }

  DeleteField(customApiId, customApiFieldId) {
    return this.request.send(
      `${this.endpoint}/${customApiId}/fields/${customApiFieldId}`,
      'DELETE'
    )
  }

  GetEntries(customApiSlug) {
    const { limit, offset, sort, filter } = this

    return this.request.send(
      buildURL(`${this.entriesEndpoint}/${customApiSlug}`, {
        limit,
        offset,
        sort,
        filter
      }),
      'GET'
    )
  }

  GetEntry(customApiSlug, customApiEntryId) {
    return this.request.send(
      `${this.entriesEndpoint}/${customApiSlug}/${customApiEntryId}`,
      'GET'
    )
  }

  CreateEntry(customApiSlug, body) {
    return this.request.send(
      `${this.entriesEndpoint}/${customApiSlug}`,
      'POST',
      body
    )
  }

  UpdateEntry(customApiSlug, customApiEntryId, body) {
    return this.request.send(
      `${this.entriesEndpoint}/${customApiSlug}/${customApiEntryId}`,
      'PUT',
      body
    )
  }

  DeleteEntry(customApiSlug, customApiEntryId) {
    return this.request.send(
      `${this.entriesEndpoint}/${customApiSlug}/${customApiEntryId}`,
      'DELETE'
    )
  }
}

export default CustomApisEndpoint
