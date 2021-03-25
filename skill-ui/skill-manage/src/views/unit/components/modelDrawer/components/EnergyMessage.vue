<template>
  <div class="energy-wrap">
    <div v-if="drawerShowType === 'space'">
      <a-row type="flex" align="middle" :gutter="16" style="padding-bottom:20px;">
        <a-col :span="8">
          <v-chart :forceFit="true" :height="100" :padding=" { top: -20, right: 0, bottom: 10, left: 0 }" :data="allPower.data" :scale="allPower.scale">
            <v-coord type="polar" :startAngle="-202.5" :endAngle="22.5" :radius="0.75"></v-coord>
            <v-axis
              dataKey="value"
              :zIndex="2"
              :line="null"
              :label="allPower.axisLabel"
              :tickLine="null"
              :grid="null"
            ></v-axis>
            <v-axis dataKey="1" :show="false"></v-axis>
            <v-series
              gemo="point"
              position="value*1"
              shape="pointer"
              color="#1890FF"
              :active="false"
            ></v-series>
            <v-guide
              type="arc"
              :zIndex="0"
              :top="false"
              :start="allPower.arcGuide1Start"
              :end="allPower.arcGuide1End"
              :vStyle="allPower.arcGuide1Style"
            ></v-guide>
            <v-guide
              type="arc"
              :zIndex="1"
              :start="allPower.arcGuide2Start"
              :end="allPower.arcGuide2End"
              :vStyle="allPower.arcGuide2Style"
            ></v-guide>
            <v-guide
              type="html"
              :position="allPower.htmlGuidePosition"
              :html="allPower.htmlGuideHtml"
            ></v-guide>
          </v-chart>
        </a-col>
        <a-col :span="8">
          <v-chart :forceFit="true" :height="100" :padding=" { top: -20, right: 0, bottom: 10, left: 0 }" :data="ups.data" :scale="ups.scale">
            <v-coord type="polar" :startAngle="-202.5" :endAngle="22.5" :radius="0.75"></v-coord>
            <v-axis
              dataKey="value"
              :zIndex="2"
              :line="null"
              :label="ups.axisLabel"
              :tickLine="null"
              :grid="null"
            ></v-axis>
            <v-axis dataKey="1" :show="false"></v-axis>
            <v-series
              gemo="point"
              position="value*1"
              shape="pointer"
              color="#1890FF"
              :active="false"
            ></v-series>
            <v-guide
              type="arc"
              :zIndex="0"
              :top="false"
              :start="ups.arcGuide1Start"
              :end="ups.arcGuide1End"
              :vStyle="ups.arcGuide1Style"
            ></v-guide>
            <v-guide
              type="arc"
              :zIndex="1"
              :start="ups.arcGuide2Start"
              :end="ups.arcGuide2End"
              :vStyle="ups.arcGuide2Style"
            ></v-guide>
            <v-guide
              type="html"
              :position="ups.htmlGuidePosition"
              :html="ups.htmlGuideHtml"
            ></v-guide>
          </v-chart>
        </a-col>
        <a-col :span="8">
          <v-chart :forceFit="true" :height="100" :padding=" { top: -20, right: 0, bottom: 10, left: 0 }" :data="conditioner.data" :scale="conditioner.scale">
            <v-coord type="polar" :startAngle="-202.5" :endAngle="22.5" :radius="0.75"></v-coord>
            <v-axis
              dataKey="value"
              :zIndex="2"
              :line="null"
              :label="conditioner.axisLabel"
              :tickLine="null"
              :grid="null"
            ></v-axis>
            <v-axis dataKey="1" :show="false"></v-axis>
            <v-series
              gemo="point"
              position="value*1"
              shape="pointer"
              color="#1890FF"
              :active="false"
            ></v-series>
            <v-guide
              type="arc"
              :zIndex="0"
              :top="false"
              :start="conditioner.arcGuide1Start"
              :end="conditioner.arcGuide1End"
              :vStyle="conditioner.arcGuide1Style"
            ></v-guide>
            <v-guide
              type="arc"
              :zIndex="1"
              :start="conditioner.arcGuide2Start"
              :end="conditioner.arcGuide2End"
              :vStyle="conditioner.arcGuide2Style"
            ></v-guide>
            <v-guide
              type="html"
              :position="conditioner.htmlGuidePosition"
              :html="conditioner.htmlGuideHtml"
            ></v-guide>
          </v-chart>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <v-chart :forceFit="true" :height="150" :padding=" { top: 10, right: 20, bottom: 60, left: 30 }" :data="pueChartData" :scale="pueScale">
          <v-tooltip />
          <v-axis />
          <v-legend offsetY="50"/>
          <v-smooth-line position="month*temperature" color="#ff4315" shape="smooth" />
          <v-point position="month*temperature" color="city" />
        </v-chart>
      </a-row>
    </div>
    <div v-if="drawerShowType === 'cage'">
      <a-row type="flex" align="middle" :gutter="16" class="padd-two" style="padding-left:38px;">
        <a-col :span="8">{{ 'app.model.drawer.ratedPower' | i18n }}</a-col>
        <a-col :span="16">2000kw</a-col>
      </a-row>
      <a-row type="flex" align="middle" :gutter="16" style="padding-left:38px;">
        <a-col :span="8">{{ 'app.model.drawer.mostPowerful' | i18n }}</a-col>
        <a-col :span="16">2200kw</a-col>
      </a-row>
    </div>
    <div v-if="drawerShowType === 'cabinet'">
      <a-row type="flex" align="middle" :gutter="16" style="padding-left:38px;" class="padd-two">
        <a-col :span="8">{{ 'app.model.drawer.ratedPower' | i18n }}</a-col>
        <a-col :span="16">2000kw</a-col>
      </a-row>
      <a-row type="flex" align="middle" :gutter="16" style="padding-left:38px;">
        <a-col :span="8">{{ 'app.model.drawer.mostPowerful' | i18n }}</a-col>
        <a-col :span="16">2200kw</a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { registerShape } from 'viser-vue'
