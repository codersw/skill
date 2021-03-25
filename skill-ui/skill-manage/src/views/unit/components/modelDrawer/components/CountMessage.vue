<template>
  <div>
    <div>
      <template v-if="drawerShowType === 'space'">
        <a-row type="flex" align="middle" :gutter="16" class="pub-bottom">
          <a-col :span="12">
            <a-row class="pub-min-padding">{{ 'app.model.info.channel' | i18n }}</a-row>
            <a-row class="rack-value">{{ statsInfoRes.rackAisle }}</a-row>
          </a-col>
          <a-col :span="12">
            <a-row class="pub-min-padding">{{ 'app.model.info.cabinet' | i18n }}</a-row>
            <a-row class="rack-value">{{ statsInfoRes.rack }}</a-row>
          </a-col>
        </a-row>
        <a-row type="flex" align="middle" :gutter="16" class="pub-bottom">
          <a-col :span="12">
            <a-row class="pub-min-padding">{{ 'app.model.drawer.switchingCabinets' | i18n }}</a-row>
            <a-row class="rack-value">{{ statsInfoRes.exchangeRack }}</a-row>
          </a-col>
          <a-col :span="12">
            <a-row class="pub-min-padding">{{ 'app.model.drawer.batteryPack' | i18n }}</a-row>
            <a-row class="rack-value">{{ statsInfoRes.batteries }}</a-row>
          </a-col>
        </a-row>
        <a-row type="flex" align="middle" :gutter="16">
          <a-col :span="12">
            <a-row class="pub-min-padding">{{ 'app.model.drawer.server' | i18n }}</a-row>
            <a-row class="rack-value">{{ statsInfoRes.server }}</a-row>
          </a-col>
          <a-col :span="12">
            <a-row class="pub-min-padding">{{ 'app.model.drawer.networkSwitch' | i18n }}</a-row>
            <a-row class="rack-value">{{ statsInfoRes.webExchange }}</a-row>
          </a-col>
        </a-row>
      </template>
      <a-row type="flex" align="middle" :gutter="16">
        <a-col :span="11" >
          <v-chart
            :force-fit="true"
            :data="uwndata"
            :width="150"
            :height="130"
            :padding=" { top: 0, right: 0, bottom: 0, left: -17 }"
            :scale="scale">
            <v-tooltip title="question" />
            <v-coord type="polar" :radius="0.6" :inner-radius="0.6" direction="rotate" />
            <v-interval
              :position="interval1Opts.position"
              :color="interval1Opts.color"
              :tooltip="interval1Opts.tooltip"
            />
            <v-guide
              type="html"
              :position="uwn.htmlGuidePosition"
              :html="uwn.htmlGuideHtml"
            ></v-guide>
            <!-- 外圆 -->
            <v-view :data="uwWviewData" :scale="{dataType: 'percent', formatter: '.2%'}">
              <v-coord type="theta" :radius="0.7" :innerRadius="0.7 / 0.75" />
              <v-pie position="percent" :color="['name', ['#BAE7FF']]" label="name" :select="false" :vStyle="{lineWidth: 1, stroke: '#fff'}" />
            </v-view>
          </v-chart>
        </a-col>
        <a-col :span="13">
          <a-row>{{ 'app.model.drawer.ubitOccupy' | i18n }}</a-row>
          <a-row type="flex" align="middle" :gutter="16">
            <a-col :span="12"><ellipsis :length="4" tooltip>{{ 'app.model.drawer.occupiedQuantity' | i18n }}</ellipsis></a-col>
            <a-col :span="12"><span style="color:#1C69D4">{{ uwUsing }}个</span></a-col>
          </a-row>
          <a-row type="flex" align="middle" :gutter="16">
            <a-col :span="12"><ellipsis :length="4" tooltip>{{ 'app.model.drawer.totalUbit' | i18n }}</ellipsis></a-col>
            <a-col :span="12">{{ uwAll }}个</a-col>
          </a-row>

        </a-col>
      </a-row>
      <a-row type="flex" align="middle" :gutter="16">
        <a-col :span="11" >
          <v-chart
            :force-fit="true"
            :data="cabinetndata"
            :width="150"
            :height="130"
            :padding=" { top: 0, right: 0, bottom: 0, left: -17 }"
            :scale="cabinetscale">
            <v-tooltip title="question" />
            <v-coord type="polar" :radius="0.6" :inner-radius="0.6" direction="rotate" />
            <v-interval
              :position="cabinetinterval1Opts.position"
              :color="cabinetinterval1Opts.color"
              :tooltip="cabinetinterval1Opts.tooltip"
            />
            <v-guide
              type="html"
              :position="cabinet.htmlGuidePosition"
              :html="cabinet.htmlGuideHtml"
            ></v-guide>
            <!-- 外圆 -->
            <v-view :data="cabinetWviewData" :scale="{dataType: 'percent', formatter: '.2%'}">
              <v-coord type="theta" :radius="0.7" :innerRadius="0.7 / 0.75" />
              <v-pie position="percent" :color="['name', ['#f9a364']]" label="name" :select="false" :vStyle="{lineWidth: 1, stroke: '#fff'}" />
            </v-view>
          </v-chart>
        </a-col>
        <a-col :span="13">
          <a-row>{{ 'app.model.drawer.cabinetCapacity' | i18n }}</a-row>
          <a-row type="flex" align="middle" :gutter="16">
            <a-col :span="12"><ellipsis :length="4" tooltip>{{ 'app.model.drawer.occupiedQuantity' | i18n }}</ellipsis></a-col>
            <a-col :span="12"> <span style="color:#1C69D4">{{ cabinetUsing }}个</span></a-col>
          </a-row>
          <a-row type="flex" align="middle" :gutter="16">
            <a-col :span="12"><ellipsis :length="4" tooltip>{{ 'app.model.drawer.totalNumberOfCabinets' | i18n }}</ellipsis></a-col>
            <a-col :span="12">{{ cabinetAll }}个</a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { Ellipsis } from '@/components'
