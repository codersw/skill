import { gutter } from './gutter'
// import i18nRender from './i18nRender'
import getDictOptions from './getDictOptions'

export default {
  install (Vue) {
    Vue.mixin(gutter)
    // Vue.mixin(i18nRender)
    Vue.use(getDictOptions) // 获取字典数据
    Vue.mixin({
      data () {
        return {
          isProd: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true'
        }
      }
    })
  }
}