// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import axios from 'axios'
Vue.prototype.$http = axios;

import "@/core/utils/prototype";
import * as filters from "./core/filters";
import "@/core/";
import './plugins/element'
import './plugins/formmaking'
import './plugins/viewer'
import './plugins/linq'

import Flowable from './plugins/flowable'
const flowable = new Flowable('http://192.168.72.10:8080')
Vue.prototype.$flowable = flowable;
Vue.prototype.$flowableClient = flowable.api;

import TaskHandler from './processes/taskHandler'
Vue.prototype.$taskHandler = new TaskHandler();


import asyncComputed from 'vue-async-computed'
Vue.use(asyncComputed)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false



let vue = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

export default vue