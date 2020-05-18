import Vue from 'vue' // 引入vue实例
import VueI18n from 'vue-i18n' // 引入vue-i18n多语言包
import zh from './zh.js'
import en from './en.js'
import { Locale } from 'vant';
import enLocale from 'vant/lib/locale/lang/en-US'
import zhLocale from 'vant/lib/locale/lang/zh-CN'


Vue.use(VueI18n) // vue使用vue-i18n
Vue.locale = () => { };

let testLang = (navigator.language || navigator.browserLanguage).toLowerCase();

let defaultLang = testLang.indexOf('zh') > -1 ? 'zh' : 'en' // 默认语言

const localeKey = 'language' // localStorage来存放的key，名字随便定，接下来会用到。

const locales = { // 引入zh.json以及en.json
  zh: Object.assign(zh, zhLocale),
  en: Object.assign(en, enLocale)
}

const i18n = new VueI18n({ // 创建带有选项的 VueI18n 实例
  locale: defaultLang, // 语言标识，在这里默认为zh,即为中文
  messages: locales, // 语言包，上边创建的js文件
  silentTranslationWarn: true
})

export const setup = lang => { //切换语言的函数，lang为语言标识，en或者zh
  if(lang == undefined){
      lang = localStorage.getItem(localeKey)
      if ( locales[lang] == undefined ) {
        lang = defaultLang
        if(lang === 'zh'){
          Locale.use(lang, zhLocale)
        }else if(lang === 'en'){
          Locale.use(lang, enLocale)
        }
      }
  }
  // 若lang有值，那么存入localStorage中，key为localeKey,value为lang。
  localStorage.setItem(localeKey, lang)
  if(lang === 'zh'){
    Locale.use(lang, zhLocale)
  }else if(lang === 'en'){
    Locale.use(lang, enLocale)
  }
  Object.keys(locales).forEach(lang => {
    document.body.classList.remove(`lang-${lang}`)
  })
  document.body.classList.add(`lang-${lang}`)
  document.body.setAttribute('data-lang', lang)

  Vue.config.lang = lang
  i18n.locale = lang
}

setup()

export default i18n