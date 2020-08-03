'use strict'

const TasksResource = require('./tasks')
const HistoricPTaskInstancesResource = require('./task-history')

function MyResource (options, http) {
  const historicTaskResource = new HistoricPTaskInstancesResource(options, http)
  const taskResource = new TasksResource(options, http)

  this.pendingTasks = () => {
    return taskResource.getTaskInstances({
      assignee: options.auth.username,
      includeTaskLocalVariables: true,
      includeProcessVariables: true,
      start: 0,
      size: 10000,
      sort: 'createTime',
      order: 'desc',
    })
  }

  this.solvedTasks = (queryRequest) => {
    return historicTaskResource.getTaskInstances(
      {
        assignee: options.auth.username,
        finished: true,
        includeTaskLocalVariables: true,
        includeProcessVariables: true,
        start: 0,
        size: 10000,
        sort: 'endTime',
        order: 'desc',
      })
  }

  this.startedProcesses = () => {
    return taskResource.getTaskInstances({
      assignee: options.auth.username,
      includeTaskLocalVariables: true,
      includeProcessVariables: true,
      start: 0,
      size: 10000,
      sort: 'createTime',
      order: 'desc',
    })
  }
}

module.exports = MyResource
