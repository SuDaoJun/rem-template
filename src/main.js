// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from '@/api/index'
import {baseURL} from '@/api/axios'
import FastClick from 'fastclick'
import moment from 'moment'
import i18n from '@/utils/locales'
import '@/assets/icons/iconfont.css'

// 移动端调试
// import Vconsole from 'vconsole'
// let vConsole = new Vconsole()
// Vue.use(vConsole)

import { Form, Field , Button, Icon, Picker, Popup, Cell, CellGroup, Toast, Tab, Tabs} from 'vant'

Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Picker)
Vue.use(Popup)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Toast)
Vue.use(Tab)
Vue.use(Tabs)

Vue.config.productionTip = false

FastClick.attach(document.body)
//路由拦截
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.auth)) {// 判断是否需要登录权限
    if (sessionStorage.getItem('userInfo')) {// 判断是否登录
      next()
     } else {
      next({
        path: '/'
      })
     }
  } else {
    next()
  }
})
router.afterEach(() => {
  window.scrollTo(0, 0)
})

// 千分位过滤器,value为传过来数值，arg1为参数
Vue.filter('NumFormat', function (value, arg1) {
  if (!value) return ''
  let intPart = parseInt(value).toFixed(0) // 获取整数部分
  let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  let result = arg1 ? arg1 + intPartFormat : intPartFormat;
  return result
})

Vue.prototype.$api = api;
Vue.prototype.$baseURL = baseURL;
Vue.prototype.$moment = moment;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
