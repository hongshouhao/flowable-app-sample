class Flowable {
  constructor(host) {

    let username = null;
    let password = null;
    const user = getUser();
    if (user) {
      const nameandps = window.atob(user.authdata).split(":")
      if (nameandps.length > 1) {
        username = nameandps[0]
        password = nameandps[1]
      }
    }

    this.api = require('../flowable-js-api/lib/index')({
      apiUri: host,
      auth: {
        username: username,
        password: password
      }
    })

    this.login = function (username, password) {
      this.api.options.auth.username = username
      this.api.options.auth.password = password

      return this.api.identityUsers.getUser(username)
        .then(result => {
          let user = result.data
          if (user) {
            user.authdata = window.btoa(username + ":" + password);
            localStorage.setItem("user", JSON.stringify(user));
          }
          return Promise.resolve(user);
        }).catch(e => {
          debugger
          if (e.status === 401) {
            this.logout();
            window.location.reload(true);
          }

          return Promise.reject(e.message);
        })
    }

    this.logout = function () {
      localStorage.removeItem("user");
    }

    this.getUser = getUser

    function getUser () {
      const jsonStr = localStorage.getItem('user')
      if (jsonStr) {
        return JSON.parse(jsonStr)
      }
      else {
        return null
      }
    }

  }
}

export default Flowable

