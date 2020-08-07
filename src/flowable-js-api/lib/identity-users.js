'use strict'

const resourcePath = '/identity/users'

function IdentityUsersResource (options, http) {
  this.getUsers = () => {
    return http.get(resourcePath)
  }

  this.getUser = (userId) => {
    debugger
    return http.get(resourcePath + `/${userId}`)
  }
}

module.exports = IdentityUsersResource
