import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'
import { integrationsArray as integrations } from '../factories'

const apiUrl = 'https://api.moltin.com/v2'

describe('Moltin integrations', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX'
  })

  it('should create a new integration', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/integrations', {
        data: integrations[0]
      })
      .reply(201, {
        data: integrations[0]
      })

    return Moltin.Integrations.Create(integrations[0]).then(response => {
      assert.propertyVal(response.data, 'name', integrations[0].name)
    })
  })

  it('should update an integration', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .put(`/integrations/${integrations[1].id}`, {
        data: integrations[1]
      })
      .reply(200, {
        data: integrations[1]
      })

    return Moltin.Integrations.Update(integrations[1].id, integrations[1]).then(
      response => {
        assert.propertyVal(response.data, 'name', integrations[1].name)
      }
    )
  })

  it('should return an array of integrations', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/integrations')
      .reply(200, integrations)

    return Moltin.Integrations.All().then(response => {
      assert.lengthOf(response, 3)
    })
  })

  it('should return a single integration', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get(`/integrations/${integrations[2].id}`)
      .reply(200, {
        data: integrations[2]
      })

    return Moltin.Integrations.Get(integrations[2].id).then(response => {
      assert.propertyVal(response.data, 'id', integrations[2].id)
      assert.propertyVal(response.data, 'name', integrations[2].name)
      assert.equal(response.data.observes[0], integrations[2].observes[0])
    })
  })

  it('should delete a integration', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .delete(`/integrations/${integrations[0].id}`)
      .reply(204)

    return Moltin.Integrations.Delete(integrations[0].id).then(response => {
      assert.equal(response, '{}')
    })
  })
})
