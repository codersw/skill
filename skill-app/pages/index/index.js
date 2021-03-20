// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    languageList:[

    ]
  },
  // 事件处理函数
  onReady() {
    const that = this;
    wx.showLoading({
      title: "加载中"
    }),
    that.setData({
      languageList: [
          {
            "id":29,
            "title":"面试技巧",
            "navi_url":"/pages/question/list/list",
            "description":"你如何看待加班？",
            "is_show":"0",
            "tag":"main",
            "weight":"0.10",
            "icon_url":"https://upload-images.jianshu.io/upload_images/2470773-1534eea640f72ee8.jpeg",
            "sub_menus":"",
            "created_at":"2019-10-07T04:03:00.000Z",
            "updated_at":"2019-10-07T04:03:00.000Z",
            "deleted_at":null
          },
          {
            "id":1,
            "title":"Java",
            "navi_url":"/pages/question/list/list",
            "description":"酷，真香！",
            "is_show":"0",
            "tag":"main",
            "weight":"0.20",
            "icon_url":"https://upload.jianshu.io/collections/images/2099/6-130122153923351_%E5%89%AF%E6%9C%AC.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240",
            "sub_menus":"None",
            "created_at":"2019-02-18T13:39:00.000Z",
            "updated_at":"2019-02-18T13:39:00.000Z",
            "deleted_at":null
          },
          {
            "id":30,
            "title":"计算机网络与操作系统",
            "navi_url":"/pages/question/list/list",
            "description":"计算机网络与操作系统",
            "is_show":"0",
            "tag":"main",
            "weight":"1.00",
            "icon_url":"https://upload-images.jianshu.io/upload_images/2470773-a57e424b5dab5b14.png",
            "sub_menus":"",
            "created_at":"2019-12-15T11:45:00.000Z",
            "updated_at":"2019-12-15T11:45:00.000Z",
            "deleted_at":null
          },
          {
            "id":9,
            "title":"HTML",
            "navi_url":"/pages/question/list/list",
            "description":"前端大佬看过来",
            "is_show":"0",
            "tag":"main",
            "weight":"8.00",
            "icon_url":"https://upload.jianshu.io/collections/images/2032/%E6%9C%AA%E5%91%BD%E5%90%8D_%E5%89%AF%E6%9C%AC.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/144/h/144/format/webp",
            "sub_menus":null,
            "created_at":"2019-02-18T13:39:27.000Z",
            "updated_at":"2019-02-18T13:39:27.000Z",
            "deleted_at":null
          },
          {
            "id":11,
            "title":"Linux",
            "navi_url":"/pages/question/list/list",
            "description":"主流服务器系统",
            "is_show":"0",
            "tag":"main",
            "weight":"10.00",
            "icon_url":"https://bkimg.cdn.bcebos.com/pic/b8389b504fc2d562853535047a5b87ef76c6a6efc68d?x-bce-process=image/resize,m_lfit,w_150,limit_1/format,f_jpg",
            "sub_menus":"",
            "created_at":"2019-02-18T13:39:00.000Z",
            "updated_at":"2019-02-18T13:39:00.000Z",
            "deleted_at":null
          },
          {
            "id":12,
            "title":"Vue",
            "navi_url":"/pages/question/list/list",
            "description":"已经会了 HTML、CSS、JavaScript？",
            "is_show":"0",
            "tag":"main",
            "weight":"11.00",
            "icon_url":"https://dss0.bdstatic.com/6Ox1bjeh1BF3odCf/it/u=1685663562,1816169729&fm=218&app=92&f=JPG?w=121&h=75&s=01903C7270A477157583CA4D0200C0EE",
            "sub_menus":"",
            "created_at":"2019-02-18T13:39:00.000Z",
            "updated_at":"2019-02-18T13:39:00.000Z",
            "deleted_at":null
          }
      ]
    })
    wx.hideLoading();
  },
  onLoad() {
   
  },
  goNext(e) {
    const item = e.currentTarget.dataset.item;
    console.log(item);
    const url = "../.." + e.currentTarget.dataset.link + "?title=" + item.title;
    console.log(url);
    wx.navigateTo({
        url: url
    });
}
})
