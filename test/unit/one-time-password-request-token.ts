import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'

const apiUrl = 'https://euwest.api.elasticpath.com/v2'

describe('User Authentication Password Profile Info', () => {
    const Moltin = MoltinGateway({
        client_id: 'XXX'
    })

    const realmId = '96764ca9-af12-4355-acce-37fa2ef4728a'
    const passwordProfileId = '4da65e78-7f9b-4248-b498-823d43120da9'

    it('Create a One Time Password Token Info', () => {
        nock(apiUrl, {})
            .post(/\/authentication-realms\/(.*)\/password-profiles\/(.*)\/onetime-password-request-token/)
            .reply(201, {})

        const body = {
            type: "one_time_password_request_token",
            username: "john.doe",
            purpose : "reset_password"
        }

        return Moltin.OneTimePasswordTokenRequest.Create(realmId,passwordProfileId, { data: body }).then(res => {
            assert.isObject(res)
        })
    })
})
