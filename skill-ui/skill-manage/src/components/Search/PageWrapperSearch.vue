<script>
const MD = 768
const LG = 992
const XL = 1200
const XXL = 1600
export default {
  name: 'PageWrapperSearch',
  props: {
    md: {
      type: Number,
      default: 12
    },
    lg: {
      type: Number,
      default: 12
    },
    xl: {
      type: Number,
      default: 8
    },
    xxl: {
      type: Number,
      default: 6
    }
  },
  data () {
    return {
      isAdvancedStatus: false,
      max: 5
    }
  },
  mounted () {
    window.addEventListener('resize', this.initSize, false)
    this.initSize()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.initSize)
  },
  computed: {
    // 是否展开未显示的form-item
    isAdvanced: {
      get () {
        console.log(this.$slots)
        return typeof this.$attrs.advanced === 'boolean' ? this.$attrs.advanced : this.isAdvancedStatus
      },
      set (flag) {
        this.isAdvancedStatus = flag
        this.$emit('update:advanced', flag)
      }
    }
  },
  methods: {
    initSize () {
      const docW = document.documentElement.clientWidth
      this.max = docW >= XXL ? 24 / this.xxl - 1
        : docW >= XL ? 24 / this.xl - 1
          : docW >= LG ? 24 / this.lg - 1
            : 24 / this.md - 1
    },
    // 切换折叠展开
    toggleAdvanced () {
      this.isAdvanced = !this.isAdvanced
    }
  },
  render (h) {
    /* 查询条件 */
    let tag = 'a-form'
    const t = () => this.$slots.default.map((v, index) => {
      if (v.componentOptions.tag.split('-').includes('model') && tag !== 'a-form-model') {
        tag = 'a-form-model'
      }
      return (
        <a-col
          v-show={this.isAdvanced || index < this.max}
          key={`form${index}`}
          sm={24}
          md={this.md}
          lg={this.lg}
          xl={this.xl}
          xxl={this.xxl}>
          {v}
        </a-col>
      )
    })
    /* 折叠展开箭头按钮 */
    const advanced = (
      <a class="advanced" onclick={() => { this.isAdvanced = !this.isAdvanced }}>
        { this.isAdvanced ? this.$t('global.button.fold') : this.$t('global.button.open') }
        <a-icon type={ this.isAdvanced ? 'up' : 'down' }/>
      </a>
    )

    /* 合并 查询条件 & 按钮查询 & 折叠展开箭头按钮 */
    const rowContent = (
      <a-row gutter={48}>
        {t()}
        <a-col
          class="buttons"
          sm={24}
          md={this.md}
          lg={this.lg}
          xl={this.xl}
          xxl={this.xxl}>
          {this.$slots.buttons}
          {this.$slots.default.length > this.max && advanced}
        </a-col>
      </a-row>
    )
    const formModel = (
      <a-form-model layout="inline" {...{attrs: this.$attrs, on: this.$listeners}}>
        {rowContent}
      </a-form-model>
    )
    const form = (
      <a-form layout="inline" {...{attrs: this.$attrs, on: this.$listeners}}>
        {rowContent}
      </a-form>
    )
    const wrap = (
      <div class="card-wrap">
        {tag === 'a-form' ? form : formModel}
      </div>
    )
    return wrap
  }
}
</script>

<style lang="less" scoped>
.card-wrap {
  // margin-bottom: @gutter;
  /deep/ .ant-card-body {
    padding-bottom: 0;
  }
  /deep/ .ant-form-inline {
    .ant-form-item {
      display: flex;
      margin-right: 0;
      margin-bottom: @gutter;
      > .ant-form-item-label {
        padding-right: 8px;
        width: auto;
      }
      > .ant-form-item-control-wrapper {
        flex: 1 1;
        vertical-align: middle;
        .ant-calendar-picker {
          width: 100%;
        }
      }
    }
    .buttons {
      float: right;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      > .ant-form-item {
        display: inline-block;
        margin-left: 10px;
        &:first-child {
          margin-left: 0;
        }
      }
      /* 展开折叠 */
      .advanced {
        margin-bottom: @gutter;
        margin-left: 10px;
      }
    }
  }
}
</style>
