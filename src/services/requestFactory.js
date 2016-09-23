class RequestFactory {
  constructor(m) {
    this.driver = false;
    this.m = m;

    try {
      this.driver = new XMLHttpRequest();
    } catch (e) {
      try {
        this.driver = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        throw new Error("Request factory boot failed");
      }
    }

    return this;
  }

  make(uri, method, data, headers) {
    method = method.toUpperCase();
    let url = this.m.config.protocol + '://' + this.m.config.host +
      ( uri !== 'oauth/access_token' ? `/${this.m.config.version}/${uri}` : `/${uri}` );

    if (method === 'GET') {
      url += `?${this.m.Helper.Serialize(data)}`;
      data = null;
    } else {
      data = this.m.Helper.Serialize(data);
    }

    this.driver.open(method, url, true);

    let timeout = setTimeout(() => {
      this.driver.abort();
      return this.driver.error(this.driver, 408, 'Your request timed out');
    }, this.m.config.timeout);

    for (let k in headers) { let v = headers[k]; this.driver.setRequestHeader(k, v); }

    let r = this.driver;
    let promise = new Promise((resolve, reject) =>

      r.onreadystatechange = function() {

        if (r.readyState !== 4) {
          return null;
        }

        clearTimeout(timeout);

        try {
          let json = JSON.parse(r.responseText);
          return resolve(json);
        } catch (err) {
          return reject(new Error(err));
        }
      }
    );

    this.driver.send(data);

    return promise;
  }
}
