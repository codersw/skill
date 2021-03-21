// pages/inter/inter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchPanel: false,
    companyList:[
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
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage () {

  },
  onActivateSearch () {
    this.setData({
      searchPanel: true
    })
  },
  onCancel () {
    this.setData({
      searchPanel: false
    })
  }
})