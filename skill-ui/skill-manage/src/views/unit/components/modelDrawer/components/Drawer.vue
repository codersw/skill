<template>
  <div>
    <a-drawer
      :width="386"
      class="drawer-wrap"
      placement="right"
      :closable="false"
      :visible="showDrawer"
      :mask="false">
      <template slot="title">
        <slot name="title">{{ title }}</slot>
        <a-button class="drawer-toggle-button-in" @click="onToggleDrawer">
          <a-icon type="double-right" />
        </a-button>
      </template>
      <slot/>
    </a-drawer>
    <div class="drawer-toggle-wrap">
      <a-button icon="double-left" class="drawer-toggle-button-out" @click="onToggleDrawer"/>
      <a-divider class="drawer-toggle-divider"/>
      <a-tooltip placement="left" :title="'app.model.drawer.basicInformation' | i18n"><a-button icon="file-text" class="icon-margin" @click="onClickIcon('1')"/></a-tooltip>
      <a-tooltip placement="left" :title="'app.model.drawer.energyInformation' | i18n"><a-button icon="thunderbolt" class="icon-margin" @click="onClickIcon('2')"/></a-tooltip>
      <a-tooltip placement="left" :title="'app.model.drawer.environmentalInformation' | i18n"><a-button icon="cloud" class="icon-margin" @click="onClickIcon('3')"/></a-tooltip>
      <a-tooltip placement="left" :title="'app.model.drawer.statistics' | i18n"><a-button icon="line-chart" class="icon-margin" @click="onClickIcon('4')"/></a-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Drawer',
  model: {
    prop: 'visible',
    event: 'show'
  },
  props: {
    visible: {
      type: Boolean
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      visibleDrawer: false
    }
  },
  computed: {
    showDrawer: {
      get () {
        return this.$listeners.show ? this.visible : this.visibleDrawer
      },
      set (val) {
        this.visibleDrawer = val
        this.$emit('show', val)
      }
    }
  },
  methods: {
    // 切换抽屉状态
    onToggleDrawer () {
      this.showDrawer = !this.showDrawer
    },
    onClickIcon (key) {
      this.$emit('on-open', key)
      this.showDrawer = true
    }
  }
}
</script>

<style lang="less" scoped>
.drawer-wrap {
  top: @layout-header-height;
  height: calc(100vh - @layout-header-height);
  &-title {
    margin: 0;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
  }
  /deep/ .ant-drawer-body {
    padding-left: 0;
    padding-right: 0;
    height: calc(100% - 55px);
    box-sizing: border-box;
    .myDrawer {
      position: relative;
      padding-left: 0;
      padding-right: 0;
      box-sizing: border-box;
      height: 100%;
      overflow: auto;
    }
  }
}
.drawer-toggle-button {
  &-in {
    position: fixed;
    top: 11px;
    right: @gutter;
  }
}
.drawer-toggle-wrap {
  position: fixed;
  top: @layout-header-height;
  bottom: 0;
  right: 0;
  background-color: #fff;
  @width: 60px;
  @margin: 11px;
  .drawer-toggle-divider {
    margin: @margin 0;
  }
  .drawer-toggle-button-out {
    margin-top: @margin;
    width: @width;
    border: 0;
    box-shadow: none;
  }
  .icon-margin {
    display: block;
    width: @width;
    border: 0;
    box-shadow: none;
  }
}

/deep/.my-collapse {
  border: none;
  background-color: #fff;
  .ant-collapse-item{
    border-bottom: 1px solid #fff;
    background-color: #fff;
     .ant-collapse-header{
        font-size: 18px;
        color: #333;
      }
     .ant-collapse-content{
        border-top: 1px solid #fff;
      }
  }

}
/deep/.ant-drawer-title {
  color: #1C69D4;
  font-size: 22px;
}
.drawer-toggle-button-in {
  margin-right: 3px;
}
</style>