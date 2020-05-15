'use strict'

function HistoricResource (options, http) {
  this.getActivityInstances = (historicQueryRequest) => {
    return http.get('/history/historic-activity-instances', getRequestArgs(historicQueryRequest))
  }
}

function getRequestArgs (queryParams, data) {
  const args = {}
  args.params = queryParams || undefined
  args.data = data || undefined
  return args
}

module.exports = HistoricResource
