import { i18nRender } from '@/locales'

export default {
  methods: {
    i18n (key) {
      return i18nRender(key)
    }
  }
}