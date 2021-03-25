<template>
  <!-- <p-drawer class="p-drawer" v-bind="$attrs" :title="titleObj[drawerShowType]"> -->
  <p-drawer class="p-drawer" v-bind="$attrs" :title="drawerData.baseInfoRes[titleObj[drawerShowType]]" @on-open="handleOnOpenCollapsePanel">
    <div id="myDrawer" ref="myDrawer" class="myDrawer" @scroll="handleScroll">
      <a-row class="pub-wrap" type="flex" justify="space-between" align="middle">
        <div>
          <a-row class="pub-bottom">{{ 'app.model.drawer.serverCapacity' | i18n }}</a-row>
          <a-row class="pub-bottom"><span style="font-size:22px;">{{ drawerData.serverInfoRes.serverCanUse }}</span> {{ 'app.model.drawer.available' | i18n }}</a-row>
          <a-row class="pub-bottom">{{ 'app.model.drawer.usage' | i18n }}{{ drawerData.serverInfoRes.serverRate }}%</a-row>
        </div>
        <a-divider type="vertical" />
        <div>
          <a-row class="pub-bottom">{{ 'app.model.drawer.totalPower' | i18n }}</a-row>
          <a-row class="pub-bottom"><span style="font-size:22px;">{{ drawerData.serverInfoRes.powerTotal }}</span>kw</a-row>
          <a-row class="pub-bottom">{{ 'app.model.drawer.usage' | i18n }}{{ drawerData.serverInfoRes.powerRate }}%</a-row>
        </div>
      </a-row>
      <p-collapse v-model="activeKey" @change="getPanelOneHeight">
        <a-collapse-panel ref="panelOne" key="1">
          <template slot="header">
            <a-icon type="file-text" class="icon-margin"/>{{ 'app.model.drawer.basicInformation' | i18n }}
          </template>
          <p-collapse-panel active-key="1" :scroll-y="scrollY" @close="handleOnClose">
            <basic-message :drawerShowType="drawerShowType" :baseInfoRes="drawerData.baseInfoRes"></basic-message>
          </p-collapse-panel>
        </a-collapse-panel>
        <a-collapse-panel key="2">
          <template slot="header">
            <a-icon type="thunderbolt" class="icon-margin"/>{{ 'app.model.drawer.energyInformation' | i18n }}
          </template>
          <p-collapse-panel active-key="2" :scroll-y="scrollY" @close="handleOnClose">
            <energy-message :drawerShowType="drawerShowType" :powerInfoRes="drawerData.powerInfoRes"></energy-message>
          </p-collapse-panel>
        </a-collapse-panel>
        <a-collapse-panel key="3">
          <template slot="header">
            <a-icon type="cloud" class="icon-margin"/>{{ 'app.model.drawer.environmentalInformation' | i18n }}
          </template>
          <p-collapse-panel active-key="3" :scroll-y="scrollY" @close="handleOnClose">
            <environment-message :drawerShowType="drawerShowType" :environmentInfoRes="drawerData.environmentInfoRes"></environment-message>
          </p-collapse-panel>
        </a-collapse-panel>
        <a-collapse-panel key="4" class="panel">
          <template slot="header">
            <a-icon type="line-chart" class="icon-margin"/>{{ 'app.model.drawer.statistics' | i18n }}
          </template>
          <p-collapse-panel active-key="4" :scroll-y="scrollY" @close="handleOnClose">
            <count-message :drawerShowType="drawerShowType" :statsInfoRes="drawerData.statsInfoRes"></count-message>
          </p-collapse-panel>
        </a-collapse-panel>
      </p-collapse>
    </div>
  </p-drawer>
</template>

<script>
import Drawer from './components/Drawer'
import Collapse from './components/Collapse'
import CollapsePanel from './components/CollapsePanel'
import BasicMessage from './components/BasicMessage'
import EnergyMessage from './components/EnergyMessage'
import EnvironmentMessage from './components/EnvironmentMessage'
import CountMessage from './components/CountMessage'

export default {
  name: 'ModelDrawer',
  components: {
    'p-drawer': Drawer,
    'p-collapse': Collapse,
    'p-collapse-panel': CollapsePanel,
    'basic-message': BasicMessage,
    'energy-message': EnergyMessage,
    'environment-message': EnvironmentMessage,
    'count-message': CountMessage
  },
  props: {
    drawerShowType: {
      type: String,
      default: 'space' //  space：数据中心 cage：机柜通道 cabinet：机柜
    },
    drawerData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      height: 500,
      padding: [40, 40, 130, 40],
      activeKey: [],
      drawerTitle: '数据中心',
      scrollY: 0,
      titleObj: {
        // 'space': '数据中心',
        // 'cage': 'BBA机柜通道',
        // 'cabinet': 'BBA机柜'
        'space': 'datacenterName',
        'cage': 'rackAisleName',
        'cabinet': 'rackName'
      }
    }
  },
  mounted () {
    this.setDrawerTitle()
  },
  methods: {
    handleOnClose (key) {
      this.activeKey.splice(this.activeKey.indexOf(key), 1)
    },
    // 点击折叠后的图标
    handleOnOpenCollapsePanel (key) {
      if (!this.activeKey.includes(key)) {
        this.activeKey.push(key)
      }
    },
    setDrawerTitle () {
      if (this.drawerShowType === 1) {
        this.drawerTitle = '数据中心'
      }
      if (this.drawerShowType === 2) {
        this.drawerTitle = 'BBA机柜通道'
      }
      if (this.drawerShowType === 3) {
        this.drawerTitle = 'BBA机柜'
      }
    },
    handleScroll (val) {
      this.scrollY = this.$refs.myDrawer.pageYOffset || this.$refs.myDrawer.scrollTop
    },
    getPanelOneHeight (key) {
      this.$nextTick(() => {
        this.scrollY = this.scrollY - 1
        this.$nextTick().then(() => {
          this.scrollY = this.scrollY + 1
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.circle-container {
  position: relative;
}
.pub-wrap {
  margin: 0 63px;
}
.pub-bottom {
  padding-bottom: 10px;
  line-height: 1;
}
.pub-min-padding {
  padding-bottom: @gutter;
}
.paddTwo {
  padding-bottom: @gutter;
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
.p-drawer {
  /deep/ .ant-drawer-body {
    height: calc(100% - 55px);
    box-sizing: border-box;
  }
}
.close-btn {
  color: #1C69D4;
  border: thin solid;
}
.icon-margin {
  position: absolute;
  line-height: 1.5;
  // margin-left: -18px;
  transform: translateX(-38px);
}
</style>
