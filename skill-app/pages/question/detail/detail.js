// pages/question/detail/detail.js
const WxParse = require("../../../components/comi/comi.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    question: "",
    indicatorDots: !1,
    vertical: !1,
    autoplay: !1,
    circular: !1,
    interval: 2e3,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    current: 0,
    count: 1,
    is_fav: 0,
    fav_color: "#000",
    questionsItem: {
      "id": 201,
      "origin_url": "https://github.com/Snailclimb/JavaGuide",
      "is_show": "0",
      "is_rich": "1",
      "question": "讲一下Java内存模型",
      "answer": "在 JDK1.2 之前，Java的内存模型实现总是从<font color=\"red\">**主存**（即共享内存）读取变量</font>，是不需要进行特别的注意的。而在当前的 Java 内存模型下，线程可以把变量保存<font color=\"red\">**本地内存**</font>（比如机器的寄存器）中，而不是直接在主存中进行读写。这就可能造成一个线程在主存中修改了一个变量的值，而另外一个线程还继续使用它在寄存器中的变量值的拷贝，造成<font color=\"red\">**数据的不一致**</font>。\n\n![数据的不一致](https://user-gold-cdn.xitu.io/2018/10/30/166c46ede4423ba2?w=273&h=166&f=jpeg&s=7268)\n\n要解决这个问题，就需要把变量声明为<font color=\"red\"> **volatile**</font>，这就指示 JVM，这个变量是不稳定的，每次使用它都到主存中进行读取。\n\n说白了，<font color=\"red\"> **volatile**</font> 关键字的主要作用就是保证变量的可见性然后还有一个作用是防止指令重排序。\n\n![volatile关键字的可见性](https://user-gold-cdn.xitu.io/2018/10/30/166c46ede4b9f501?w=474&h=238&f=jpeg&s=9942)",
      "rich_answer": "",
      "author": "Snailclimb",
      "language": "java",
      "area": "基础",
      "gzh": "JavaGuide",
      "created_at": "2019-04-16T16:26:31.000Z",
      "updated_at": "2019-05-26T02:36:14.000Z",
      "deleted_at": null
    } 
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      const that = this;
      this.setData({
        id: options.id,
        current: options.index,
        title: options.language
      });
      WxParse(that.data.questionsItem.answer, that)
      // wx.setNavigationBarTitle({
      //   title: options.language
      // });
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
  bindanimationfinish(n) {
    console.log(this.questionsItem);
    console.log("bindanimationfinish");
}
})