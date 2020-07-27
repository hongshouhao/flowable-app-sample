'use strict'

const resourcePath = '/runtime/process-instances'

function ProcessInstanceVariablesResource (options, http) {
  /**
                               * List variables for a process-instance
                               * @param processInstanceId
                               * @param queryParams
                               * @returns {AxiosPromise<any> | *}
                               */
  this.getVariables = (processInstanceId, queryParams) => {
    return http.get(resourcePath + `/${processInstanceId}/variables`,
      getRequestArgs(queryParams)
    )
  }

  /**
                             * Create new variables on a process-instance
                             * @param processInstanceId
                             * @param variableCollectionResource
                             * @example [{
                                "name" : "variableName",
                                "type": "integer",
                                "scope": "local"
                                }]
                             * @returns {AxiosPromise<any> | *}
                             */
  this.createVariables = (processInstanceId, variableCollectionResource) => {
    return http.post(resourcePath + `/${processInstanceId}/variables`, variableCollectionResource,
      getRequestArgs()
    )
  }

  /**
                             * Delete a variable on a task
                             * @param processInstanceId
                             * @param variableName
                             * @param queryParams
                             * @returns {AxiosPromise<any> | *}
                             */
  this.deleteVariable = (processInstanceId, variableName, queryParams) => {
    return http.delete(resourcePath + `/${processInstanceId}/variables/${variableName}`,
      getRequestArgs(queryParams)
    )
  }

  /**
                             * Get a variable from a task
                             * @param processInstanceId
                             * @param variableName
                             * @param queryParams
                             * @returns {AxiosPromise<any> | *}
                             */
  this.getVariable = (processInstanceId, variableName, queryParams) => {
    return http.get(resourcePath + `/${processInstanceId}/variables/${variableName}`,
      getRequestArgs(queryParams)
    )
  }

  /**
                             * Update an existing variable on a task
                             * @param processInstanceId
                             * @param variableName
                             * @param variableResource
                             * @example {
                                "name" : "variableName",
                                "type": "integer",
                                "scope": "local"
                                }
                             * @returns {AxiosPromise<any> | *}
                             */
  this.updateVariable = (processInstanceId, variableName, variableResource) => {
    return http.put(resourcePath + `${processInstanceId}/variables/${variableName}`, variableResource,
      getRequestArgs()
    )
  }

  /**
                             * Get the binary data for a variable
                             * @param processInstanceId
                             * @param variableName
                             * @param queryParams
                             * @returns {AxiosPromise<any> | *}
                             */
  this.getBinaryData = (processInstanceId, variableName, queryParams) => {
    return http.get(resourcePath + `/${processInstanceId}/variables/${variableName}/data`,
      getRequestArgs(queryParams)
    )
  }
}

/// ////////////////

// function getRequestArgs (queryParams, data) {
//   const args = {}
//   queryParams ? args.params = queryParams : undefined
//   data ? args.data = data : undefined
//   return args
// }
function getRequestArgs (queryParams, data) {
  const args = {}
  args.params = queryParams || undefined
  args.data = data || undefined
  return args
}

module.exports = ProcessInstanceVariablesResource
