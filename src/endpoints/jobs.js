import BaseExtend from '../extends/base'

class Jobs extends BaseExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'jobs'
  }

  Create(body) {
    return this.request.send(this.endpoint, 'POST', body)
  }

  GetFile(fileId) {
    return this.request.send(`${this.endpoint}/${fileId}/file`, 'Get')
  }
}

export default Jobs
