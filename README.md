## 前言

此 rem-template 模板项目是基于 vue 全家桶，使用（rem）进行适配

## 前端技术

- vue
- vuex
- vue-route
- axios
- vconsole
- moment
- vant
- scss
- better-scroll
- amfe-flexible
- px2rem-loader
- vue-i18n

## 主要项目结构

```
- components
  - Identify 验证码
- views
  - test better-scroll滑动测试
  - login 登录
  - redirect 路由重定向
- api axios封装以及api接口
- assets 图片和css->base.scss 1px细线处理
- router 路由
- store vuex 的状态管理
- utils 封装的常用的方法，如国际化和与安卓、ios交互
- main.js 入口文件，实例化Vue、插件初始化
- app.vue 根组件
- .babelrc 实现组件按需加载
- .postcssrc.js rem 配置文件
```

## Build Setup ( 建立安装 )

```
# install dependencies
npm install

# serve with hot reload at localhost: 8080
npm run dev

# build for production with minification
npm run build
```