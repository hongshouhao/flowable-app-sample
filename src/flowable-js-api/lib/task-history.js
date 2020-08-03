'use strict'

const resourcePath = '/history/historic-task-instances'

function HistoricTaskInstancesResource (options, http) {
  this.getTaskInstances = (queryRequest) => {
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

module.exports = HistoricTaskInstancesResource
