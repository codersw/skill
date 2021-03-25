import config from '@/config/defaultSettings'

export const setDocumentTitle = function (title) {
  document.title = title
  const ua = navigator.userAgent
  // eslint-disable-next-line
  const regex = /\bMicroMessenger\/([\d\.]+)/
  if (regex.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    const i = document.createElement('iframe')
    i.src = '/favicon.ico'
    i.style.display = 'none'
    i.onload = function () {
      setTimeout(function () {
        i.remove()
      }, 9)
    }
    document.body.appendChild(i)
  }
}

export const domTitle = config.title

export const getOffset = (curEle, endParentEle = document.body) => {
  // console.log('%O', curEle)
  let totalLeft = null,
      totalTop = null,
      par = curEle.offsetParent
  // 首先把自己本身的进行累加
  totalLeft += curEle.offsetLeft
  totalTop += curEle.offsetTop

  // 只要没有找到body，我们就把父级参照物的边框和偏移量累加
  while ((par !== endParentEle) && par) {
    if (navigator.userAgent.indexOf('MSIE 8.0') === -1) {
      // 不是标准的ie8浏览器，才进行边框累加
      // 累加父级参照物边框
      totalLeft += par.clientLeft
      totalTop += par.clientTop
    }
    // 累加父级参照物本身的偏移
    totalLeft += par.offsetLeft
    totalTop += par.offsetTop
    par = par.offsetParent
  }
  return {left: totalLeft, top: totalTop}
}
