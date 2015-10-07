class Address
  constructor: (@m) ->

  BaseUrl: (customer) ->
    "customers/#{customer}/addresses/"

  Get: (customer, id, callback, error) ->
    @m.Request "#{@BaseUrl()}/#{id}", 'GET', null, callback, error

  Find: (customer, terms, callback, error) ->
    @m.Request @BaseUrl, 'GET', terms, callback, error

  List: (customer, terms, callback, error) ->
    @m.Request @BaseUrl, 'GET', terms, callback, error

  Create: (customer, data, callback, error) ->
    @m.Request @BaseUrl, 'POST', data, callback, error

  Fields: (customer = 0, id = 0, callback, error) ->
    if customer > 0 and id <= 0
      uri = "#{@BaseUrl}/fields"
    else if customer > 0 and id > 0
      uri = "#{@BaseUrl}/#{id}/fields"
    else
      uri = 'addresses/fields'

    @m.Request uri, 'GET', null, callback, error
