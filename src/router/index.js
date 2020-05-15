import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        title: 'Login - 登录'
      },
      component: () => import('@/Login.vue')
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/Home.vue'),
      children: [
        {
          path: '/processes/:procDefKey',
          name: 'processes',
          meta: {
            title: '流程',
            notCache: true
          },
          component: () => import('@/flowable/Processes.vue')
        },
        {
          path: '/tasks/myTasks',
          name: 'myTasks',
          meta: {
            title: '我的任务'
          },
          component: () => import('@/flowable/MyTasks.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next({
      path: '/login',
      query: { returnUrl: to.path }
    });
  }

  next();
})

export default router