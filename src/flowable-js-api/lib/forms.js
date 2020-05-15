'use strict'

const startFormPath = '/repository/process-definitions'
const taskFormPath = '/runtime/tasks'

function ProcessFormsResource (options, http) {
  /**
   * @param processDefinitionId
   * @returns {AxiosPromise<any> | *}
   */
  this.getRenderedStartForm = (processDefinitionId) => {
    return http.get(startFormPath + `/${processDefinitionId}/rendered-start-form`,
      getRequestArgs())
  }

  /**
   * @param taskId
   * @returns {AxiosPromise<any> | *}
   */
  this.getRenderedForm = (taskId) => {
    return http.get(taskFormPath + `/${taskId}/rendered-form`,
      getRequestArgs())
  }

  function getRequestArgs (queryParams, data) {
    const args = {}
    args.params = queryParams || undefined
    args.data = data || undefined
    return args
  }
}

module.exports = ProcessFormsResource
