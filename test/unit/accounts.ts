import {assert} from 'chai'
import nock from 'nock'
import {gateway as MoltinGateway} from '../../src/moltin'

const apiUrl = 'https://api.moltin.com'

describe('Moltin Accounts', () => {
    const Moltin = MoltinGateway({
        client_id: 'XXX',
    })
    // TODO MT-6474 Implement this test after MT-6474 is done (Accounts GET /v2/accounts)
    // it('Get all Accounts', () => {
    //     nock(apiUrl, {}).get('/accounts').reply(200, {})
    //
    //     return Moltin.Account.All().then((res) => {
    //         assert.isObject(res)
    //     })
    // })

    it('Get a single account', () => {
        nock(apiUrl, {})
            .post('/oauth/access_token')
            .reply(200, {
                access_token: 'a550d8cbd4a4627013452359ab69694cd446615a',
            })
            .get(/accounts\/*/)
            .reply(200, {})
        const accountId = '64f35045-2a76-4bcf-b6ba-02bb12090d38'

        return Moltin.Account.Get(accountId).then((res) => {
            assert.isObject(res)
        })
    })

    it('Create a single account', () => {
        nock(apiUrl, {})
            .post('/oauth/access_token')
            .reply(200, {
                access_token: 'a550d8cbd4a4627013452359ab69694cd446615a',
            })
            .post(/accounts\/*/)
            .reply(201, {})

        const body = {
            type: 'account',
            name: 'sub-acc-test-create-name-1',
            legal_name: 'sub-acc-test-create-legal-name-1',
            company_address: '123',
            registration_id: '00000000-0000-1000-8000-000000000000',
        }

        return Moltin.Account.Create(body).then((res) => {
            assert.isObject(res)
        })
    })

    it('Update a single account', () => {
        nock(apiUrl, {})
            .post('/oauth/access_token')
            .reply(200, {
                access_token: 'a550d8cbd4a4627013452359ab69694cd446615a',
            })
            .put(/accounts\/*/)
            .reply(201, {})

        const body = {
            type: 'account',
            name: 'sub-acc-test-create-name-1',
            legal_name: 'sub-acc-test-create-legal-name-1',
            company_address: '123',
        }

        const accountId = '64f35045-2a76-4bcf-b6ba-02bb12090d38'

        return Moltin.Account.Update(accountId, body).then((res) => {
            assert.isObject(res)
        })
    })

    it('Delete a single account', () => {

        const accountId = '64f35045-2a76-4bcf-b6ba-02bb12090d38'

        // Intercept the API request
        nock(apiUrl, {})
            .post('/oauth/access_token')
            .reply(200, {
                access_token: 'a550d8cbd4a4627013452359ab69694cd446615a',
            })
            .delete(/accounts\/*/)
            .reply(204, {})


        return Moltin.Account.Delete(accountId).then((res) => {
            assert.isObject(res)
        })
    })
})
