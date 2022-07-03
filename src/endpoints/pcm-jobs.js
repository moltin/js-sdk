import RequestFactory from '../factories/request'

class PCMJobs {
  constructor(endpoint) {
    const config = { ...endpoint, version: 'pcm' }
    this.request = new RequestFactory(config)
    this.endpoint = 'jobs'
  }

  All() {
    return this.request.send(`${this.endpoint}`, 'GET')
  }

  Get(jobId) {
    return this.request.send(`${this.endpoint}/${jobId}`, 'GET')
  }

  GetJobErrors(jobId) {
    return this.request.send(`${this.endpoint}/${jobId}/errors`, 'GET')
  }
}

export default PCMJobs
