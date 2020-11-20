import CRUDExtend from '../extends/crud'

class VariationsEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)
    this.endpoint = 'variations'
  }

  Create(body) {
    return this.request.send(this.endpoint, 'POST', {
      ...body,
      type: 'product-variation'
    })
  }

  Update(id, body, token = null) {
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

  Option(variationId, optionId) {
    return this.request.send(
      `${this.endpoint}/${variationId}/options/${optionId}`,
      'GET'
    )
  }

  Options(variationId) {
    return this.request.send(`${this.endpoint}/${variationId}/options`, 'GET')
  }

  CreateOption(variationId, body) {
    return this.request.send(
      `${this.endpoint}/${variationId}/options`,
      'post',
      body
    )
  }

  UpdateOption(variationId, optionId, body) {
    return this.request.send(
      `${this.endpoint}/${variationId}/options/${optionId}`,
      'PUT',
      body
    )
  }

  DeleteOption(variationId, optionId) {
    return this.request.send(
      `${this.endpoint}/${variationId}/options/${optionId}`,
      'DELETE'
    )
  }

  Modifier(variationId, optionId, modifierId) {
    return this.request.send(
      `${
        this.endpoint
      }/${variationId}/options/${optionId}/modifiers/${modifierId}`,
      'GET'
    )
  }

  Modifiers(variationId, optionId) {
    return this.request.send(
      `${this.endpoint}/${variationId}/options/${optionId}/modifiers`,
      'GET'
    )
  }

  CreateModifier(variationId, optionId, body) {
    return this.request.send(
      `${this.endpoint}/${variationId}/options/${optionId}/modifiers`,
      'post',
      body
    )
  }

  UpdateModifier(variationId, optionId, modifierId, body) {
    return this.request.send(
      `${
        this.endpoint
      }/${variationId}/options/${optionId}/modifiers/${modifierId}`,
      'PUT',
      body
    )
  }

  DeleteModifier(variationId, optionId, modifierId) {
    return this.request.send(
      `${
        this.endpoint
      }/${variationId}/options/${optionId}/modifiers/${modifierId}`,
      'DELETE'
    )
  }
}

export default VariationsEndpoint
