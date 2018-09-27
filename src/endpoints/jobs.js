import BaseExtend from '../extends/base'

class Jobs extends BaseExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'jobs'
  }
}

export default Jobs
