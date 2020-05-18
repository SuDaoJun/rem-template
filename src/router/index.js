import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const redirect = resolve => require(['@/views/redirect/redirect.vue'], resolve)
const login = resolve => require(['@/views/login/login.vue'], resolve)
const test = resolve => require(['@/views/test/test.vue'], resolve)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      meta: {
        title: '平台登录'
      }
    },
    {
      path: '/test',
      name: 'test',
      component: test,
      meta: {
        title: '测试页面',
        auth: true
      }
    },
    {
      path: '/redirect/:path*',
      name: 'redirect',
      component: redirect,
      meta: {
        title: ''
      }
    },
    {
      path: '*',
      component: login,
      meta: {
        title: '平台登录'
      }
    }
  ]
})