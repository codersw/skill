Component({
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },
  data: {
    historyWords: [],
    hotKeys: [],
    q: '',
    loading: false, // 锁, 防止多次无用的加载
    loadingCenter: false,
    // dataArray: [],
    searching: false
  },
  attached () { // 组件进入界面 节点树时执行
    this.setData({
      historyWords: ["123","456"]
    })
    this.setData({
      hotKeys: ["123","456"]
    })
  },
  methods: {
    loadMore () {
      if (!this.data.q) {
        return
      }
      if (this.isLocked()) {
        return
      }
      let hasMore = this.hasMore()
      if (!hasMore) {
        return
      }
      if (this.hasMore()) {
        this.locked() 
      }
    },
    _closeResult () {
      this.setData({
        searching: false,
        q: ''
      })
    },
    onCancel () {
      this.triggerEvent('cancel', {}, {})
    },
    onDelete () {
      this._closeResult()
    },
    onConfirm (event) {
      this._showResult()
      this._showLoadingCenter()
      const q = event.detail.value || event.detail.text // event.detail.value: input 输入的值, event.detail.text: 事件触发定义的值
      this.setData({
        q: q
      })
    },
    _showResult () {
      this.setData({
        searching: true
      })
    },
    _showLoadingCenter () {
      this.setData({
        loadingCenter: true
      })
    },
    _hideLoadingCenter () {
      this.setData({
        loadingCenter: false
      })
    }
  }
})
