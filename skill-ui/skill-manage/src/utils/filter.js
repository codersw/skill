import Vue from 'vue'
import moment from 'moment'

import { i18nRender } from '@/locales'
// 已从cdn加载
// import 'moment/locale/zh-cn'
// 通过全局配置调用，这里不再使用
// moment.locale('zh-cn')

Vue.filter('NumberFormat', function (value) {
  if (!value) {
    return '0'
  }
  // 将整数部分逢三一断
  return value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
})

Vue.filter('dayjs', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

Vue.filter('moment', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

Vue.filter('fromNow', function (date) {
  return moment(date).fromNow()
})

Vue.filter('i18n', function (key) {
  return i18nRender(key)
})