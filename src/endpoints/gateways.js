import BaseExtend from '../extends/base'

class GatewaysEndpoint extends BaseExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'gateways'
  }

  Update(slug, body) {
    return this.request.send(`${this.endpoint}/${slug}`, 'PUT', body)
  }

  Enabled(slug, enabled) {
    return this.request.send(`${this.endpoint}/${slug}`, 'PUT', {
      type: 'gateway',
      enabled
    })
  }

  GetSlugAttributes(slug, token = null) {
    return this.request.send(
      `${this.endpoint}/${slug}/attributes`,
      'GET',
      undefined,
      token
    )
  }

  OnboardingLinks(slug, returnUrl, test = false) {
    return this.request.send(
      `${this.endpoint}/${slug}/onboarding-links`,
      'POST',
      {
        test,
        return_url: returnUrl
      }
    )
  }

  StripeCustomers(slug, stripe_account) {
    return this.request.send(
      `${this.endpoint}/${slug}/stripe_customers`,
      'POST',
      {
        data: {
          options: {
            stripe_account
          }
        }
      },
      undefined,
      this,
      false,
    )
  }

  StripeInvoices(slug, stripe_account, customer_id) {
    return this.request.send(
      `${this.endpoint}/${slug}/stripe_invoices`,
      'POST',
      {
        data: {
          customer_id,
          options: {
            stripe_account,
          }
        }
      },
      undefined,
      this,
      false,
    )
  }
}

export default GatewaysEndpoint
