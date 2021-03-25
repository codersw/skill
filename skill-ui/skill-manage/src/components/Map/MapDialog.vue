<template>
  <a-modal
    :visible="visible"
    centered
    title="请选择地址"
    cancelText="取消"
    okText="确定"
    @cancel="close"
    @ok="handleOk"
  >
    <a-form
      ref="mapForm"
      class="form"
      layout="inline"
      :model="form"
      :rules="rules"
    >
      <a-form-item name="address">
        <a-select
          v-model="form.address"
          show-search
          placeholder="请输入你要搜索的地点"
          style="width: 360px"
          :default-active-first-option="false"
          :show-arrow="false"
          :filter-option="false"
          :not-found-content="null"
          @search="handleQuery"
          @change="handleSelect"
        >
          <a-select-option v-for="d in addressSource" :key="d.value">
            {{ d.title }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="range">
        <a-select
          v-model="form.range"
          placeholder="请选择范围"
          @change="setRadius"
        >
          <a-select-option v-for="item in ranges" :key="item">
            {{ item }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
    <div>
      <baidu-map
        v-if="visible"
        class="bm-view"
        :center="addressPoint"
        :zoom="zoom"
        ak="qWmCfqDAdPBzy3YoHxGnimKT"
        @ready="handler">
      </baidu-map>
    </div>
  </a-modal>
</template>
<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import { ref, reactive, toRefs, nextTick } from 'vue'
import TrendVue from '../Trend/Trend.vue'
// 因为默认的圆太难看了，所以我修改了下样式
const circleOptions = {
  strokeColor: '#18A65E',
  strokeWeight: 2,
  fillColor: '#18A65E',
  fillOpacity: '0.1'
}
 let marker = null,
      circle = null,
      local = null,
      geco = null
export default {
  name: 'MapDialog',
  components: {BaiduMap},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    range: {
      type: String,
      default: '300米'
    },
    point: {
      type: Object,
      default: () => ({ lng: 113.271429, lat: 23.135336 })
    }
  },
  data () {
    return {
      zoom: 16,
      form: {
        address: '',
        range: ''
      },
      rules: {
        address: [
          {
            required: true,
            message: '请输入你要搜索的地点',
            trigger: 'change'
          }
        ]
      },
      ranges: ['100米', '300米', '500米'],
      addressPoint: this.point,
      addressSource: []
    }
  },
  created () {
    this.form.range = this.range
  },
  mounted () {
  },
  methods: {
    handler ({BMap, map}) {
      // console.log(BMap, map)
      const { Map, Point, Marker, Geocoder, LocalSearch } = BMap
      geco = new Geocoder()
        map.enableScrollWheelZoom()
        // 禁用地图默认点击弹框
        this.addressPoint = this.point
        const { lng, lat } = this.addressPoint
        const point = new Point(lng, lat)

        // 创建一个图像标注实例，允许启用拖拽Marker
        marker = new Marker(point, { enableDragging: true })
        map.addOverlay(marker)
        // 标注拖拽
        marker.addEventListener('dragend', ({ point }) => {
          this.getAddrByPoint(point)
        })

        // 地图点击
        map.addEventListener('click', ({ point }) => {
          this.getAddrByPoint(point)
        })

        // 创建一个覆盖物——圆
        circle = new BMap.Circle(
          point,
          parseInt(this.form.range),
          circleOptions
        )
        // 添加覆盖物
        map.addOverlay(circle)

        // 设置默认地址
        geco.getLocation(point, (res) => {
          this.form.address = res.address
        })

        // 创建本地检索实例供search回调使用
        local = new LocalSearch(map, {
          onSearchComplete: (results) => {
              const res = []
              for (let i = 0; i < results.getCurrentNumPois(); i++) {
                const { title, address } = results.getPoi(i)
                res.push({
                  ...results.getPoi(i),
                  value: `${title}(${address})`
                })
              }
              this.addressSource = res
          }
        })
    },
    setRadius () {
      circle.setCenter(this.addressPoint)
      circle.setRadius(parseInt(this.form.range))
    },
    handleQuery (query) {
      if (!query) {
        this.addressSource = []
        return
      }
      local.search(query)
    },
    handleSelect (item) {
      const { point } = this.addressSource.find(
        ({ value }) => value === item
      )
      this.addressPoint = point
      this.setRadius()
      marker.setPosition(point)
      // this.map.panTo(point)
    },
    close () {
      this.$emit('close')
      // this.visible = false
      // this.$refs.mapForm.resetFields()
      this.form.address = ''
    },
    handleOk () {
      // this.$refs.mapForm.validate().then(() => {
        this.$emit('confirm', {
          address: this.form.address,
          point: this.addressPoint,
          range: this.form.range
        })
         this.$emit('close')
      // })
    },
    getAddrByPoint (point) {
        geco.getLocation(point, (res) => {
        this.addressPoint = point
        this.form.address = res.address
        this.setRadius()
        // this.map.panTo(point)
        marker.setPosition(point)
      })
    }
  }
}
</script>

<style scoped>
.form {
  height: 66px;
}
.bm-view {
  width: 100%;
  height: 300px;
}
</style>