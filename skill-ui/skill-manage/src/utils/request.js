import axios from 'axios'
import store from '@/store'
import storage from 'store'
import router, { initRouter, resetRouter } from '../router'
import { VueAxios } from './axios'
import { notification } from 'ant-design-vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import Modal from 'ant-design-vue/es/modal'
import { i18nRender } from '@/locales'

const baseURL = process.env.VUE_APP_API_BASE_URL

let hasPermission = false // 是否有权限，返回code===401，不再弹出提示窗口

// 创建 axios 实例
const request = axios.create({
  baseURL: baseURL, // api base_url
  timeout: 6000 // 请求超时时间
})
export const pureAxios = axios.create({
  baseURL: baseURL, // api base_url
  timeout: 6000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = storage.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      if (hasPermission) return Promise.reject(error)
      hasPermission = true
      notification.destroy()
      // notification.error({
      //   message: 'Unauthorized',
      //   description: 'Authorization verification failed'
      // })
      Modal.destroyAll()
      Modal.error({
        title: 'Unauthorized',
        content: data.msg,
        keyboard: false,
        okText: i18nRender('global.button.relogin'),
        onOk () {
          store.dispatch('Logout').then(() => {
            location.replace('/user/login?redirect=' + router.currentRoute.fullPath)
            // router.replace({ path: '/user/login', query: { redirect: router.currentRoute.fullPath } })
            // setTimeout(() => {
            //   window.location.reload()
            // }, 1000)
          })
        }
      })
      // if (token) {
      //   store.dispatch('Logout').then(() => {
      //     // router.matcher = initRouter().matcher
      //     router.replace({ path: '/user/login', query: { redirect: router.currentRoute.fullPath } })
      //     window.location.reload()
      //     // setTimeout(() => {
      //     //   window.location.reload()
      //     // }, 1500)
      //   })
      // }
    }
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN)
  if (token) {
    config.headers['token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

pureAxios.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN)
  if (token) {
    config.headers['token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

// response interceptor
request.interceptors.response.use((response) => {
  return response.data
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
