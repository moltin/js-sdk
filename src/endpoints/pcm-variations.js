import CRUDExtend from '../extends/crud'
import { buildURL } from '../utils/helpers'

class PCMVariationsEndpoint extends CRUDExtend {
  constructor(endpoint) {
    const config = { ...endpoint } // Need to clone config so it is only updated in PCM
    config.version = 'pcm'
    super(config)
    this.endpoint = 'variations'
  }

  CreateVariation(body) {
    return this.request.send(this.endpoint, 'POST', {
      ...body,
      type: 'product-variation'
    })
  }

  UpdateVariation(id, body, token = null) {
    return this.request.send(
      `${this.endpoint}/${id}`,
      'PUT',
      {
        ...body,
        type: 'product-variation'
      },
      token
    )
  }

  VariationsOption(variationId, optionId) {
    return this.request.send(
      `${this.endpoint}/${variationId}/options/${optionId}`,
      'GET'
    )
  }

  VariationsOptions(variationId) {
    const { includes, sort, limit, offset, filter } = this
    return this.request.send(
      buildURL(`${this.endpoint}/${variationId}/options`, {
        includes,
        sort,
        limit,
        offset,
        filter
      }),
      'GET'
    )
  }

  CreateVariationsOption(variationId, body) {
    return this.request.send(
      `${this.endpoint}/${variationId}/options`,
      'post',
      {
        ...body,
        type: 'product-variation-option'
      }
    )
  }

  UpdateVariationsOption(variationId, optionId, body) {
    return this.request.send(
      `${this.endpoint}/${variationId}/options/${optionId}`,
      'PUT',
      {
        ...body,
        type: 'product-variation-option'
      }
    )
  }

  DeleteVariationsOption(variationId, optionId) {
    return this.request.send(
      `${this.endpoint}/${variationId}/options/${optionId}`,
      'DELETE'
    )
  }

  VariationsModifier(variationId, optionId, modifierId) {
    return this.request.send(
      `${
        this.endpoint
      }/${variationId}/options/${optionId}/modifiers/${modifierId}`,
      'GET'
    )
  }

  VariationsModifiers(variationId, optionId) {
    return this.request.send(
      `${this.endpoint}/${variationId}/options/${optionId}/modifiers`,
      'GET'
    )
  }

  CreateVariationsModifier(variationId, optionId, body) {
    return this.request.send(
      `${this.endpoint}/${variationId}/options/${optionId}/modifiers`,
      'post',
      {
        ...body,
        type: 'product-variation-modifier'
      }
    )
  }

  UpdateVariationsModifier(variationId, optionId, modifierId, body) {
    return this.request.send(
      `${
        this.endpoint
      }/${variationId}/options/${optionId}/modifiers/${modifierId}`,
      'PUT',
      {
        ...body,
        type: 'product-variation-modifier',
        id: modifierId
      }
    )
  }

  DeleteVariationsModifier(variationId, optionId, modifierId) {
    return this.request.send(
      `${
        this.endpoint
      }/${variationId}/options/${optionId}/modifiers/${modifierId}`,
      'DELETE'
    )
  }
}

export default PCMVariationsEndpoint
