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
        data: {
          type: 'integration',
          name: 'A new integration'
        }
      })
      .reply(201, {
        name: 'A new integration'
      })

    return Moltin.Integrations.Create({
      name: 'A new integration'
    }).then(response => {
      assert.propertyVal(response, 'name', 'A new integration')
    })
  })

  it('should update an integration', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .put('/integrations/integration-1', {
        data: {
          type: 'integration',
          name: 'Updated integration name'
        }
      })
      .reply(200, {
        name: 'Updated integration name'
      })

    return Moltin.Integrations.Update(integrations[0].id, {
      name: 'Updated integration name'
    }).then(response => {
      assert.propertyVal(response, 'name', 'Updated integration name')
    })
  })

  it('should delete a integration', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .delete('/integrations/integration-1')
      .reply(204)

    return Moltin.Integrations.Delete(integrations[0].id).then(response => {
      assert.equal(response, '{}')
    })
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
      console.log(response)
      assert.lengthOf(response, 2)
    })
  })

  // it('should return a single integration', () => {
  //   // Intercept the API request
  //   nock(apiUrl, {
  //     reqheaders: {
  //       Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
  //     }
  //   })
  //     .get('/integration/integration-1')
  //     .reply(200, integrations[0])

  //   return Moltin.Integrations.Get(integrations[0].id).then(response => {
  //     assert.propertyVal(response, 'name', 'Integration 1')
  //   })
  // })
})
