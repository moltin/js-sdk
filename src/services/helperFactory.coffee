  class HelperFactory

    constructor: () ->

    Merge: (o1, o2) ->

      o3 = {}
      o3[k] = v for k, v of o1
      o3[k] = v for k, v of o2
      return o3

    InArray: (key, arr) ->

      return false if not arr or key not in arr
      return true

    Serialize: (obj, prefix = null) ->

      str = []

      for k,v of obj
        k = if prefix != null then prefix+'['+k+']' else k
        str.push if typeof v == 'object' then @Serialize v, k else encodeURIComponent(k)+'='+encodeURIComponent(v)

      return str.join '&'

    Error: (response) ->

      msg = ''

      if typeof response.errors != 'undefind'
        msg += v+'<br />' for k,v of response.errors
      else
        msg = response.error

      return @options.notice 'Error', msg
