// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    "postcss-pxtorem": {
      // 设计稿 375:37.5
      // 设计稿：750:75
      // Vant 是基于 375
      rootValue: 37.5, // 对应16px 适配移动端750px宽度
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: [".van-hairline", ".ignore"],
      // selectorBlackList: [".van-"], //排除，van-开头的class，不进行rem转换
      replace: true,
      mediaQuery: false,
      minPixelValue: 0
    }
  }
}
