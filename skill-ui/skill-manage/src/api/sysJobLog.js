import { axios } from '@/utils/request'

const api = {
  sysJobLog: '/job/log'
}

export function getSysJobLogList (parameter) {
  return axios({
    url: api.sysJobLog + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveSysJobLog (parameter) {
  return axios({
    url: api.sysJobLog,
    method: parameter.jobId === 0 ? 'post' : 'put',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delSysJobLog (parameter) {
  return axios({
    url: api.sysJobLog + '/' + parameter,
    method: 'delete'
  })
}

export const sysJobLogExport = api.sysJobLog + '/export'
