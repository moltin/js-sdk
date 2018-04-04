import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'

const apiUrl = 'https://api.moltin.com/v2'

describe('Moltin flow fields', () => {
  it('should create a field', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/fields', {
        data: {
          type: 'field',
          name: 'A new field'
        }
      })
      .reply(201, {
        name: 'A new field'
      })

    return Moltin.Fields.Create({
      name: 'A new field'
    }).then(response => {
      assert.propertyVal(response, 'name', 'A new field')
    })
  })

  it('should update a field', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .put('/fields/1', {
        data: {
          type: 'field',
          name: 'Updated field name'
        }
      })
      .reply(200, {
        name: 'Updated field name'
      })

    return Moltin.Fields.Update('1', {
      name: 'Updated field name'
    }).then(response => {
      assert.propertyVal(response, 'name', 'Updated field name')
    })
  })

  it('should get a field', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/fields/1')
      .reply(200, {
        name: 'Updated field name'
      })

    return Moltin.Fields.Get('1').then(response => {
      assert.propertyVal(response, 'name', 'Updated field name')
    })
  })

  it('should delete a field', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .delete('/fields/1')
      .reply(204)

    return Moltin.Fields.Delete('1').then(response => {
      assert.equal(response, '{}')
    })
  })
})
