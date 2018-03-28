import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'
import {
  flowsArray as flows,
  flowEntriesArray as flowEntries
} from '../factories'

const apiUrl = 'https://api.moltin.com/v2'

describe('Moltin flows', () => {
  it('should create a flow', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/flows', {
        data: {
          type: 'flow',
          name: 'A new flow'
        }
      })
      .reply(201, {
        name: 'A new flow'
      })
    return Moltin.Flows.Create({
      name: 'A new flow'
    }).then(response => {
      assert.propertyVal(response, 'name', 'A new flow')
    })
  })

  it('should update a flow', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .put('/flows/flow-1', {
        data: {
          type: 'flow',
          name: 'Updated flow name'
        }
      })
      .reply(200, {
        name: 'Updated flow name'
      })

    return Moltin.Flows.Update('flow-1', {
      name: 'Updated flow name'
    }).then(response => {
      assert.propertyVal(response, 'name', 'Updated flow name')
    })
  })

  it('should get a flow', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/flows/flow-1')
      .reply(200, {
        name: 'Updated flow name'
      })

    return Moltin.Flows.Get('flow-1').then(response => {
      assert.propertyVal(response, 'name', 'Updated flow name')
    })
  })

  it('should delete a flow', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .delete('/flows/flow-1')
      .reply(204)

    return Moltin.Flows.Delete('flow-1').then(response => {
      assert.equal(response, '{}')
    })
  })

  it('should return an array of flows', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/flows')
      .reply(200, flows)

    return Moltin.Flows.All().then(response => {
      assert.lengthOf(response, 2)
    })
  })

  it('should return a single flow', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/flows/flow-1')
      .reply(200, flows[0])

    return Moltin.Flows.Get('flow-1').then(response => {
      assert.propertyVal(response, 'name', 'Flow 1')
    })
  })

  it('should return an array of flows entries', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/flows/flow-1/entries')
      .reply(200, flowEntries)

    return Moltin.Flows.GetEntries('flow-1').then(response => {
      assert.lengthOf(response, 2)
    })
  })

  it('should create a flow entry', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/flows/flow-1/entries', {
        data: {
          type: 'entry',
          name: 'A new entry'
        }
      })
      .reply(201, {
        name: 'A new entry'
      })

    return Moltin.Flows.CreateEntry('flow-1', {
      name: 'A new entry'
    }).then(response => {
      assert.propertyVal(response, 'name', 'A new entry')
    })
  })

  it('should update an entry', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .put('/flows/flow-1/entries/1', {
        data: {
          type: 'entry',
          name: 'Updated flow name'
        }
      })
      .reply(200, {
        name: 'Updated flow name'
      })

    return Moltin.Flows.UpdateEntry('flow-1', '1', {
      name: 'Updated flow name'
    }).then(response => {
      assert.propertyVal(response, 'name', 'Updated flow name')
    })
  })

  it('should get an entry', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/flows/flow-1/entries/1')
      .reply(200, {
        name: 'Updated flow name'
      })

    return Moltin.Flows.GetEntry('flow-1', '1').then(response => {
      assert.propertyVal(response, 'name', 'Updated flow name')
    })
  })

  it('should delete an entry', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .delete('/flows/flow-1/entries/1')
      .reply(204)

    return Moltin.Flows.DeleteEntry('flow-1', '1').then(response => {
      assert.equal(response, '{}')
    })
  })
})
