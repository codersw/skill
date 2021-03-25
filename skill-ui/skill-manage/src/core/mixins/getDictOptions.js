import store from '@/store'
import { getDictItems } from '@/api/system'
const formatData = data => {
  const obj = {}
  for (const i in data) {
    const item = data[i]
    obj[i] = item.text
  }
  return obj
}

export default {
  install (Vue) {
    const http = Vue.prototype.$axios
    Vue.mixin({
      methods: {
        async getDictOptions (code) {
          console.log('getDictOptions', code)
          const dicCache = store.state.user.dicData[code]
          if (dicCache) return dicCache
          const response = await getDictItems(code)
          if (response.code !== 0) return Promise.reject(response.data)
          const result = formatData(response.data)
          store.commit('UPDATE_DIC_DATA', {[code]: result})
          return Promise.resolve(result)
        }
      }
    })
  }
}
