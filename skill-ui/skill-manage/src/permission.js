import router from './router'
import store from './store'
import storage from 'store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { notification } from 'ant-design-vue'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { i18nRender } from '@/locales'
import Message from 'ant-design-vue/es/message'

NProgress.configure({ showSpinner: false }) // NProgress Configuration
const allowListBasic = ['login', 'register', 'registerResult', 'ssoLogin', 'homeNoPermission'] // no redirect allowList
const allowListExtend = process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true'
  ? [] // 生产环境
  : ['DataCenter']
const allowList = [...allowListBasic, ...allowListExtend]
const loginRoutePath = '/user/login'
const defaultRoutePath = '/home'
// const defaultRoutePath = '/dashboard/workplace'

// 递归路由表
const getRouteMenu = (vm, name = 'RouteMenu') => {
  for (const i in vm.$children) {
    const item = vm.$children[i]
    // console.log(item.$options.name === name, item.$options.name)
    if (item.$options.name === name) {
      return item
    }
    const nextVm = getRouteMenu(item, name)
    if (nextVm.$options.name === name) {
      // console.log('nextVm ', nextVm.$options.name)
      return nextVm
    }
  }
  return vm
}

// 数据中心路由控制
const modalRouteRule = (to, from, next) => {
  if (to.path === '/DataCenter') {
    if (to.query.dataCenterId) {
      next()
    } else {
      if (store.state.modal.dataCenterId) {
        next({ path: to.path, query: { dataCenterId: store.state.modal.dataCenterId } })
      } else {
        // Message.destroy()
        Message.info(i18nRender('global.message.info.modal.enter'))
        const RouteMenu = getRouteMenu(router.app)
        setTimeout(() => {
          router.app.$set(RouteMenu.selectedKeys, '0', from.path)
          // console.log('modalRouteRule ', RouteMenu)
        }, 100)
        next(false)
        NProgress.done()
      }
    }
  } else {
    next()
  }
}

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  /* has token */
  if (storage.get(ACCESS_TOKEN)) {
    /* has token */
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo')
          .then(() => {
            // 调用 vuex 的 从后端获取用户的路由菜单，动态添加可访问路由表
            store.dispatch('GenerateRoutes').then(() => {
              // 把已获取到的路由菜单加入到路由表中
              router.addRoutes(store.getters.addRouters)
              const redirect = decodeURIComponent(from.query.redirect || to.path)
              if (to.path === redirect) {
                // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                next({ ...to, replace: true })
              } else {
                // 跳转到目的路由
                next({ path: redirect })
              }
            })
          })
          .catch(() => {
            notification.destroy()
            notification.error({
              message: '错误',
              description: '请求用户信息失败，请重试'
            })
            store.dispatch('Logout').then(() => {
              console.log('permission Logout')
              next({ path: loginRoutePath, query: { redirect: to.fullPath } })
            })
          })
      } else {
        modalRouteRule(to, from, next)
      }
    }
  } else {
    if (allowList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach((to) => {
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${i18nRender(to.meta.title)} - ${domTitle}`))
  NProgress.done() // finish progress bar
})
