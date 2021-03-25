import { axios } from '@/utils/request'

const api = {
  sysJob: '/job'
}

export function getSysJobList (parameter) {
  return axios({
    url: api.sysJob + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveSysJob (parameter) {
  return axios({
    url: api.sysJob,
    method: parameter.jobId === 0 ? 'post' : 'put',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function changeStatus (parameter) {
  return axios({
    url: api.sysJob + '/changeStatus',
    method: 'put',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function runSysJob (parameter) {
  return axios({
    url: api.sysJob + '/run',
    method: 'put',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delSysJob (parameter) {
  return axios({
    url: api.sysJob + '/' + parameter,
    method: 'delete'
  })
}

export const sysJobExport = api.sysJob + '/export'