const DataSet = require('@antv/data-set')
const sourceData = [
  { value: 25, type: '大事例一', name: '' }
]
const viewDv = new DataSet.View().source(sourceData)
viewDv.transform({
  type: 'percent',
  field: 'value',
  dimension: 'name',
  as: 'percent'
})
const uwWviewData = viewDv.rows
// -----------------内环-----------------------//

const uwAll = 598
const uwUsing = 403
const uwndata = [
  {'question': 'U位占用', 'percent': uwUsing / uwAll}
]

const scale = [{
  dataKey: 'percent',
  min: 1,
  max: 1
}]

const interval1Opts = {
  position: 'question*percent',
  color: ['percent', '#BAE7FF-#1890FF-#0050B3'],
  tooltip: ['percent', val => {
    return {
      name: '占比',
      value: val * 100 + '%'
    }
  }],
  label: ['percent', {
    offset: -5
  }]
}

// -----------------机柜---------cabinet------------------------------------------//

// -----cabinet------机柜------外圆------------机柜-----cabinet------//
// const DataSet = require('@antv/data-set')
const cabinetsourceData = [
  { value: 25, type: '大事例一', name: '' }
]
const cabinetviewDv = new DataSet.View().source(cabinetsourceData)
viewDv.transform({
  type: 'percent',
  field: 'value',
  dimension: 'name',
  as: 'percent'
})
const cabinetWviewData = viewDv.rows

// -------cabinet---机柜-------内环--------cabinet-----机柜---cabinet-------//
const cabinetAll = 450
const cabinetUsing = 120
const cabinetndata = [
  {'question': '机柜容量', 'percent': cabinetUsing / cabinetAll}
]
const cabinetscale = [{
  dataKey: 'percent',
  min: 0,
  max: 1
}]
const cabinetinterval1Opts = {
  position: 'question*percent',
  color: ['percent', '#FF6E02'],
  tooltip: ['percent', val => {
    return {
      name: '占比',
      value: val * 100 + '%'
    }
  }],
  label: ['percent', {
    offset: -5
  }]
}
// -----------------机柜结束---------------//


export default {
  components: {
      Ellipsis
  },
  name: 'CountMessage',
  props: {
    drawerShowType: {
      type: String,
      default: 'space'
    },
    statsInfoRes: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      uwndata,
      scale,
      interval1Opts,
      // style: {
      //   textAlign: 'right'
      // },
      uwWviewData,
      uwn: {
        htmlGuidePosition: ['50%', '80%'],
        htmlGuideHtml: () => {
          return `
          <div style="width: 300px;text-align: center;position:relative;bottom:40px;">
            <p style="font-size: 12px;color: #545454;">${(this.uwUsing / this.uwAll * 100).toFixed(2)}%</p>
          </div>
        `
        }
      },
      uwUsing,
      uwAll,
      cabinetWviewData,
      cabinetndata,
      cabinet: {
        htmlGuidePosition: ['50%', '80%'],
        htmlGuideHtml: () => {
          return `
          <div style="width: 300px;text-align: center;position:relative;bottom:40px;">
            <p style="font-size: 12px;color: #545454;">${(this.cabinetUsing / this.cabinetAll * 100).toFixed(2)}%</p>
          </div>
        `
        }
      },
      cabinetUsing,
      cabinetAll,
      cabinetscale,
      cabinetinterval1Opts
    }
  },
  mounted () {
    this.initUwChart()
    this.initCabinetChart()
  },
  methods: {
    initUwChart () {
      this.uwUsing = this.statsInfoRes.actualUnit
      this.uwAll = this.statsInfoRes.limitUnit
      this.uwndata[0].percent = Math.round(this.uwUsing / this.uwAll * 100) / 100
    },
    initCabinetChart () {
      this.cabinetUsing = this.statsInfoRes.actualRackSlot
      this.cabinetAll = this.statsInfoRes.rackSlot
      this.cabinetndata[0].percent = Math.round(this.cabinetUsing / this.cabinetAll * 100) / 100
    }
  }
}
</script>
<style lang="less" scoped>
.pub-bottom {
  padding-bottom: @gutter;
}
.pub-min-padding {
  padding-bottom: @gutter - 10px;
}
.rack-value {
  font-size: 18px;
}
</style>