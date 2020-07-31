import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
// import { getToken } from "@/core/utils/auth";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000, // request timeout
  validateStatus: function(status) {
    return (status >= 200 && status < 300) || status == 500;
  }
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token && config.token && config.token === true) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
      // config.headers["authorization"] = getToken();
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const { status, data } = response;
    const { error, code } = data;
    const res = data;
    let isPass = true;
    res.code = code || status || 0;
    // if the custom code is not 20000, it is judged as an error.
    if (res.code == 500 && res.code !== 1 && res.code !== 200) {
      isPass = false;
      Message({
        message: error ? error.message : res.message,
        type: "error",
        duration: 3 * 1000
      });
    }
    //表单验证失败
    if (res.code === 400) {
      isPass = false;
      const { validationErrors } = error;
      for (const error in validationErrors) {
        Message({
          message: error.message,
          type: "error",
          duration: 3 * 1000
        });
      }
    }

    //token过期
    if (res.code === 401) {
      isPass = false;
      // to re-login
      MessageBox.confirm("登录超时，是否重新登录？", "Confirm logout", {
        confirmButtonText: "重新登录",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        store.dispatch("user/resetToken").then(() => {
          location.reload();
        });
      });
    }

    if (isPass) return res;
    else return Promise.reject(new Error(res));
  },
  error => {
    //如果是401的话，调转到登陆界面
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export function get(options) {
  return service(Object.assign({ method: "get" }, options));
}

export function post(options) {
  return service(Object.assign({ method: "post" }, options));
}

export function put(options) {
  return service(Object.assign({ method: "put" }, options));
}

export function del(options) {
  return service(Object.assign({ method: "delete" }, options));
}

export default service;
