import CRUDExtend from '../extends/crud'

class IntegrationsEndpoint extends CRUDExtend {
  constructor(endpoint) {
    const config = { ...endpoint, version: 'v2' }
    super(config)

    this.endpoint = 'integrations'
  }

  GetAllLogs() {
    return this.request.send(`${this.endpoint}/logs`, 'GET')
  }

  GetLogs(id) {
    return this.request.send(`${this.endpoint}/${id}/logs`, 'GET')
  }

  GetJobs(id) {
    return this.request.send(`${this.endpoint}/${id}/jobs`, 'GET')
  }

  GetAllLogsForJob(integrationId, integrationJobId) {
    return this.request.send(
      `${this.endpoint}/${integrationId}/jobs/${integrationJobId}/logs`,
      'GET'
    )
  }
}

export default IntegrationsEndpoint
