// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import axios from 'axios'
Vue.prototype.$http = axios;

import './plugins/element'
import './plugins/formmaking'
import './plugins/viewer'
import './plugins/linq'

import Flowable from './plugins/flowable'
const flowable = new Flowable('http://localhost:8068')
Vue.prototype.$flowable = flowable;
Vue.prototype.$flowableClient = flowable.api;

import asyncComputed from 'vue-async-computed'
Vue.use(asyncComputed)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
