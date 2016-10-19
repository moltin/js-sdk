class HelperFactory {
  constructor() {}

  Merge(o1, o2) {
    let o3 = {};

    for (var k in o1) { var v = o1[k]; o3[k] = v; }
    for (k in o2) { var v = o2[k]; o3[k] = v; }

    return o3;
  }

  InArray(key, arr) {
    if (!arr || !__in__(key, arr)) { return false; }

    return true;
  }

  Serialize(obj, prefix = null) {
    let str = [];

    for (let k in obj) {
      let v = obj[k];

      k = prefix !== null ? prefix+'['+k+']' : k;
      str.push(typeof v === 'object' ? this.Serialize(v, k) : encodeURIComponent(k)+'='+encodeURIComponent(v));
    }

    return str.join('&');
  }

  Error(response) {
    let msg = '';

    if (typeof response.errors !== 'undefined') {
      for (let k in response.errors) { let v = response.errors[k]; msg += v+'<br />'; }
    } else {
      msg = response.error;
    }

    return this.options.notice('Error', msg);
  }
}

function __in__(needle, haystack) {
  return haystack.indexOf(needle) >= 0;
}
