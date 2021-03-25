import { i18nRender } from '@/locales'
/* 是否是公司邮箱*/
export function isWscnEmail (str) {
  const reg = /^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@wallstreetcn\.com$/i
  return reg.test(str.trim())
}
/*
 * 是否是邮箱
 * @param {*}
 */
export function isEmail (rule, value, callback) {
  const msg = `${i18nRender('reciver.email.error.msg')}`
  if (!value) {
    callback()
  }
  setTimeout(() => {
      const re = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
      const rsCheck = re.test(value)
      if (!rsCheck) {
        callback(new Error(msg))
      } else {
        callback()
      }
  }, 500)
}

/* 合法uri*/
export function validateURL (textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

// 验证是否整数
export function isInteger (rule, value, callback) {
  const msg = `${i18nRender('isInteger.msg')}`
  if (!value) {
    // return callback(new Error('输入不可以为空'))
    callback()
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error(msg))
    } else {
      const re = /^[0-9]*[1-9][0-9]*$/
      const rsCheck = re.test(value)
      if (!rsCheck) {
        callback(new Error(msg))
      } else {
        callback()
      }
    }
  }, 500)
}
// 正数、负数、和小数：^(\-|\+)?\d+(\.\d+)?$
export function isNumber (rule, value, callback) {
  const msg = `${i18nRender('isNumber.msg')}`
  if (!value) {
    // return callback(new Error('输入不可以为空'))
    callback()
  }
  setTimeout(() => {
    if (Number(value) === 0) {
      callback()
    } else if (!Number(value)) {
      callback(new Error(msg))
    } else {
      const re = /^(\-|\+)?\d+(\.\d+)?$/
      const rsCheck = re.test(value)
      if (!rsCheck) {
        callback(new Error(msg))
      } else {
        callback()
      }
    }
  }, 500)
}

// 验证是否是[0-1]的小数
export function isDecimal (rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'))
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入数字'))
    } else {
      if (value < 0 || value > 1) {
        callback(new Error('请输入[0,1]之间的数字'))
      } else {
        callback()
      }
    }
  }, 1000)
}

// 验证端口是否在[0,65535]之间
export function isPort (rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'))
  }
  setTimeout(() => {
    if (value === '' || typeof (value) === 'undefined') {
      callback(new Error('请输入端口值'))
    } else {
      const re = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
      const rsCheck = re.test(value)
      if (!rsCheck) {
        callback(new Error('请输入在[0-65535]之间的端口值'))
      } else {
        callback()
      }
    }
  }, 1000)
}

/* 小写字母*/
export function validateLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}