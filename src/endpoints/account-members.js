import { buildURL } from '../utils/helpers'
import BaseExtend from '../extends/base'

class AccountMembersEndpoint extends BaseExtend {
  constructor(endpoint) {
    super(endpoint)
    this.endpoint = 'account-members'
  }

  Get(accountMemberId, token = null) {
    return this.request.send(
      `${this.endpoint}/${accountMemberId}`,
      'GET',
      undefined,
      token
    )
  }

  All(token = null, headers = {}) {
    const { limit, offset, filter } = this

    this.call = this.request.send(
      buildURL(this.endpoint, {
        limit,
        offset,
        filter
      }),
      'GET',
      undefined,
      token,
      this,
      headers
    )

    return this.call
  }

  UnassignedAccountMembers(accountId, token = null) {
    const { limit, offset, filter } = this

    this.call = this.request.send(
      buildURL(
        `accounts/${accountId}/account-memberships/unassigned-account-members`,
        {
          limit,
          offset,
          filter
        }
      ),
      'GET',
      undefined,
      token,
      this
    )

    return this.call
  }

  TokenViaPassword(username, password, password_profile_id, headers) {
    const body = {
      type: 'account_management_authentication_token',
      authentication_mechanism: 'password',
      username,
      password,
      password_profile_id
    }

    return this.request.send(
      `${this.endpoint}/tokens`,
      'POST',
      body,
      null,
      {
        ...headers
      }
    )
  }

  TokenViaSelfSignup(username, password, password_profile_id, name, email, headers) {
    const body = {
      type: 'account_management_authentication_token',
      authentication_mechanism: 'self_signup',
      username,
      password,
      name,
      email,
      password_profile_id
    }

    return this.request.send(
      `${this.endpoint}/tokens`,
      'POST',
      body,
      null,
      {
        ...headers
      }
    )
  }

  TokenViaOIDC(code, redirectUri, codeVerifier, headers) {
    const body = {
      type: 'account_management_authentication_token',
      authentication_mechanism: 'oidc',
      oauth_authorization_code: code,
      oauth_redirect_uri: redirectUri,
      oauth_code_verifier: codeVerifier
    }

    return this.request.send(
      `${this.endpoint}/tokens`,
      'POST',
      body,
      null,
      {
        ...headers
      }
    )
  }

  SwitchAccountToken(headers) {
    const body = {
        data: {
          type: "account_management_authentication_token",
          authentication_mechanism: "account_management_authentication_token"
      }
    }
    const newHeader = {
      'EP-Account-Management-Authentication-Token': headers
    }

    return this.request.send(
      `${this.endpoint}/tokens`,
      'POST',
      body,
      null,
      null,
      null,
      null,
      newHeader
    )
  }
}

export default AccountMembersEndpoint
