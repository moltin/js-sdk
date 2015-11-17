  class Checkout

    constructor: (@m) ->

    Payment: (method, order, data, callback, error) ->

      return @m.Request 'checkout/payment/'+method+'/'+order, 'POST', data, callback, error
