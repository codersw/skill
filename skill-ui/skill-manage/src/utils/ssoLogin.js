import { axios } from '@/utils/request'

export function getSsoUrl () {
  return new Promise((resolve, reject) => {
    axios({
      url: '/auth/sso/config',
      method: 'get',
      dataType: 'json'
    }).then(res => {
      let authorizationUrl = res.data.authorizationUrl
      authorizationUrl = authorizationUrl + '?client_id=' + res.data.clientId +
        '&response_type=' + res.data.responseType +
        '&scope=' + res.data.scope +
        '&state=' + res.data.state +
        '&redirect_uri=' + res.data.redirectUri
      resolve(authorizationUrl)
    }).catch(err => {
      reject(err)
    })
  })
}