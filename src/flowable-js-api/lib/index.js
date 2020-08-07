'use strict'

const ProcessDefinitionsResource = require('./process-definitions')
const ProcessInstancesResource = require('./process-instances')
const ProcessInstanceVariablesResource = require('./process-variables')
const HistoricProcessInstancesResource = require('./process-history')

const TasksResource = require('./tasks')
const TaskVariablesResource = require('./task-variables')
const TaskIdentityLinksResource = require('./task-identityLinks')
const TaskCommentsResource = require('./task-comments')
const HistoricPTaskInstancesResource = require('./task-history')

const IdentityUserResource = require('./identity-users')
const HistoricResource = require('./history')

const axios = require('axios')

const FormsResource = require('./forms')

const flowableRestEndpoint = '/flowable-rest/service'

function flowable (options) {
  const httpClient = axios.create({
    baseURL: getBaseUrlWithCredentials(options) + flowableRestEndpoint,
    originBaseURL: options.apiUri + flowableRestEndpoint,
    timeout: options.timeout || 0,
    headers: { 'content-type': 'application/json'/*, 'authorization': 'Basic YWRtaW46YWRtaW4=' */ },
    withCredentials: false,
    auth: options.auth
  })

  return {
    processDefinitions: new ProcessDefinitionsResource(options, httpClient),
    processInstances: new ProcessInstancesResource(options, httpClient),
    processInstanceVariables: new ProcessInstanceVariablesResource(options, httpClient),
    historicprocessInstances: new HistoricProcessInstancesResource(options, httpClient),

    tasks: new TasksResource(options, httpClient),
    taskVariables: new TaskVariablesResource(options, httpClient),
    taskIdentityLinks: new TaskIdentityLinksResource(options, httpClient),
    taskComments: new TaskCommentsResource(options, httpClient),
    historicTaskInstances: new HistoricPTaskInstancesResource(options, httpClient),

    identityUsers: new IdentityUserResource(options, httpClient),
    forms: new FormsResource(options, httpClient),
    histories: new HistoricResource(options, httpClient),
    options: httpClient.defaults
  }
}

/*
    TODO: to be removed as soon as CORS in flowable REST API is enabled
 */
function getBaseUrlWithCredentials(options) {
    const protocolLength = options.apiUri.startsWith('https://') ? 8 : 7
    return options.apiUri.substr(0, protocolLength) + options.auth.username + ':' + options.auth.password + '@' + options.apiUri.substr(protocolLength)
}

module.exports = flowable