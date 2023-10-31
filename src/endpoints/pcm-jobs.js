import RequestFactory from '../factories/request'
import CRUDExtend from "../extends/crud";
import { buildURL } from "../utils/helpers";

class PCMJobs extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)
    const config = { ...endpoint, version: 'pcm' }
    this.request = new RequestFactory(config)
    this.endpoint = 'jobs'
  }

  GetJobErrors(jobId) {
    const { limit, offset } = this
    return this.request.send(
        buildURL(`${this.endpoint}/${jobId}/errors`, {
      limit,
      offset
    }),'GET'
    )
  }
}

export default PCMJobs
