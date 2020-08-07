import Vue from 'vue'
import Router from 'vue-router'
import {
  appId
} from "../core/app/app"

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: () => import('@/views/main/index.vue'),
      children: [{
          path: '/',
          redirect: "/index"
        }, {
          path: '/index',
          name: 'index',
          meta: {
            title: '首页',
            auth: true
          },
          component: () => import('@/views/home/index.vue')
        },
        {
          path: '/advice',
          name: 'advice',
          meta: {
            title: '建议列表',
            auth: true
          },
          component: () => import('@/views/advice/index.vue'),
        },
        {
          path: '/advice/detail',
          name: 'advice',
          meta: {
            title: '建议详情',
            auth: true
          },
          component: () => import('@/views/advice/detail.vue'),
        },
        {
          path: '/task',
          name: 'task',
          meta: {
            title: '任务列表',
            auth: true
          },
          component: () => import('@/views/task/index.vue')
        },
        {
          path: '/task/detail',
          name: 'task',
          meta: {
            title: '任务详情',
            auth: true
          },
          component: () => import('@/views/task/detail.vue'),
        },
        {
          path: '/project',
          name: 'project',
          meta: {
            title: '项目组预设',
            auth: true
          },
          component: () => import('@/views/project/index.vue')
        },
        // {
        //   path: '/processes/:procDefKey',
        //   name: 'processes',
        //   meta: {
        //     title: '流程',
        //     notCache: true
        //   },
        //   component: () => import('@/flowable/Processes.vue')
        // },
        // {
        //   path: '/tasks/myTasks',
        //   name: 'myTasks',
        //   meta: {
        //     title: '我的任务'
        //   },
        //   component: () => import('@/flowable/MyTasks.vue')
        // }
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录',
        auth: false
      },
      component: () => import('@/views/login/index.vue')
    },
  ]
})

//路由授权重定向
router.beforeEach(async (to, from, next) => {
  if (to.meta.auth) {
    let session = sessionStorage.getItem(`login-${appId}`);
    console.log(appId)
    if (session) next();
    else next("/login");
  } else next();
});

export default router