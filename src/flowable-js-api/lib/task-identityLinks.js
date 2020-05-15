'use strict'

const resourcePath = '/runtime/tasks'

function TaskIdentityLinksResource (options, http) {
  this.getIdentityLinks = (taskId) => {
    return http.get(resourcePath + `/${taskId}/identitylinks`)
  }
}

function getRequestArgs (queryParams, data) {
  const args = {}
  args.params = queryParams || undefined
  args.data = data || undefined
  return args
}

module.exports = TaskIdentityLinksResource
