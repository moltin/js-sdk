class Checkout
  constructor: (@m) ->

  Payment: (method, order, data, callback, error) ->
    url = "checkout/payment/#{method}/#{order}"

    @m.Request url, 'POST', data, callback, error
