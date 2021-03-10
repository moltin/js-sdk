import {assert} from 'chai'
import nock from 'nock'
import {AccountMembershipCreateBody, gateway as MoltinGateway} from '../../src/moltin'

const apiUrl = 'https://api.moltin.com'

describe('Moltin Account Memberships', () => {
    const Moltin = MoltinGateway({
        client_id: 'XXX',
    })

    it('Get a single account membership', () => {
        nock(apiUrl, {})
            .post('/oauth/access_token')
            .reply(200, {
                access_token: 'a550d8cbd4a4627013452359ab69694cd446615a',
            })
            .get(/accounts\/.*\/account-memberships\/.*/)
            .reply(200, {})
        const accountId = '64f35045-2a76-4bcf-b6ba-02bb12090d38'
        const accountMembershipId = '64f35045-2a76-4bcf-b6ba-02bb12090d39'

        return Moltin.AccountMemberships.Get(accountId, accountMembershipId).then((res) => {
            assert.isObject(res)
        })
    })

    it('Create a single account membership', () => {
        nock(apiUrl, {})
            .post('/oauth/access_token')
            .reply(200, {
                access_token: 'a550d8cbd4a4627013452359ab69694cd446615a',
            })
            .post(/accounts\/.*\/account-memberships/)
            .reply(201, {})
        const accountId = '64f35045-2a76-4bcf-b6ba-02bb12090d38'

        let abcd: AccountMembershipCreateBody = {
            account_member_id: "asdf",
            type: "fdas"
        };
        return Moltin.AccountMemberships.Create(accountId, abcd).then((res) => {
            assert.isObject(res)
        })
    })

    it('Delete a single account', () => {

        const accountId = '64f35045-2a76-4bcf-b6ba-02bb12090d38'
        const accountMembershipId = '64f35045-2a76-4bcf-b6ba-02bb12090d39'

        // Intercept the API request
        nock(apiUrl, {})
            .post('/oauth/access_token')
            .reply(200, {
                access_token: 'a550d8cbd4a4627013452359ab69694cd446615a',
            })
            .delete(/accounts\/.*\/account-memberships\/.*/)
            .reply(204, {})


        return Moltin.AccountMemberships.Delete(accountId, accountMembershipId).then((res) => {
            assert.isObject(res)
        })
    })
})
