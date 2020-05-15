'use strict'

const resourcePath = '/runtime/tasks'

function TaskCommentsResource (options, http) {
  this.getComments = (taskId) => {
    return http.get(resourcePath + `/${taskId}/comments`)
  }

  this.saveComment = (taskId, comment) => {
    return http.post(resourcePath + `/${taskId}/comments`, comment)
  }

  this.deleteComment = (taskId, commentId) => {
    return http.delete(resourcePath + `/${taskId}/comments/${commentId}`)
  }
}

module.exports = TaskCommentsResource
