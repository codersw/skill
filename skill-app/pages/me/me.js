// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: "Hello World",
    userInfo: {
        nickName: "改变世界的人"
    },
    hasUserInfo: !1,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    routers: [ {
        language: "说明",
        navi_url: "/pages/questionList/me_announcee.png",
        icon_url: "/images/me_announce.png",
        code: "10"
    }, {
        language: "版本",
        navi_url: "/pages/questionList/me_version.png",
        icon_url: "/images/me_version.png"
    }, {
        language: "收藏",
        navi_url: "/pages/questionList/me_love.png",
        icon_url: "/images/me_love.png"
    } ]
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
  getUserInfo (t) {
    console.log(t);
    this.setData({
        userInfo: t.detail.userInfo,
        nickName: t.detail.userInfo.nickName,
        avatarUrl: t.detail.userInfo.avatarUrl,
        hasUserInfo: !0
    });
  }
})