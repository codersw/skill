import request from '@/utils/request'
import axios from 'axios'

export const api = {
  getModel: '/system/dataCenter/getModel', // 数据中心树形结构
  getRack: '/system/dataCenter/getRack', // 机柜下的设备和U位
  equipmentList: '/system/dataCenter/equipmentList', // 查询未分配机柜的设备
  unitUpdate: '/system/dataCenter/unitUpdate', // 预上架，预下架
  getAlarmNoticeList: '/system/dataCenter/getAlarmNoticeList', // 数据中心告警信息列表
  getBaseInfo: '/system/dataCenter/getBaseInfo', // 数据中心抽屉详情
  getDefualtDataCenter: '/system/dataCenter/getDataCenterList',
  addEquipment: '/system/dataCenter/addEquipment' // u位上 新建设备预上架

}

export default api

export function addEquipment (parameter) {
  return request({
    url: api.addEquipment,
    method: 'post',
    data: parameter
  })
}
export function getModel (parameter) {
  return request({
    url: api.getModel,
    method: 'get',
    params: parameter
  })
}
export function getRack (parameter) {
  return request({
    url: api.getRack,
    method: 'get',
    params: parameter
  })
}
export function equipmentList (parameter) {
  return request({
    url: api.equipmentList,
    method: 'post',
    data: parameter
  })
}
export function unitUpdate (parameter) {
  return request({
    url: api.unitUpdate,
    method: 'post',
    data: parameter
  })
}

const source = {}
const TimerTurning = {}
const duration = 1000 * 5 * 1
// 开始轮询状态， 默认 告警/错误
export function startStatusTurning (parameter, url = api.getAlarmNoticeList, method = 'post') {
  /* eslint-disable no-invalid-this */
  return new Promise((resolve, reject) => {
    source[url] = new axios.CancelToken.source() // 这里初始化source对象
    const obj = method === 'post' ? {
      url: url,
      method: method,
      data: parameter,
      cancelToken: source[url].token
    } : {
      url: url,
      method: method,
      params: parameter,
      cancelToken: source[url].token
    }
    request(obj)
      .then(res => {
        resolve(res)
        TimerTurning[url] = setTimeout(() => {
          this(parameter, url, method)
        }, duration)
      })
      .catch(err => {
        reject(err)
        console.log(err, err.message)
        if (err.message === '已取消轮询请求') return
        TimerTurning[url] = setTimeout(() => {
          this(parameter, url, method)
        }, duration)
      })
  })
}

// 结束轮询状态， 默认 告警/错误
export const cancelStatusTurning = (url = api.getAlarmNoticeList) => {
  source[url] && source[url].cancel('已取消轮询请求')
  clearTimeout(TimerTurning[url])
}

// 数据中心抽屉详情
export const getDrawerDetail = (parameter) => {
  return request({
    url: api.getBaseInfo,
    method: 'post',
    data: parameter
  })
}

// 查询默认的数据中心id
export const getDefualtDataCenter = (parameter) => {
  return request({
    url: api.getDefualtDataCenter,
    method: 'post',
    data: parameter
  })
}