const power = 1100
const allPowerMax = 2200
const allPowerScale = [{
  dataKey: 'value',
  min: 0,
  max: allPowerMax,
  nice: false
}]

const allPowerData = [
  { value: 1600 }
]

// -----------------upschart---------------//


registerShape('point', 'pointer', {

})
const upsMax = 200
const upsScale = [{
  dataKey: 'value',
  min: 0,
  max: upsMax,
  nice: false
}]

const upsData = [
  { value: 40 }
]
// ----------------------------------------//
// -----------------upschart---------------//

registerShape('point', 'pointer', {

})
const conditionerMax = 200
const conditionerScale = [{
  dataKey: 'value',
  min: 0,
  max: conditionerMax,
  nice: false
}]

const conditionerData = [
  { value: 60 }
]
// ----------------------------------------//


export default {
  name: 'EnergyMessage',
  props: {
    drawerShowType: {
      type: String,
      default: 'space'
    },
    powerInfoRes: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      power: '',
      allPowerMax,
      allPower: {
        height: 400,
        data: [
          { value: 4 }
        ],
        scale: [{
          dataKey: 'value',
          min: 0,
          max: 10,
          nice: false
        }],
        // scale: () => {
        //   return this.allPowerScale
        // },
        axisLabel: {
          offset: -20,
          formatter: (val) => {
            return ''
          },
          textStyle: {
            fontSize: 18,
            textAlign: 'center'
          }
        },
        arcGuide1Start: [0, 0.945],
        arcGuide1End: () => {
          return [this.allPower.scale[0].max, 0.945]
        },
        arcGuide1Style: {
          stroke: '#6BAEE9',
          lineWidth: 8
        },
        arcGuide2Start: [0, 0.945],
        arcGuide2End: () => {
          return [this.allPower.data[0].value, 0.945]
        },
        arcGuide2Style: {
          stroke: '#00E4FF',
          lineWidth: 8
        },
        htmlGuidePosition: ['50%', '80%'],
        htmlGuideHtml: () => {
          return `
          <div style="width: 300px;text-align: center;">
            <p style="font-size: 14px;color: #545454;margin: 0;">${this.allPower.data[0].value}</p>
            <p style="font-size: 14px;color: #545454;margin: 0;">KW</p>
            <div style="height:4px;"></div>
            <p style="font-size: 14px;color: #545454;margin: 0;">${this.$t('app.model.drawer.totalPower')}</p> 
          </div>
        `
        }
      },
      upsMax,
      upsRate: 0,
      ups: {
        height: 400,
        data: [
          { value: 4 }
        ],
        scale: [{
          dataKey: 'value',
          min: 0,
          max: 10,
          nice: false
        }],
        axisLabel: {
          offset: -20,
          formatter: (val) => {
            return ''
          },
          textStyle: {
            fontSize: 18,
            textAlign: 'center'
          }
        },
        arcGuide1Start: [0, 0.945],
        arcGuide1End: () => {
          return [this.ups.scale[0].max, 0.945]
        },
        arcGuide1Style: {
          stroke: '#9492f1',
          lineWidth: 8
        },
        arcGuide2Start: [0, 0.945],
        arcGuide2End: () => {
          return [this.ups.data[0].value, 0.945]
        },
        arcGuide2Style: {
          stroke: '#6A67EF',
          lineWidth: 8
        },
        htmlGuidePosition: ['50%', '80%'],
        htmlGuideHtml: () => {
          return `
          <div style="width: 300px;text-align: center;">
            <p style="font-size: 14px;color: #545454;margin: 0;">${this.upsRate}%</p>
            
            <div style="height:23px;"></div>
            <p style="font-size: 14px;color: #545454;margin: 0;">${this.$t('app.model.drawer.UPSload')}</p>
          </div>
        `
        }
      },
      conditionerMax,
      airConRate: 0,
      conditioner: {
        height: 400,
        data: [{ value: 4 }],
        scale: [{
          dataKey: 'value',
          min: 0,
          max: 10,
          nice: false
        }],
        axisLabel: {
          offset: -20,
          formatter: (val) => {
            return ''
          },
          textStyle: {
            fontSize: 18,
            textAlign: 'center'
          }
        },
        arcGuide1Start: [0, 0.945],
        arcGuide1End: () => {
          return [this.conditioner.scale[0].max, 0.945]
        },
        arcGuide1Style: {
          stroke: '#d082f5',
          lineWidth: 8
        },
        arcGuide2Start: [0, 0.945],
        arcGuide2End: () => {
          return [this.conditioner.data[0].value, 0.945]
        },
        arcGuide2Style: {
          stroke: '#8301C0',
          lineWidth: 8
        },
        htmlGuidePosition: ['50%', '80%'],
        htmlGuideHtml: () => {
          return `
          <div style="width: 300px;text-align: center;">
            <p style="font-size: 14px;color: #545454;margin: 0;">${this.airConRate}%</p>
            
            <div style="height:23px;"></div>
            <p style="font-size: 14px;color: #545454;margin: 0;">${this.$t('app.model.drawer.airConditioning')}</p>
          </div>
        `
        }
      },
      pueData: [
        { month: '1', PUE: 7.0 },
        { month: '2', PUE: 6.9 },
        { month: '3', PUE: 9.5 },
        { month: '4', PUE: 14.5 },
        { month: '5', PUE: 18.4 },
        { month: '6', PUE: 21.5 },
        { month: '7', PUE: 25.2 },
        { month: '8', PUE: 26.5 },
        { month: '9', PUE: 23.3 },
        { month: '10', PUE: 18.3 },
        { month: '11', PUE: 13.9 },
        { month: '12', PUE: 9.6 }
      ],
      pueScale: [],
      pueChartData: [],
      allPowerScale,
      allPowerData,
      conditionerData,
      upsData
    }
  },
  mounted () {
     this.initChart()
  },
  methods: {
      /**
    * 图标初始化
    * @author NJH
    */
    initChart () {
      if (this.drawerShowType === 'space') {
        this.initAllPower()
        this.initUps()
        this.initConditioner()
        this.initPueChart()
      }
    },
    /**
     * 总功率统计图数据
     * @author NJH
     */
    initAllPower () {
      // 当前功率值
      this.$set(this.allPower.data[0], 'value', this.powerInfoRes.currentPower)
      console.log('this.allPowerData[0].value', this.allPowerData[0].value)
      this.allPowerMax = this.powerInfoRes.maxPower
      console.log('this.allPowerMax', this.allPowerMax)
      this.allPower.scale[0].max = this.powerInfoRes.maxPower
      console.log('this.allPower.scale[0].max', this.allPower.scale[0].max)
    },
    /**
     * ups 数据
     * @author NJH
     */
    initUps () {
      // ups 当前值
      this.$set(this.ups.data[0], 'value', this.powerInfoRes.currentUpsPower)
      console.log('this.upsData[0].value', this.ups.data[0].value)
       // ups 最大值
      this.upsMax = this.powerInfoRes.maxUpsPower
      console.log('this.upsMax', this.upsMax)
      this.ups.scale[0].max = this.powerInfoRes.maxUpsPower
      console.log('this.ups.scale[0].max', this.ups.scale[0].max)
      this.upsRate = this.powerInfoRes.upsRate
    },
    /**
     * 空调图数据
     *@author NJH
     */
    initConditioner () {
      // 空调 当前值
      this.$set(this.conditioner.data[0], 'value', this.powerInfoRes.currentAirConPower)
      // this.conditionerData[0].value = this.powerInfoRes.currentAirConPower
      // 空调 最大值
      this.conditionerMax = this.powerInfoRes.maxAirConPower
      this.conditioner.scale[0].max = this.powerInfoRes.maxPower
      this.airConRate = this.powerInfoRes.airConRate
    },
    /**
     * PUE折线图
     * @author NJH
     */
    initPueChart () {
      this.pueData = this.powerInfoRes.pueList.map(item => ({
        ...item,
        month: item.name,
        PUE: item.value
      }))
      const DataSet = require('@antv/data-set')
      const dv = new DataSet.View().source(this.pueData)
      dv.transform({
        type: 'fold',
        fields: ['PUE'],
        key: 'city',
        value: 'temperature'
      })
      this.pueChartData = dv.rows
      this.pueScale = [{
        dataKey: 'month',
        min: 0,
        max: 1
      }]
    }
  }
}
</script>
<style lang="less" scoped>
@padding: 63px;
.energy-wrap {
  margin-left: -(@padding - 23px);
  margin-right: -(@padding - 23px);
}
.padd-two {
  padding-bottom: @gutter;
}
</style>