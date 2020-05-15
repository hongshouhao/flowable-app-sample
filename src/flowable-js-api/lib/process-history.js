'use strict'

const resourcePath = '/history/historic-process-instances'

function HistoricProcessInstancesResource (options, http) {
  this.getProcessInstances = (queryRequest) => {
    return http.get(resourcePath, getRequestArgs(queryRequest)
    )
  }
}

function getRequestArgs (queryParams, data) {
  const args = {}
  args.params = queryParams || undefined
  args.data = data || undefined
  return args
}

module.exports = HistoricProcessInstancesResource
