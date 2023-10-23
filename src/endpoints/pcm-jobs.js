import RequestFactory from '../factories/request'
import CRUDExtend from "../extends/crud";

class PCMJobs extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)
    const config = { ...endpoint, version: 'pcm' }
    this.request = new RequestFactory(config)
    this.endpoint = 'jobs'
  }

  GetJobErrors(jobId) {
    return this.request.send(`${this.endpoint}/${jobId}/errors`, 'GET')
  }
}

export default PCMJobs
