import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'
import {
  auth,
  promotionsArray as promotions,
  promotionCodesArray as promotionCodes
} from '../factories'

const apiUrl = 'https://api.moltin.com/v2'
const accessToken = 'testaccesstoken'

describe('Moltin promotions', () => {
  const Moltin = MoltinGateway({
    custom_authenticator: () => auth(accessToken)
  })

  it('should return an array of promotions', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .get('/promotions')
      .reply(200, { data: promotions })

    return Moltin.Promotions.All().then(response => {
      assert.lengthOf(response.data, 2)
    })
  })

  it('should return a single promotion', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .get('/promotions/1')
      .reply(200, promotions[0])

    return Moltin.Promotions.Get('1').then(response => {
      assert.propertyVal(response, 'id', promotions[0].id)
    })
  })

  it('should create a new promotion', () => {
    const newPromotion: any = {
      type: 'promotion',
      name: 'promotion-3',
      description: 'promotion-3',
      enabled: true,
      promotion_type: 'fixed_discount',
      schema: {
        currencies: [
          {
            currency: 'USD',
            amount: 111
          }
        ]
      },
      start: '2020-01-01T04:00:00Z',
      end: '2020-11-01T04:00:00Z'
    }

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .post('/promotions', { data: newPromotion })
      .reply(201, promotions[0])

    return Moltin.Promotions.Create(newPromotion).then(response => {
      assert.propertyVal(response, 'id', promotions[0].id)
    })
  })

  it('should return an array of promotion codes', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .get('/promotions/1/codes')
      .reply(200, { data: promotionCodes })

    return Moltin.Promotions.Codes('1').then(response => {
      assert.lengthOf(response.data, 2)
    })
  })

  it('should create a new promotion codes', () => {
    const newCodes = [{ code: 'QWERTY' }]
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .post('/promotions/1/codes', {
        data: { codes: newCodes, type: 'promotion_codes' }
      })
      .reply(201, promotions[0])

    return Moltin.Promotions.AddCodes('1', newCodes).then(response => {
      assert.propertyVal(response, 'id', promotions[0].id)
    })
  })
})
