<template>
  <div @click="handleOnClickPage">
    <!-- <a-radio-group v-model="state" button-style="solid" class="radio">
      <a-radio-button value="cube">
        cube
      </a-radio-button>
      <a-radio-button value="aimation">
        animation
      </a-radio-button>
      <a-radio-button value="model">
        model
      </a-radio-button>
    </a-radio-group>
    <cube v-show="state=='cube'"/>
    <aimation v-show="state=='aimation'"/> -->
    <model
      v-show="state=='model'"
      ref="model"
      style="position: fixed;top:0;left:0;width:100%;height:100%;"
      :police-list-current="newsList"
      :data-center-id="dataCenterId"
      :model-id="id"
      :is-location="isLocation"
      @change-scene-type-or-model-id="handleOnChangeSceneTypeOrModelId"/>
    <model-drawer v-model="visible" :drawer-show-type="drawerShowType" :drawerData="drawerData"></model-drawer>
    <search
      :searchShowStatus="searchShowStatus"
      :data-center-id="dataCenterId"
      @change-show-search-status="changeShowSearchStatus"
      @handle-on-cat-detail="handleOnCatDetail"></search>
    <warn-news
      :newsList="newsList"
      :showNewsStatus="showNewsStatus"
      @handle-on-cat-warn-news="handleOnCatWarnNews"
      @change-show-news-status="changeShowNewsStatus"></warn-news>
    <!-- <model-drawer v-if="drawerShowType === 1" v-model="visible" :drawerShowType="1"></model-drawer>
    <model-drawer v-if="drawerShowType === 2" v-model="visible" :drawerShowType="2"></model-drawer>
    <model-drawer v-if="drawerShowType === 3" v-model="visible" :drawerShowType="3"></model-drawer> -->
  </div>
</template>

<script>
import cube from './components/cube'
import scene from './components/scene'
import test from './components/scene/test2'
import aimation from './components/scene/animation'
import model from './components/model'
import modelDrawer from './components/modelDrawer'
import search from './components/search'
import warnNews from './components/warnNews'
import { startStatusTurning, cancelStatusTurning, getDrawerDetail, getDefualtDataCenter } from '@/api/model'
export default {
  name: 'DataCenter',
  components: {
    cube,
    scene,
    test,
    aimation,
    model,
    modelDrawer,
    search,
    warnNews
  },
  data () {
    return {
      state: 'model',
      // goToSceneOne: true // 改变这个值 切换到场景1
      visible: true,
      drawerShowType: 'space', // space:数据中心  cage：机柜通道    cabinet：机柜
      searchShowStatus: false,
      showNewsStatus: false,
      drawerData: {
        serverInfoRes: {}, // 功率信息
        baseInfoRes: {}, // 基本信息
        powerInfoRes: {}, // 能源信息
        environmentInfoRes: [], // 环境信息
        statsInfoRes: {} // 统计信息
      },
      id: '', // 模型id,
      newsList: [], // 报警信息数组
      dataCenterId: '', // 数据中心id
      isLocation: false // 改变该值 触发定位
    }
  },
  activated () {
    this.initPage()
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    cancelStatusTurning() // 页面销毁前停止轮询
    next()
  },
  methods: {
    // 初始化页面
    initPage () {
      // 进入页面必须携带 数据中心id
      // if (!this.$store.state.dataCenterId) return
      this.getWarnNews({id: this.dataCenterId}) // 轮询警告信息数据
      // 判断和上一次进入数据中心的id是否相同，否则重新加载
      if (this.$route.query.dataCenterId === this.$store.state.modal.dataCenterId) {
        // this.isLocation = !this.isLocation
        // todo
        return
      }
      this.$refs.model.destory().then(async () => {
        console.log('this.$refs.model.destory')
        this.$store.dispatch('SetDataCenterId', this.$route.query.dataCenterId)
        // 初始化数据
        this.dataCenterId = this.$route.query.dataCenterId || await this.getDefualtDataCenterId()
        this.id = this.$route.query.id || this.dataCenterId
        this.isLocation = !this.isLocation
        this.getBaseInfo(this.id, this.drawerShowType) // 查询抽屉详情数据
        this.$refs.model.init() // 初始化
      })
    },
    /**
     * 查询默认的数据中心id，并根据id查询抽屉和警告信息
     * @author NJH
     */
    getDefualtDataCenterId () {
      return new Promise((resolve) => {
        getDefualtDataCenter({
          pageNum: 1,
          pageSize: 1,
          datacenterName: '',
          factoryId: ''
        }).then(res => {
          const data = res.data
          if (!data) resolve(this.dataCenterId)
          resolve(data.list[0].datacenterId)
        })
      })
    },
    /**
     * 切换sceneType 或切换模型id 显示不同场景
     * @author NJH
     */
    handleOnChangeSceneTypeOrModelId (val, id) {
      // ******请求不同sceneTpye（场景）值的抽屉详情接口******//
      //* * ********************************************//
      this.drawerShowType = val // 场景值
      // this.id = id // 模型id
      this.getBaseInfo(id, this.drawerShowType) // 抽屉详情
    },

    /**
     * 改变搜索显示状态
     * @author NJH
     */
    changeShowSearchStatus () {
      this.searchShowStatus = !this.searchShowStatus
      this.showNewsStatus = false
    },
     /**
     * 改变消息框显示状态
     * @author NJH
     */
    changeShowNewsStatus () {
      this.showNewsStatus = !this.showNewsStatus
      this.searchShowStatus = false
    },
    /**
     * 查询抽屉详情
     * @author NJH
     */
    getBaseInfo (id, level) {
      getDrawerDetail({
        level: level,
        id: id
      }).then(res => {
        console.log(res.data)
        const data = res.data
        if (!data) return
        this.drawerData.serverInfoRes = data.serverInfoRes
        this.drawerData.baseInfoRes = data.baseInfoRes
        this.drawerData.powerInfoRes = data.powerInfoRes
        this.drawerData.environmentInfoRes = data.environmentInfoRes
        this.drawerData.statsInfoRes = data.statsInfoRes
        this.$forceUpdate()
      })
    },
    /**
     * 获取警告消息列表
     * @author NJH
     */
    getWarnNews ({id, level = 'space'}) {
      // 开始轮询
      startStatusTurning.call(this.getWarnNews, {
        level,
        id
      }).then(res => {
        this.newsList = res.data.map(item => ({
          ...item,
          name: item.equipmentname || item.rackname || item.rackaislename,
          time: item.createTime
        }))
      })
    },
    /**
     * 查看警告消息详情
     * @author NJH
     */
    handleOnCatWarnNews (val) {
      this.showNewsStatus = false
      this.id = val.targetId
      this.isLocation = !this.isLocation
    },
    /**
     * 查看数据中心搜索结果的某一个
     */
    handleOnCatDetail (val) {
      this.searchShowStatus = false
      if (val.noSIte === '01') {
        // 提示该设备未上架
        this.$message.warning(this.$t('global.message.equipment.notOnSale'))
        return
      }
      this.id = val.id
      this.isLocation = !this.isLocation
    },
    // 点击页面
    handleOnClickPage () {
      this.searchShowStatus = false
      this.showNewsStatus = false
    }
  }
}
</script>

<style lang="less" scoped>
.radio {
  position: fixed;
  top: 0;
  right: 0;
}
</style>
