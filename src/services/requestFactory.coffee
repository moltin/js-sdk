  class RequestFactory

    driver = false

    constructor: (@m) ->
      try
        @driver = new XMLHttpRequest()
      catch e
        try
          @driver = new ActiveXObject("Msxml2.XMLHTTP")
        catch e
          throw new Error "Request factory boot failed"

      return @

    make: (uri, method, data, headers) ->

      method = method.toUpperCase()
      url = @m.config.protocol + '://' + @m.config.host +
        ( if uri != 'oauth/access_token' then '/' + @m.config.version + '/' + uri else '/' + uri )

      if method == 'GET'
        url += '?' + @m.Helper.Serialize data
        data = null
      else
        data = @m.Helper.Serialize data

      @driver.open method, url, true

      timeout = setTimeout =>
        @driver.abort()
        @driver.error @driver, 408, 'Your request timed out'
      , @m.config.timeout

      @driver.setRequestHeader k, v for k,v of headers

      r = @driver
      promise = new Promise((resolve, reject) ->

        r.onreadystatechange = ->

          if r.readyState != 4
            return null;

          clearTimeout timeout

          try
            json = JSON.parse r.responseText
            resolve json
          catch err
            reject new Error err
      )

      @driver.send data

      return promise
