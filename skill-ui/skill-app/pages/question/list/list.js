// pages/question/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "课程名称",
    quesitonList: [{
        id: 1,
        origin_url: "http://www.baidu.com",
        question: "题目正在加载中...",
        answer: "因为使用的服务器配置不高，所以，请耐心等待...",
        create_at: "",
        delete_at: "",
        author: "swen",
        gzh: "swen",
        language: "PHP"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    const that = this;
    this.setData({
      title: options.title
    })
    wx.setNavigationBarTitle({
      title: options.title
    })
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
  goNext(e) {
    const item = e.currentTarget.dataset.item; 
    const index = e.currentTarget.dataset.index;
    console.log(item);
    console.log(index);
    const url = "../../../pages/question/detail/detail?" + item.id + "&index=" + index + "&title=" + this.data.title;
    console.log(url); 
    wx.navigateTo({
        url: url
    });
  }
})