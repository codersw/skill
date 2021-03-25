<template>
  <div class="bo">
    <progress-bar v-show="loadPercentage < 100" :progress-bar="loadPercentage"/>
    <!-- <img v-show="isShowCadType" class="cad" :src="isShowCadType === 1 ? img.cad : img.cadBak" alt=""> -->
    <div class="radio z-index-two">
      <a-breadcrumb>
        <a-breadcrumb-item><a href="javascript:void(0)" @click="$router.replace('/home')">{{ 'app.model.info.homePage' | i18n }}</a></a-breadcrumb-item>
        <a-breadcrumb-item v-if="sceneType === sceneTypeObj[2] || sceneType === sceneTypeObj[3]">
          <!-- <a href="javascript:void(0)" @click="goToSceneOne({x: 0, y: 0, z: 0})">{{ 'app.model.info.dataCenter' | i18n }}{{ isDevelopment ? `${currentModelNumber} / ${this.modelTotal}` : '' }}</a> -->
          <a href="javascript:void(0)" @click="changeScene(currentModel[1], sceneTypeObj[1])">{{ 'app.model.info.dataCenter' | i18n }}{{ isDevelopment ? `${currentModelNumber} / ${this.modelTotal}` : '' }}</a>
        </a-breadcrumb-item>
        <a-breadcrumb-item v-if="sceneType === sceneTypeObj[3]">
          <a href="javascript:void(0)" @click="changeScene(currentModel[2], sceneTypeObj[2])">{{ 'app.model.info.channel' | i18n }}</a>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <a href="javascript:void(0)" style="cursor: initial">{{ sceneType === sceneTypeObj[3] ? $t('app.model.info.cabinet') : sceneType === sceneTypeObj[2] ? $t('app.model.info.channel') : $t('app.model.info.dataCenter') }}{{ isDevelopment ? `${currentModelNumber} / ${this.modelTotal}` : '' }}</a>
        </a-breadcrumb-item>
      </a-breadcrumb>
      <a-button v-if="isDevelopment" @click="handleOnTest">动画</a-button>
      <!-- <a-button size="large" @click="goToSceneOne">
        <div class="button">数据中心{{ isDevelopment ? `${currentModelNumber} / ${modelTotal}` : `` }}</div>
      </a-button> -->
      <a-button v-if="isDevelopment" @click="handleOnClick(1)">CAD图</a-button>
      <a-button v-if="isDevelopment" @click="handleOnClick(2)">CAD图2</a-button>
      <a-button v-if="isDevelopment" @click="handleOnClick(3)">CAD图3</a-button>
      <!-- <a-button v-show="sceneType === sceneTypeObj[3]" size="large" @click="changeScene(currentModel[2], sceneTypeObj[2], true)"><div class="button">机柜通道</div></a-button> -->
    </div>

    <!-- <div v-show="sceneType === sceneTypeObj[2]" ref="card" class="card z-index-two">
      <a-radio-group v-model="radioValue" @change="handleOnChangeRadio">
        <a-radio-button value="normal">
          normal
        </a-radio-button>
        <a-radio-button value="waterLevel">
          waterLevel
        </a-radio-button>
        <a-radio-button value="orange">
          orange
        </a-radio-button>
      </a-radio-group>
    </div> -->

    <div v-show="sceneType === sceneTypeObj[1] && isDevelopment" class="card examples z-index-two">
      <!-- <a-checkbox-group v-if="loadPercentage >= 100" v-model="checkedList" @change="handleOnChangeCheckbox" >
        <a-checkbox value="cage">机柜通道</a-checkbox>
        <a-checkbox value="cabinet">机柜</a-checkbox>
        <a-checkbox value="A">配电柜和空调1</a-checkbox>
      </a-checkbox-group> -->
      <!-- <a-radio-group v-model="examplesRadioValue" @change="handleOnChangeExamplesRadio">

        <a-radio-button v-for="(item, index) in exampleUrlList" :key="index" :value="index" :class="{'finished': item.isFinished, 'current': !index}">
          {{ item.dosc }}
        </a-radio-button>

      </a-radio-group> -->
    </div>
    <model-u
      v-if="sceneType === sceneTypeObj[3]"
      :list="currentModel[3].userData.children"
      :selected-id-prop="selectedIdProp"
      :rack-id="this.currentModel[3].userData.id"
      :spare-equipment-list="spareEquipmentList"
      @query-spare-equipment="handleOnQuerySpareEquipment"/>
    <div v-show="sceneType !== sceneTypeObj[3]" ref="container" class="container"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import Stats from 'stats.js'
// ES modules
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js'
// import { RGBShiftShader } from 'three/examples/jsm/postprocessing/RGBShiftShader.js'
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
// import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
// import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { MtlObjBridge } from 'three/examples/jsm/loaders/obj2/bridge/MtlObjBridge'
import constant from '@/views/unit/assets/js/constant'
import result from '@/views/unit/assets/js/data'
import { Mesh } from 'three'
// import { forEach } from 'store/storages/all'
import unitComponentsModelU from '@/views/unit/components/model/U'
import img from '@/assets/model'
import {
  scene,
  renderer,
  labelRenderer,
  camera,
  control,
  init,
  destroy,
  modelUtils
} from '@/views/unit/assets/js/model/index'
import progressBar from '@/views/unit/components/progressBar'
import { api, getModel, getRack, startStatusTurning, cancelStatusTurning, equipmentList } from '@/api/model'
import { isArray } from 'ant-design-vue/es/_util/vue-types/utils'
export default {
  name: 'UnitComponentsModel',
  components: {
    'model-u': unitComponentsModelU,
    'progress-bar': progressBar
  },
  props: {
    policeListCurrent: Array, // 告警列表
    dataCenterId: String, // 数据中心id
    modelId: String, // 搜索的模型id
    isLocation: Boolean // 改变该值 触发定位
  },
  data () {
    return {
      // API: {
      //   getModel: '/system/dataCenter/getModel' // 数据中心树形结构
      // },
      skip: 0, // 跳帧优化
      img, // 引用的图片
      Stats: new Stats(),
      info: {}, // 模型树
      composer: null, // 后期处理
      outlinePass: null,
      group: null,
      gltfLoader: null, // 加载器 gltf
      fbxLoader: null, // 加载器 gbx
      mtlLoader: null, // 加载器 mtl
      space: null, // 场地模型对象
      SELECTED: null,
      SELECTED_SHOW_LABEL: null,
      sceneType: 'space', // 场景 默认第一个
      // sceneType: 'cabinet', // 场景 默认U位
      isFinishedChangeScene: true, // 场景切换动画是否完成
      checkAll: false,
      indeterminate: true,
      checkedList: [],
      radioValue: 'normal',
      plainOptions: ['机柜通道', '机笼', '配电柜和空调'],
      lastEvent: 'click', // 上一次的事件
      selectedList: [],
      isDevelopment: process.env.NODE_ENV === 'development', // 是否为开发环境
      examplesRadioValue: 0,
      currentModelNumber: 0, // 当前加载的模型数
      modelTotal: 0, // 模型总数
      mapMaterial: {
        1: null, // 地面cad贴图一
        2: null // 地面cad贴图二
      },
      cadMap: null, // 地面 用于显示cad
      isShowCadType: 1, // 是否显示cad图
      policeListLast: [], // 报警的设备id 数组 上一次
      lastSelected: null, // 上一次定位的模型
      // policeListCurrent: [], // 报警的设备id 数组 当前的
      currentModel: { // 当前选中的模型
        // 场景一的根节点
        1: {
          userData: {
            id: '',
            children: []
          }
        },
        // 场景二的根节点
        2: {
          userData: {
            id: '',
            children: []
          }
        },
        // 场景三的根节点
        3: {
          userData: {
            id: '',
            children: [] // 场景三数据
          }
        }
      },
      startDate: new Date(),
      endDate: new Date(),

      // 场景对象（匹配不同的类型）
      sceneTypeObj: {
        1: 'space',
        2: 'cage',
        3: 'cabinet'
        // 4: 'cabinet'
      },
      // 模型数组（按照类别type状态不同的属性里）
      modelList: {
        space: [],
        cage: [],
        cabinet: [],
        unit: []
      },
      // u位上选中设备的id
      selectedIdProp: '',
      // 空余设备
      spareEquipmentList: [],
      exampleUrlList: [
        {
          dosc: '项目场景',
          mtlUrl: '',
          objUrl: '',
          model: this.space
        },
        {
          dosc: 'set3(空调普通型)(完成)',
          mtlUrl: 'CABINET_AIRCONDITIONING_MTL',
          objUrl: 'CABINET_AIRCONDITIONING_OBJ',
          model: null,
          isFinished: true
        },
        {
          dosc: 'set7_17(空调U形1.7)(完成)',
          mtlUrl: 'CABINET_AIRCONDITIONING7_MTL',
          objUrl: 'CABINET_AIRCONDITIONING7_OBJ',
          model: null,
          isFinished: true
        },
        {
          dosc: '场地',
          mtlUrl: 'SPACE3_MTL',
          objUrl: 'SPACE3_OBJ',
          model: null,
          isFinished: false,
          dataUrl: 'TEST2'
        },
        {
          dosc: 'set1(BAS配电柜)',
          mtlUrl: 'CABINET_BAS_MTL',
          objUrl: 'CABINET_BAS_OBJ',
          model: null,
          isFinished: false
        },
        {
          dosc: 'set2(UPS)',
          mtlUrl: 'CABINET_UPS_MTL',
          objUrl: 'CABINET_UPS_OBJ',
          model: null,
          isFinished: false
        },
        {
          dosc: 'set5(APC电池组)',
          mtlUrl: 'CABINET_APC_MTL',
          objUrl: 'CABINET_APC_OBJ',
          model: null,
          isFinished: false
        },
        {
          dosc: 'set7_14(空调U形1.4)',
          mtlUrl: 'CABINET_AIRCONDITIONING4_MTL',
          objUrl: 'CABINET_AIRCONDITIONING4_OBJ',
          model: null,
          isFinished: false
        },
        {
          dosc: 'set8(机柜)',
          mtlUrl: 'CABINET_BOX_MTL',
          objUrl: 'CABINET_BOX_OBJ',
          model: null,
          isFinished: false
        },
        {
          dosc: 'set14(存储设备)',
          mtlUrl: 'CABINET_STORAGE_MTL',
          objUrl: 'CABINET_STORAGE_OBJ',
          model: null,
          isFinished: false
        },
        {
          dosc: 'set1(FD机柜)',
          mtlUrl: 'CABINET_FD_MTL',
          objUrl: 'CABINET_FD_OBJ',
          model: null,
          isFinished: false
        },
        {
          dosc: '机柜通道',
          mtlUrl: 'CAGE_CAGE1200_MTL',
          objUrl: 'CAGE_CAGE1200_OBJ',
          model: null,
          isFinished: false
        }

      ]
    }
  },
  computed: {
    // 进度条加载的百分比
    loadPercentage () {
      return Math.floor(this.currentModelNumber / (this.modelTotal || 2) * 100)
    }
  },
  watch: {
    sceneType (val) {
      let id = ''
      if (this.sceneType === 'space') {
        id = this.currentModel[1].userData.id
      }
      if (this.sceneType === 'cage') {
        id = this.currentModel[2].userData.id
      }
      if (this.sceneType === 'cabinet') {
        id = this.currentModel[3].userData.id
        this.startTurningGetRack({id})
        this.queryEquipmentList()
      } else {
        cancelStatusTurning(api.getRack)
      }
      this.$emit('change-scene-type-or-model-id', val, id)
    },
    // 当前加载的模型数
    loadPercentage (val) {
      if (val === 100) {
        // （用于首页搜索进来）
        this.showModelById()
        if (this.modelList.cage) {
          this.modelList.cage.forEach(item => {
            // 给不可用的机柜通道和其下面的机柜置灰
            if (!item.userData.status.states) {
              this.modelAddColor(item, constant.getColor('unavailableStatus'))
            }
          })
        }
      }
    },
    // 数据中心id发生变化时(传入的值显示空的 后请求到数据发生变化)
    dataCenterId () {
      this.action()
    },
    // 搜索的模型id发生变化时
    modelId (val) {
      // this.showModelById()
      this.$emit('change-scene-type-or-model-id', this.sceneType, val)
    },
    isLocation () {
      this.showModelById()
      // this.$emit('change-scene-type-or-model-id', this.sceneType, this.modelId)
    },
    // 告警列表发生变化时
    policeListCurrent: {
      handler (val) {
        this.updatePoliceList()
      },
      deep: true
    }
  },
  // mounted () {
  //   this.init()
  // },
  // beforeDestroy () {
  //   this.destory()
  // },
  methods: {
    init () {
      // return
      init(this.$refs.container)
      this.initLoader()
      this.initGroup()
      // this.initEffectComposer()
      if (this.isDevelopment) {
        this.initStats()
        // this.initGUI()
      }
      // this.action()
      // this.loadModelTest()
      this.animate()
      this.initEventListener()
      // this.initEffectComposer() // 着色器

      // 每次材质和纹理更新，触发重新渲染
      // THREE.DefaultLoadingManager.onLoad = function () {
      //   this.render()
      // }
      setTimeout(() => {
        if (this.loadPercentage < 100) {
          this.currentModelNumber = this.modelTotal
        }
      }, 1000 * 60)
    },
    // 释放内存
    destory () {
      return new Promise((resolve) => {
        window.cancelAnimationFrame(this.animate)
        control.addEventListener('change', null)
        this.$refs.container.addEventListener('click', null, false)
        this.$refs.container.addEventListener('mousemove', null, false)
        if (this.modelList.room) {
          for (let i = 0; i < this.modelList.room.length; i++) {
            scene.remove(this.modelList.room[i])
          }
        }
        this.space = null
        // 模型数组（按照类别type状态不同的属性里）
        this.modelList = {
          space: [],
          cage: [],
          cabinet: [],
          unit: []
        }
        renderer.forceContextLoss()
        destroy(this.$refs.container)
        resolve()
      })
    },
    // handleOnTest
    handleOnTest () {
      console.log('========================')
      console.log('control.target.x', control.target.x)
      console.log('control.target.y', control.target.y)
      console.log('control.target.z', control.target.z)
      console.log('camera.position.x', camera.position.x)
      console.log('camera.position.y', camera.position.y)
      console.log('camera.position.z', camera.position.z)

      // this.isFinishedChangeScene = true
      // this.modelUtils.cameraPosition()
    },
    deleteGroup (group) {
      // console.log(group);
      if (!group) return
      // Delete all the meshes in group
      group.traverse(item => {
        // console.log('item', item)
        if (item instanceof THREE.Mesh) {
          item.geometry.dispose()
          item.material.dispose()
        }
      })
    },
    // 查询u位列表数据
    queryBack (id) {
      getRack({id: id}).then(res => {
        this.currentModel[3].userData.children = res.data.unitList
        // console.log('res.data', res.data)
      })
    },
    // 轮询u位列表数据
    startTurningGetRack ({id}, url = api.getRack, method = 'get') {
      // 开始轮询
      startStatusTurning.call(
        this.startTurningGetRack,
        {id: id},
        url,
        method
      ).then(res => {
        this.currentModel[3].userData.children = res.data.unitList
        // console.log('res.data', res.data)
      })
    },
    // 根据id 定位展示
    showModelById () {
      console.log('根据id 定位展示 ', this.currentModel)
      if (this.modelId) {
        // const id = 'idroom1cageA1' // 机笼
        // const id = 'idroom1cageA1_cabinet1' // 机柜
        // const id = 'idroom1cageA1_cabinet1unit' // u位上的设备
        // const id = 'IDDMDMDAL-SKSAKD3' // 存储设备
        let seleted = this.getModelObjById(scene, this.modelId)
        if (!seleted) {
          seleted = this.getModelObjById(this.info, this.modelId)
          if (seleted && seleted.type === 'unit') {
            seleted = this.getModelObjById(scene, seleted.pId)
            this.currentModel[3] = seleted
            this.currentModel[2] = seleted.parent
            this.selectedIdProp = this.modelId
            this.updateSceneTwoModelStatus()
            this.changeScene(this.currentModel[3], this.sceneTypeObj[3])
          }
        }
        if (!seleted) return
        // 去掉上一个定位模型的选中状态
        if (this.selectedModel) {
          this.modelRemoveColor(this.selectedModel)
          this.modelHideCard(this.selectedModel)
        }
        // 机笼
        if (seleted.userData.type === 'cage') {
          this.currentModel[2] = seleted
          this.changeScene(this.currentModel[2], this.sceneTypeObj[2])
          return
        }
        // 机柜
        if (seleted.userData.type === 'cabinet') {
          this.currentModel[3] = seleted
          this.currentModel[2] = this.currentModel[3].parent
          this.updateSceneTwoModelStatus()
          this.changeScene(this.currentModel[3], this.sceneTypeObj[3])
          return
        }
        // 设备（u位上的）
        if (seleted.userData.type === 'unit') {
          return
        }

        // 其他设备
        if (seleted.userData.type !== 'space') {
          this.selectedModel = seleted
          this.modelAddColor(this.selectedModel, constant.getColor('selectedStatusStatus'))
          this.modelShowCard(this.selectedModel)
          const position = this.selectedModel.getWorldPosition() || {x: 0, y: 0, z: 0}
          // this.goToSceneOne(position, {x: position.x - 6, y: position.y + 20, z: position.z + 10})
          this.changeScene(this.selectedModel, this.sceneTypeObj[1], {x: position.x - 6, y: position.y + 20, z: position.z + 10})
        }
      }
    },
    // 根据数据对象中的id 在model树中选中对应的模型 (data是绑定模型上的报警数据)
    getModelObjById (model, id, data) {
      if (!model) return null
      let obj = null
      if (!model.userData && model.id === id || model.userData && model.userData.id === id) {
        if (model.userData) {
          model.userData.warningObj = data
        }
        return model
      }
      if (model.children && model.children.length) {
        for (let i = 0; i < model.children.length; i++) {
          obj = this.getModelObjById(model.children[i], id, data)
          if (obj) return obj
        }
      }
      return obj
    },
    // 更新报警状态
    updatePoliceList () {
      this.policeListLast.forEach(item => {
        if (!item) return
        const obj = this.getModelObjById(scene, item.targetId, item)
        // 移除模型的颜色
        if (!this.SELECTED || !this.SELECTED.userData || obj.userData.id !== this.SELECTED.userData.id) {
          this.modelRemoveColor(obj)
        }

        if (!obj || !obj.userData) return

        // obj.userData.cSS2DObjectShowType = 'normal'
        // 给门把手移除颜色
        // const doorHandle = obj.children.find(item => item.userData.type === 'doorHandle')
        // this.modelRemoveColor(doorHandle)
      })
      this.policeListCurrent.forEach(item => {
        if (!item) return
        const obj = this.getModelObjById(scene, item.targetId, item)
        // 如果它此时不是被选中的状态
        if (!this.SELECTED || !this.SELECTED.userData || obj.userData.id !== this.SELECTED.userData.id) {
          // 给模型添加颜色
          this.modelAddColor(obj, constant.getColor(
            // obj.userData.warningObj.alarmType === '02' ? 'warningColor' : 'tipsColor'
            'warningColor'
          ))
        }

        if (!obj || !obj.userData) return
        obj.userData.cSS2DObjectShowType = 'warning'
        // 给模型添加或修改告警标签
        const data = [{label: obj.userData.warningObj.description, color: '#f5222d'}, ...obj.userData.info]
        this.modelAddLabel(obj, 0, 2.5, 0, true, 'warning', data)


        // 给门把手添加颜色
        // let doorHandle = null
        // obj.traverse(child => {
        //   if (child.userData && child.userData.type === 'doorHandle') {
        //     doorHandle = child
        //   }
        // })
        // this.modelAddColor(doorHandle, constant.getColor(
        //   // obj.userData.warningObj.alarmType === '03' ? 'warningColor' : 'doorHandleDefaultColor'
        //   'warningColor'
        // ))
      })
      this.policeListLast = [...this.policeListCurrent]
    },
    // 给模型添加颜色
    modelAddColor (obj, color) {
      if (!obj) return
      obj.traverse(child => {
        //  && child.userData.type !== 'doorHandle'
        if (child.isMesh && child.userData && child.userData.type !== 'doorHandle') {
          child.material.color.set(color)
          // child.material.transparent = false
        }
      })
    },
    // 恢复模型本身颜色
    modelRemoveColor (obj) {
      if (!obj) return
      obj.traverse(child => {
        if (child.isMesh) {
          if (child.userData && child.userData.materialColor) {
            if (obj.userData.type === 'doorHandle') {
              return child.material.color.set(constant.getColor('doorHandleDefaultColor'))
            }
            child.material.color.setHex(child.userData.materialColor)
            // child.material.transparent = true
          }
        }
      })
    },
    // 显示模型上的卡片(type决定不同的卡片)
    modelShowCard (obj, type) {
      if (!obj || !isArray(obj.children)) return
      const currentType = type || obj.userData.cSS2DObjectShowType || 'normal'
      const cSS2DObject = obj.children.find(item => item instanceof CSS2DObject && item.userData.cSS2DObjectType === currentType)
      if (cSS2DObject) cSS2DObject.visible = true
    },
    // 隐藏模型上的卡片
    modelHideCard (obj, type) {
      if (!obj || !isArray(obj.children)) return
      const currentType = type || obj.userData.cSS2DObjectShowType || 'normal'
      const cSS2DObject = obj.children.find(item => item instanceof CSS2DObject && item.userData.cSS2DObjectType === currentType)
      if (cSS2DObject) cSS2DObject.visible = false
      // const cSS2DObjectList = obj.children.filter(item => item instanceof CSS2DObject)
      // cSS2DObjectList.forEach(item => {
      //   item.visible = false
      // })
    },
    // 查看cad图
    addCadImage () {
      const geometry = new THREE.CubeGeometry(72.4, 0.1, 23.3)
      const materialsbg = []
      this.mapMaterial[1] = new THREE.MeshBasicMaterial({
        // map: THREE.ImageUtils.loadTexture('/three/obj/BA - Copy-v1.png')
        map: THREE.ImageUtils.loadTexture('/three/obj/ELT_AUS_1991_0091_G0000_ENGT_XXXXXXXX_XX60U_D-D_20191206-Distribution-BD-07ELD114_BA.png')
      })
      this.mapMaterial[2] = new THREE.MeshBasicMaterial({
        // map: THREE.ImageUtils.loadTexture('/three/obj/BA - Copy-v1.png')
        map: THREE.ImageUtils.loadTexture('/three/obj/BA-Copy-v1.png')
      })
      this.mapMaterial[3] = new THREE.MeshBasicMaterial({
        // map: THREE.ImageUtils.loadTexture('/three/obj/BA - Copy-v1.png')
        map: THREE.ImageUtils.loadTexture('/three/obj/kt.png')
      })
      const materialColor = new THREE.MeshBasicMaterial({
        color: 'ffffff00'
      })

      materialsbg[2] = this.mapMaterial[1]
      materialsbg[0] = materialColor
      materialsbg[1] = materialColor
      materialsbg[3] = materialColor
      materialsbg[4] = materialColor
      materialsbg[5] = materialColor
      this.cadMap = new THREE.Mesh(geometry, materialsbg)
      this.cadMap.position.z = 0
      this.cadMap.visible = true
      scene.add(this.cadMap)
    },
    // 点击cad按钮
    handleOnClick (type) {
      if (this.isShowCadType === type) {
        this.isShowCadType = 0
        this.cadMap.visible = false
        return
      }
      this.isShowCadType = type
      this.cadMap.visible = true
      this.cadMap.material[2] = this.mapMaterial[type]
    },

    // 获取数据中心树形结构
    queryModel () {
      // 接口数据
      return getModel({id: this.dataCenterId}).then(res => {
        this.info = res.data
        this.currentModel[1].userData.id = res.data.id
        this.getModelTotal(this.info)
      })

      // 前端数据
      // this.info = result.querySpace()
      // this.currentModel[1].userData.id = this.info.id
      // this.getModelTotal(this.info)
    },
    // 刷新u位相关数据
    handleOnQuerySpareEquipment () {
      // 空余设备
      this.queryEquipmentList()
      // u位列表
      this.queryBack(this.currentModel[3].userData.id)
    },
    // 查询空余设备
    queryEquipmentList () {
      equipmentList({
        equipmentName: '',
        equipmentType: '01',
        pageNum: 0,
        pageSize: 0
      }).then(res => {
        this.spareEquipmentList = res.data.list
      })
    },
    // 计算模型数量
    getModelTotal (model) {
      if (!model.model) return
      this.modelTotal++
      // 着两种机柜 要加上门把手
      if (model.model === 'cabinetBOX' || model.model === 'cabinetBOXB') {
        this.modelTotal++
      }
      if (model.type !== 'cabinet' && model.children && model.children.length) {
        model.children.forEach(item => {
          this.getModelTotal(item)
        })
      }
    },
    // 更新场景二的模型显隐状态
    updateSceneTwoModelStatus () {
      // 场地隐藏
      this.space.visible = false
      // 其他的场景二隐藏
      this.modelList.cage.forEach((item, index) => {
        if (this.currentModel[2] && item.userData.id !== this.currentModel[2].userData.id) { // currentModel
          item.visible = false
        }
        if (this.currentModel[2] && item.userData.id === this.currentModel[2].userData.id) {
          item.visible = true
        }
      })
      // 显示机柜柱状图
      this.modelObjStatusTransform(this.currentModel[2], this.radioValue)
      this.modelList.cabinet.forEach(item => {
        this.modelObjStatusTransform(item, this.radioValue)
      })
    },
    // 查看模型示例
    handleOnChangeExamplesRadio (e) {
      this.space.visible = !e.target.value
      this.currentShowGrooup.visible = !e.target.value
      this.exampleUrlList.map(async (item, index) => {
        if (item.model && index !== e.target.value) item.model.visible = false
        if (index === e.target.value) {
          if (!item.model) {
            let obj = {}
            if (item.dataUrl) {
              obj = result.queryModel(item.dataUrl)
            }
            this.exampleUrlList[e.target.value].model = await this.loadModelOBJ(
              constant.getConstant(this.exampleUrlList[e.target.value].mtlUrl),
              constant.getConstant(this.exampleUrlList[e.target.value].objUrl),
              0, 0, 0,
              0, 0, 0, scene, obj)
          }
          item.model.visible = true
        }
      })
    },
    // 测试
    async loadModelTest () {
      const info = result.queryModel('TEST2')
      this.examples = await this.loadModelOBJ(constant.getConstant('CAGE_DOOR_MTL'), constant.getConstant('CAGE_DOOR_OBJ'),
      info.position.x, info.position.y, info.position.z,
        info.rotation.x, info.rotation.y, info.rotation.z, scene, info, true) // 加载场地
      // this.examples.space2.visible = false
      scene.add(this.examples)
    },
    // 加载模型
    async action () {
      // this.info = result.querySpace() // 获取场地数据
      await this.queryModel() // 获取场地数据
      // this.space = await this.loadModelOBJ(
      //   constant.getConstant('SPACE3_MTL'), constant.getConstant('SPACE3_OBJ'),
      //   info.position.x, info.position.y, info.position.z,
      //   info.rotation.x, info.rotation.y, info.rotation.z, scene, info
      // )
      this.isDevelopment && this.addCadImage() // 查看cad图
      this.space = await this.loadModelFBX(
        constant.getConstant('SPACE3_FBX'),
        this.info.position.x,
        this.info.position.y,
        this.info.position.z,
        this.info.rotation.x,
        this.info.rotation.y,
        this.info.rotation.z,
        scene,
        this.info
      )
      this.currentModel[1] = this.space
    },
    // 给3d模型添加标签
    modelAddLabel (model, x = 0, y = 7, z = 0, isChildrenAdd = false, type = 'normal', data) {
      const cardDiv = document.createElement('div')
      cardDiv.className = 'label-card'
      // cardDiv.style.width = '100px'
        // cardDiv.style.height = ''
      cardDiv.style.padding = '10px 15px'
      // cardDiv.style.border = '3px solid rgb(252, 209, 209)'
      // cardDiv.style.borderRadius = '10PX'
      // cardDiv.style.color = '#0c1e31d4'
      cardDiv.style.color = '#232323'
      cardDiv.style.fontSize = '16px'
      cardDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.74)'
      cardDiv.style.pointerEvents = 'none'

      let list = []
      list = model.userData.info
      if (data) {
        list = data
      }

      if (!list) return
      for (let i = 0; i < list.length; i++) {
        const row = document.createElement('div')
        const colOne = document.createElement('span')
        const colTwo = document.createElement('span')
        row.style.display = 'flex'
        row.style.justifyContent = 'space-between'
        row.style.margin = '2px 0'
        row.style.color = list[i].color || 'inherit'
        colOne.textContent = list[i].label
        colOne.style.marginRight = '20px'
        // eslint-disable-next-line no-eval
        // colTwo.textContent = eval('model.userData.' + list[i].value)
        colTwo.textContent = list[i].value
        row.appendChild(colOne)
        row.appendChild(colTwo)
        cardDiv.appendChild(row)
      }
      const earthLabel = new CSS2DObject(cardDiv)
      earthLabel.visible = false
      earthLabel.position.set(x, y, z)
      earthLabel.userData.cSS2DObjectType = type
      // 查找是否存在这个类型的2d标签
      let cSS2DObject = model.children.find(item => item instanceof CSS2DObject && item.userData.cSS2DObjectType === type)
      // 如果存在做赋值操作
      if (cSS2DObject) {
        // 将原有的2d标签的显隐状态赋给新创建的2d标签
        earthLabel.visible = cSS2DObject.visible
        // 将新创建的2d标签的地址引用赋值给原有的2d标签
        cSS2DObject = earthLabel
      } else {
        // 如果不存在 就添加到模型对象中
        model.add(earthLabel)
      }

      if (isChildrenAdd && model.children) {
        model.children.forEach(item => {
          if (item.isMesh) {
            this.modelAddLabel(item, x, y + 1, z, false, type, data)
          }
        })
      }
    },
    // 切换单选按钮
    handleOnChangeRadio (e) {
      this.modelObjStatusTransform(this.currentModel[2], e.target.value)
      const list = this.modelList.cabinet.filter(item => item.visible)
      list.forEach(item => {
        if (item.userData.type === 'cabinet') this.modelObjStatusTransform(item, e.target.value)
      })
    },
    // 切换多选按钮（按照类型显隐）
    handleOnChangeCheckbox (e) {
      if (e.some(item => item === 'cage')) {

      }
    },
    /**
     * 模型对象 状态转换
     * @param {String} obj - 模型对象
     * @param {String} status - 要转换的状态
     * @author md
     */
    modelObjStatusTransform (obj, status) {
      let color = 0xffffff
      let multiple = 1
      switch (status) {
      // 常态
      case 'normal':
        if (obj.isMesh) {
          obj.material.transparent = true
          obj.material.opacity = 1
          if (obj.children.find(item => item.userData.type === 'shadow')) {
            obj.children.find(item => item.userData.type === 'shadow').visible = false
          }
        } else if (obj.isGroup) {
          obj.children.map(child => {
            if (child.isMesh) {
              child.material.transparent = true
              child.material.opacity = 1
              if (child.children.find(child => child.userData.type === 'shadow')) {
                child.children.find(child => child.userData.type === 'shadow').visible = false
              }
            }
          })
        }
        return
        // 水位
      case 'waterLevel':
        color = 0x1c69d4
        multiple = obj.userData.status.water
        break
        // orange
      case 'orange':
        color = 0x998765
        multiple = obj.userData.status.temperature * 0.1
        break

      default:
        break
      }
      if (obj.isMesh) {
        obj.material.transparent = true
        obj.material.opacity = 0.2

        const shadow = obj.children.find(item => item.userData.type === 'shadow')
        if (shadow) {
          shadow.visible = true
          shadow.material.color.set(color)
          shadow.position.set(0, 0.05 * multiple, 0)
          shadow.scale.set(1, multiple, 1)
          return
        }
        // 如果不是机柜的话不创建shadow
        if (obj.userData.type !== 'cabinet') return
        // 如果没有shadow 创建一个
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.1, 0.7), new THREE.MeshBasicMaterial({
          // color: 0xe9a8a8,
          color: color,
          // transparent: true,
          opacity: 0.5
        }))
        mesh.position.set(0, 0.05 * multiple, 0)
        mesh.scale.set(1, multiple, 1)
        mesh.userData.type = 'shadow'
        obj.add(mesh)
      } else {
        obj.children.forEach(item => {
          if (!item.isMesh) return
          item.material.transparent = true
          item.material.opacity = 0.2
          const shadow = item.children.find(item => item.userData.type === 'shadow')
          if (shadow) {
            shadow.visible = true
            shadow.material.color.set(color)
            // shadow.lookAt(new THREE.Vector3(10, 1, 1))
            shadow.position.set(0, 0.05 * multiple, 0)
            shadow.scale.set(1, multiple, 1)
            return
          }
          const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.1, 0.7), new THREE.MeshBasicMaterial({
            color: color,
            opacity: 0.5
          }))
          mesh.position.set(0, 0.05 * multiple, 0)
          mesh.scale.set(1, multiple, 1)
          mesh.userData.type = 'shadow'
          item.add(mesh)
        })
      }
    },
    // 场景切换动画
    moveXYZ (
      goToScene,
      xEndControls,
      yEndControls,
      zEndControls,
      xEndCamera = xEndControls - 4,
      yEndCamera = yEndControls + 3,
      zEndCamera = zEndControls + 10,
      isBack = false
    ) {
      if (this.isFinishedChangeScene) return

      let xCurrentControls = control.target.x
      let yCurrentControls = control.target.y
      let zCurrentControls = control.target.z
      let xCurrentCamera = camera.position.x
      let yCurrentCamera = camera.position.y
      let zCurrentCamera = camera.position.z
      if (
        Math.abs(xEndControls - xCurrentControls) < 2 &&
        Math.abs(yEndControls - yCurrentControls) < 2 &&
        Math.abs(zEndControls - zCurrentControls) < 2 &&
        Math.abs(xEndCamera - xCurrentCamera) < 2 &&
        Math.abs(yEndCamera - yCurrentCamera) < 2 &&
        Math.abs(zEndCamera - zCurrentCamera) < 2
      ) {
        this.isFinishedChangeScene = true
        this.lastEvent = 'click'
        // 如果要切换到场景二 隐藏数据中心 和其余得房间
        if (goToScene === this.sceneTypeObj[2]) {
          this.updateSceneTwoModelStatus()
        }
        this.sceneType = goToScene
        return
      }
      xCurrentControls = Math.abs(xEndControls - xCurrentControls) < 2 ? xEndControls : xEndControls > xCurrentControls ? xCurrentControls + 1 : xCurrentControls - 1
      yCurrentControls = Math.abs(yEndControls - yCurrentControls) < 2 ? yEndControls : yEndControls > yCurrentControls ? yCurrentControls + 1 : yCurrentControls - 1
      zCurrentControls = Math.abs(zEndControls - zCurrentControls) < 2 ? zEndControls : zEndControls > zCurrentControls ? zCurrentControls + 1 : zCurrentControls - 1
      xCurrentCamera = Math.abs(xEndCamera - xCurrentCamera) < 2 ? xEndCamera : xEndCamera > xCurrentCamera ? xCurrentCamera + 1 : xCurrentCamera - 1
      yCurrentCamera = Math.abs(yEndCamera - yCurrentCamera) < 2 ? yEndCamera : yEndCamera > yCurrentCamera ? yCurrentCamera + 1 : yCurrentCamera - 1
      zCurrentCamera = Math.abs(zEndCamera - zCurrentCamera) < 2 ? zEndCamera : zEndCamera > zCurrentCamera ? zCurrentCamera + 1 : zCurrentCamera - 1
      control.target = new THREE.Vector3(xCurrentControls, yCurrentControls, zCurrentControls)
      camera.position.set(xCurrentCamera, yCurrentCamera, zCurrentCamera)
      control.update()
      // const xStep = (xEndControls - startX) / 10
      setTimeout(() => {
        this.moveXYZ(goToScene, xEndControls, yEndControls, zEndControls, xEndCamera, yEndCamera, zEndCamera, isBack)
      }, 16)
    },
    // 初始化事件监听
    initEventListener () {
      control.addEventListener('change', (render) => {
        this.lastEvent = 'change'
        // this.render()
      })
      this.$refs.container.addEventListener('click', (event) => {
        if (this.examplesRadioValue || !this.isFinishedChangeScene) return
        if (this.lastEvent === 'change') {
          this.lastEvent = 'click'
          return
        }
        const intersects = modelUtils.radiographicTesting(event, scene, camera, this.$refs.container)
        // 滑动变色和显示卡片信息

        // if (selected) {
        //   console.log('selected', selected)
        //   // document.body.style.cursor = 'pointer'
        //   // if (this.SELECTED !== selected.object) {
        //   // 鼠标的变换
        //   if (this.SELECTED) {
        //     // 隐藏上一次选中模型的标签
        //     if (selected.object.userData.ability[this.sceneType].slidingStroke) {
        //       const cSS2DObject = this.SELECTED.children.find(item => item instanceof CSS2DObject)
        //       if (cSS2DObject) cSS2DObject.visible = false
        //     }
        //   }

        //   // 把当前选中的模型储存起来
        //   this.SELECTED = selected.object
        //   console.log('this.SELECTED', this.SELECTED)
        //   // 显示当前模型的标签
        //   if (this.SELECTED.userData.ability[this.sceneType].slidingStroke) {
        //     console.log('into selected show card')
        //     const cSS2DObject = this.SELECTED.children.find(item => item instanceof CSS2DObject)
        //     if (cSS2DObject) cSS2DObject.visible = true
        //     console.log('cSS2DObject', cSS2DObject)
        //   }
        // }
        // if (selected.object.userData.type === 'room') {
        //   this.currentObject.room = selected.object
        // }
        // if (selected.object.userData.type === 'cage') {
        //   this.currentObject.cage = selected.object
        // }

        // } else {
          // document.body.style.cursor = 'auto'
          // this.modelRemoveSelectedStatus()
        // }
        // 在场景一中点击机柜通道
        // if (this.sceneType === this.sceneTypeObj[1] && selected.object.userData.ability[this.sceneType].slidingStroke) {
        //   // this.currentObject.cages = intersects.filter(item => item.object &&
        //   //   item.object.userData &&
        //   //   item.object.userData.type === this.sceneTypeObj[3] &&
        //   //   item.object.userData.ability &&
        //   //   item.object.userData.ability[this.sceneType] &&
        //   //   item.object.userData.ability[this.sceneType].slidingStroke)
        //   console.log('click cage at scene one')
        //   this.goToSceneThree()
        //   return
        // }


        const selectedRoom = intersects.find(item =>
          item.object &&
          item.object.userData &&
          item.object.userData.type === this.sceneTypeObj[2]
          //  &&
          // item.object.userData.status.states
        )
        const selected = intersects.find(item =>
          item.object &&
          item.object.userData &&
          item.object.userData.type === this.sceneTypeObj[3] &&
          this.sceneType === this.sceneTypeObj[2] &&
          item.object.userData.pId === this.currentModel[2].userData.id
          //  &&
          // item.object.userData.status.states
        )
        if ( // 在场景一中点击场景二的节点模型（每个场景只有一个节点模型，例如场景一中的节点模型是场地space）
          selectedRoom &&
          this.isFinishedChangeScene &&
          this.sceneType === this.sceneTypeObj[1] &&
          selectedRoom.object.userData.status.states
        ) { // 选中房间并且场景切换动画已经结束并且在场景一中 切换到场景二
          this.currentModel[2] = selectedRoom.object
          this.changeScene(selectedRoom.object, this.sceneTypeObj[2])
        } else if ( // 在场景二中点击场景三的节点模型
          selected &&
          this.isFinishedChangeScene &&
          selected.object.userData.status.states

        ) {
          this.currentModel[3] = selected.object
          this.changeScene(selected.object, this.sceneTypeObj[3])
        } else { // 其余的点击情况 终止动画
          this.isFinishedChangeScene = true
        }
      }, false)
      // return
      // mousemove
      this.$refs.container.addEventListener('mousemove', (event) => {
        if (this.loadPercentage < 100) {
          return
        }
        if (this.examplesRadioValue || !this.isFinishedChangeScene) return
        const intersects = modelUtils.radiographicTesting(event, scene, camera, this.$refs.container)
        // 滑动变色
        const selected = intersects.find((item, index) =>
          item.object &&
          item.object.visible &&
          item.object.userData &&
          (this.sceneType === this.sceneTypeObj[2] && item.object.userData.pId === this.currentModel[2].userData.id || this.sceneType !== this.sceneTypeObj[2]) &&
          item.object.userData.ability &&
          item.object.userData.ability[this.sceneType] &&
          item.object.userData.ability[this.sceneType].slidingDiscoloration
        )
        if (selected) {
          // document.body.style.cursor = 'pointer'
          if (this.SELECTED !== selected.object) {
            // 鼠标的变换
            if (this.SELECTED) {
              // 恢复上一次选中模型的颜色
              if (this.SELECTED.userData.ability[this.sceneType] && this.SELECTED.userData.ability[this.sceneType].slidingDiscoloration) {
                // this.modelRemoveColor(this.SELECTED)
                this.SELECTED.material.color.setHex(this.SELECTED.currentHex) // 恢复模型本身颜色
                this.SELECTED.material.opacity = this.SELECTED.currentOpacity // 恢复透明度
                this.SELECTED.material.transparent = this.SELECTED.currentTransparent
              }
            }
            // 把当前选中的模型储存起来
            this.SELECTED = selected.object

            if (this.SELECTED.userData.ability[this.sceneType] && this.SELECTED.userData.ability[this.sceneType].slidingDiscoloration) {
              // 把模型的颜色和透明度储存起来
              this.SELECTED.currentHex = this.SELECTED.material.color.getHex()
              // console.log('this.SELECTED.currentHex', this.SELECTED.currentHex)
              this.SELECTED.currentOpacity = this.SELECTED.material.opacity
              this.SELECTED.currentTransparent = this.SELECTED.material.transparent
              // 当前模型变色
              // this.modelAddColor(this.SELECTED, constant.getColor('slidingDiscolorationColor'))
              this.SELECTED.material.color.set(constant.getColor('slidingDiscolorationColor'))
              this.SELECTED.material.transparent = true
              this.SELECTED.material.opacity = constant.getColor('slidingDiscolorationTransparent') // 设置不透明度
            }
          }
        } else {
          // document.body.style.cursor = 'auto'
          this.modelRemoveSelectedStatus()
        }

        // item.object.parent.visible &&
        // 滑动显示卡片信息
        const selectedShowLabel = intersects.find((item, index) =>
        item.object &&
        item.object.visible &&
        item.object.userData &&
        (this.sceneType === this.sceneTypeObj[2] && item.object.userData.pId === this.currentModel[2].userData.id || this.sceneType !== this.sceneTypeObj[2]) &&
        item.object.userData.ability &&
        item.object.userData.ability[this.sceneType] &&
        item.object.userData.ability[this.sceneType].slidingShowLabel)
        if (selectedShowLabel) {
          // document.body.style.cursor = 'pointer'
          if (this.SELECTED_SHOW_LABEL !== selectedShowLabel.object) {
            // 鼠标的变换
            if (this.SELECTED_SHOW_LABEL) {
              // 隐藏上一次选中模型的标签
              if (this.SELECTED_SHOW_LABEL.userData.ability[this.sceneType].slidingShowLabel) {
                this.modelHideCard(this.SELECTED_SHOW_LABEL)
              }
            }

            // 把当前选中的模型储存起来
            this.SELECTED_SHOW_LABEL = selectedShowLabel.object
            // 显示当前模型的标签
            if (this.SELECTED_SHOW_LABEL.userData.ability[this.sceneType] && this.SELECTED_SHOW_LABEL.userData.ability[this.sceneType].slidingShowLabel) {
              this.modelShowCard(this.SELECTED_SHOW_LABEL)
            }
          }
          if (this.selectedModel) {
            // 定位的模型卡片隐藏
            this.modelHideCard(this.selectedModel)
            // 定位的模型颜色恢复
            this.modelRemoveColor(this.selectedModel)
            this.selectedModel = null
          }
        } else {
          // document.body.style.cursor = 'auto'
          this.modelRemoveSelectedStatus()
        }
        return
        // 滑动边框变亮
        const selectedBorder = intersects.find(item =>
          item.object &&
          item.object.userData &&
          item.object.userData.ability &&
          item.object.userData.ability[this.sceneType] &&
          item.object.userData.ability[this.sceneType].slidingStroke
        )
        if (selectedBorder) {
          this.selectedList = []
          // if (selectedBorder.object.parent.userData.ability[this.sceneType].slidingStroke) {
          //   this.selectedList.push(selectedBorder.object.parent)
          // } else {
            this.selectedList.push(selectedBorder.object)
          // }

          this.outlinePass.selectedObjects = this.selectedList
        } else {
          this.outlinePass.selectedObjects = []
        }

        // this.render()
      }, false)
      window.addEventListener('resize', () => {
        const width = window.innerWidth
				const height = window.innerHeight

				camera.aspect = width / height
				camera.updateProjectionMatrix()

        renderer.setSize(width, height)
        labelRenderer.setSize(width, height)
        this.render()
      })
    },
    // 模型状态移除
    modelRemoveSelectedStatus () {
      if (this.SELECTED) {
        if (this.SELECTED.userData.ability && this.SELECTED.userData.ability[this.sceneType].slidingDiscoloration) {
          this.SELECTED.material.color.setHex(this.SELECTED.currentHex)
          this.SELECTED.material.opacity = this.SELECTED.currentOpacity // 恢复原来的透明度透明
          this.SELECTED.material.transparent = this.SELECTED.currentTransparent
        }
      }
      if (this.SELECTED_SHOW_LABEL) {
        this.modelHideCard(this.SELECTED_SHOW_LABEL)
      }
      this.SELECTED = null
      this.SELECTED_SHOW_LABEL = null
    },
    // 切换场景
    changeScene (model, goalSceneType, rotation) {
      this.modelRemoveSelectedStatus()
      this.isFinishedChangeScene = false

      const startControl = {
        x: control.target.x,
        y: control.target.y,
        z: control.target.z
      }
      const endControl = model.getWorldPosition() || {x: 0, y: 0, z: 0}
      const startCamera = {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z
      }
      const endRotation = {
        [this.sceneTypeObj[1]]: {
          x: endControl.x - 30,
          y: endControl.y + 50,
          z: endControl.z + 50
        },
        [this.sceneTypeObj[2]]: {
          x: endControl.x - 4,
          y: endControl.y + 3,
          z: endControl.z + 10
        },
        [this.sceneTypeObj[3]]: {
          x: endControl.x - 4,
          y: endControl.y + 3,
          z: endControl.z + 10
        }
      }
      const endCamera = rotation || endRotation[goalSceneType] || {
          x: endControl.x - 4,
          y: endControl.y + 3,
          z: endControl.z + 10
        }
      const start = new Date().getTime()
      console.log('start', start)
      modelUtils.controlAndCameraPosition(
        control,
        startControl,
        endControl,
        camera,
        startCamera,
        endCamera
      ).then(res => {
        const end = new Date().getTime()
        console.log('end', end)
        console.log('used time: ', end - start)
        this.isFinishedChangeScene = true
        this.lastEvent = 'click'
        // 如果要切换到场景二 隐藏数据中心 和其余得房间
        if (goalSceneType === this.sceneTypeObj[2]) {
          this.updateSceneTwoModelStatus()
        }
        this.sceneType = goalSceneType
        console.log('controlAndCameraPosition')
      })
      if (goalSceneType === this.sceneTypeObj[1]) {
        this.modelList.room.forEach(item => {
          // item.geometry.parameters.height = 0
          // item.geometry.parameters.width = 0
          // item.geometry.parameters.depth = 0
          // item.scale.set(0.01, 0.01, 0.01)
          item.visible = true
           console.log('item123', item)
        })
        control.maxDistance = 125
        control.minDistance = 1
        this.sceneType = this.sceneTypeObj[1]
        this.space.visible = true
        this.modelList.cage.forEach(item => {item.visible = true})
        this.modelObjStatusTransform(this.currentModel[2], 'normal')
        this.modelList.cabinet.forEach(item => {
          if (item.userData.type === 'cabinet') this.modelObjStatusTransform(item, 'normal')
        })
      } else {
        this.modelList.room.forEach(item => {
          // item.geometry.parameters.height = 0
          // item.geometry.parameters.width = 0
          // item.geometry.parameters.depth = 0
          // item.scale.set(0.01, 0.01, 0.01)
          item.visible = false
           console.log('item123', item)
        })
        this.modelList.cage.forEach(item => {
          // item.scale.set(100, 100, 100)
        })
      }
    },
    // 设置位置和旋转弧度
    setPositionAndRotation (model, positionX = 0, positionY = 0, positionZ = 0, rotationX = 0, rotationY = 0, rotationZ = 0) {
      if (model.isGroup || model.isMesh || model.isScene) {
        model.position.set(positionX * constant.getConstant('SIZE_MULTIPLE'), positionY * constant.getConstant('SIZE_MULTIPLE'), positionZ * constant.getConstant('SIZE_MULTIPLE'))
        model.rotation.set(rotationX * constant.getConstant('SIZE_MULTIPLE'), rotationY * constant.getConstant('SIZE_MULTIPLE'), rotationZ * constant.getConstant('SIZE_MULTIPLE'))
      }
      return model
    },
    // 加载children
    async loadChildrenModel (currentModel) {
      if (!currentModel.userData || !currentModel.userData.children || !currentModel.userData.children.length) return
      for (let i = 0; i < currentModel.userData.children.length; i++) {
        const model = currentModel.userData.children[i]
        let position = {
          x: 0,
          y: 0,
          z: 0
        }
        let rotation = {
          x: 0,
          y: 0,
          z: 0
        }
        if (model.position) {
          position = model.position
        }
        if (model.rotation) {
          rotation = model.rotation
        }
        let isAddChildren = true
        // 机柜下面不摆放模型
        if (model.type === 'cabinet') {
          isAddChildren = false
        }

        // const obj = null
        switch (model.model) {
          case 'room1':
          case 'room2':
          case 'room3':
            this.loadModelOBJ('', '', position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, currentModel, model, true, true)
            break
          // 机柜通道1200
          case 'cageA':
            this.loadModelOBJ(constant.getConstant('CAGE_CAGE1200_MTL'), constant.getConstant('CAGE_CAGE1200_OBJ'), position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, currentModel, model, isAddChildren)
            // this.loadModelGLTF(constant.getConstant('CAGE_GLB'), position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, currentModel, model)
            break
          // 机柜通道1800
          case 'cageB':
            this.loadModelOBJ(constant.getConstant('CAGE_CAGE1800_MTL'), constant.getConstant('CAGE_CAGE1800_OBJ'), position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, currentModel, model, isAddChildren)
            // this.loadModelGLTF(constant.getConstant('CAGE_GLB'), position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, currentModel, model)
            break
          // FD机柜
          case 'cabinetFD':
            // obj = this.cabinetFD.clone()
            // obj = await this.loadModelOBJ(constant.getConstant('CABINET_FD_MTL'), constant.getConstant('CABINET_FD_OBJ'), position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, currentModel, model)
            this.loadModelOBJ(constant.getConstant('CABINET_FD_MTL'), constant.getConstant('CABINET_FD_OBJ'), position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, currentModel, model, isAddChildren)
            break
          // 空调
          case 'cabinetAIRCONDITIONING':
            // obj = this.cabinetUPS.clone()
            this.loadModelOBJ(constant.getConstant('CABINET_AIRCONDITIONING_MTL'), constant.getConstant('CABINET_AIRCONDITIONING_OBJ'), position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, currentModel, model, isAddChildren)
            break
          // 空调 u型 1.4
          case 'cabinetAIRCONDITIONING4':
            // obj = this.cabinetAIRCONDITIONING4.clone()
            this.loadModelOBJ(constant.getConstant('CABINET_AIRCONDITIONING4_MTL'), constant.getConstant('CABINET_AIRCONDITIONING4_OBJ'), position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, currentModel, model, isAddChildren)
            break
          // 空调 u型 1.7 比较大
          case 'cabinetAIRCONDITIONING7':
            // obj = this.cabinetAIRCONDITIONING7.clone()
            this.loadModelOBJ(constant.getConstant('CABINET_AIRCONDITIONING7_MTL'), constant.getConstant('CABINET_AIRCONDITIONING7_OBJ'), position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, currentModel, model, isAddChildren)
            break
          // BAS 配电柜 2.4尺寸
          case 'cabinetBASBIG':
            // obj = this.cabinetBAS.clone()
            this.loadModelOBJ(constant.getConstant('CABINET_BASBIG_MTL'), constant.getConstant('CABINET_BASBIG_OBJ'), position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, currentModel, model, isAddChildren)
            // this.loadModelGLTF(constant.getConstant('CABINET_BAS_GLTF'), position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, currentModel, model)
            break
          // BAS 配电柜
          case 'cabinetBAS':
            // obj = this.cabinetBAS.clone()
            this.loadModelOBJ(constant.getConstant('CABINET_BAS_MTL'), constant.getConstant('CABINET_BAS_OBJ'), position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, currentModel, model, isAddChildren)
            // this.loadModelGLTF(constant.getConstant('CABINET_BAS_GLTF'), position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, currentModel, model)
            break
          // BAS 配电柜02
          case 'cabinetBAS02':
            // obj = this.cabinetBAS.clone()
            this.loadModelOBJ(constant.getConstant('CABINET_BAS02_MTL'), constant.getConstant('CABINET_BAS02_OBJ'), position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, currentModel, model, isAddChildren)
            // this.loadModelGLTF(constant.getConstant('CABINET_BAS_GLTF'), position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, currentModel, model)
            break
          // UPS
          case 'cabinetUPS':
            // obj = this.cabinetUPS.clone()
            this.loadModelOBJ(constant.getConstant('CABINET_UPS_MTL'), constant.getConstant('CABINET_UPS_OBJ'), position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, currentModel, model, isAddChildren)
            break
          // BAT
          case 'cabinetBAT':
            // obj = this.cabinetBAT.clone()
            this.loadModelOBJ(constant.getConstant('CABINET_BAT_MTL'), constant.getConstant('CABINET_BAT_OBJ'), position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, currentModel, model, isAddChildren)
            break
          // 机柜
          case 'cabinetBOX':
            // obj = this.cabinetBOX.clone()
            this.loadModelOBJ(constant.getConstant('CABINET_BOX_MTL'), constant.getConstant('CABINET_BOX_OBJ'), position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, currentModel, model, isAddChildren)
            break
          // 机柜 无挡板
          case 'cabinetBOXB':
            // obj = this.cabinetBOXB.clone()
            this.loadModelOBJ(constant.getConstant('CABINET_BOXB_MTL'), constant.getConstant('CABINET_BOXB_OBJ'), position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, currentModel, model, isAddChildren)
            break
          // 存储设备
          case 'cabinetSTORAGE':
            // obj = this.cabinetCABINET_STORAGE_MTL.clone()
            this.loadModelOBJ(constant.getConstant('CABINET_STORAGE_MTL'), constant.getConstant('CABINET_STORAGE_OBJ'), position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, currentModel, model, isAddChildren)
            break
          // 制冷设备
          case 'cabinetREFRIGERATION':
            // obj = this.cabinetCABINET_STORAGE_MTL.clone()
            this.loadModelOBJ(constant.getConstant('CABINET_REFRIGERATION_MTL'), constant.getConstant('CABINET_REFRIGERATION_OBJ'), position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, currentModel, model, isAddChildren)
            break
          // 消防设备
          case 'cabinetFIREFIGHTING':
            // obj = this.cabinetFIREFIGHTING_STORAGE_MTL.clone()
            this.loadModelOBJ(constant.getConstant('CABINET_FIREFIGHTING_MTL'), constant.getConstant('CABINET_FIREFIGHTING_OBJ'), position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, currentModel, model, isAddChildren)
            break
          default:
            break
        }
      }
    },
    initStats () {
      this.Stats.domElement.style.position = 'absolute'
      this.Stats.domElement.style.left = '400px'
      this.Stats.domElement.style.top = '40px'
      this.Stats.showPanel(0)
      this.$refs.container.appendChild(this.Stats.dom)
    },
    // 初始化加载器
    initLoader () {
      this.gltfLoader = new GLTFLoader()
      this.fbxLoader = new FBXLoader()
      this.mtlLoader = new MTLLoader()
    },
    // 初始化后期制作
    initGUI () {
      const params = {
				edgeStrength: 3, // 边缘强度 ，默认3.0，最基础的属性，后面4个配置项都基于该项
				edgeGlow: 0.0, // 边缘流， 默认0.0
				edgeThickness: 1.0, // 边缘厚度，默认1.0
				pulsePeriod: 0, // 闪烁频率 ，默认0 ，值越大频率越低
				// rotate: false,
				usePatternTexture: false // 选中对象使用图案纹理，默认false，不使用
			}
      const gui = new GUI({ width: 300 })

			gui.add(params, 'edgeStrength', 0.01, 10).onChange(value => {
        this.outlinePass.edgeStrength = Number(value)
			})

			gui.add(params, 'edgeGlow', 0.0, 10).onChange(value => {
        this.outlinePass.edgeGlow = Number(value)
			})

			gui.add(params, 'edgeThickness', 1, 10).onChange(value => {
        this.outlinePass.edgeThickness = Number(value)
			})

			gui.add(params, 'pulsePeriod', 0.0, 10).onChange(value => {
        this.outlinePass.pulsePeriod = Number(value)
			})

			// gui.add(params, 'rotate')

			gui.add(params, 'usePatternTexture').onChange(value => {
        this.outlinePass.usePatternTexture = value
			})

			function Configuration () {
				this.visibleEdgeColor = '#ffffff' // 边缘可见部分发光颜色，默认#FFFFFF
				this.hiddenEdgeColor = '#190a05' // 边缘遮挡部分发光颜色，默认#190A05
			}

			const conf = new Configuration()

			gui.addColor(conf, 'visibleEdgeColor').onChange(value => {
        this.outlinePass.visibleEdgeColor.set(value)
			})

			gui.addColor(conf, 'hiddenEdgeColor').onChange(value => {
        this.outlinePass.hiddenEdgeColor.set(value)
      })
      this.$refs.card.appendChild(gui.domElement)
    },
    // 初始化组
    initGroup () {
      this.currentShowGrooup = new THREE.Group()
    },
    // 初始化后期处理（着色器）
    initEffectComposer () {
      this.composer = new EffectComposer(renderer)
      const renderPass = new RenderPass(scene, camera)
      this.composer.addPass(renderPass)
      const containerWidth = document.documentElement.clientWidth - this.gutterGutter * 2
      const containerHeight = document.documentElement.clientHeight - 65 - 40 - this.gutterGutter * 2
      this.outlinePass = new OutlinePass(new THREE.Vector2(
        window.innerWidth,
        window.innerHeight
        // window.innerWidth,
        // window.innerHeight
      ), scene, camera)
      // this.outlinePass.edgeStrength = 4 // 边缘强度 ，默认3.0，最基础的属性，后面4个配置项都基于该项
      // this.outlinePass.edgeGlow = 200 // 边缘流， 默认0.0
      // this.outlinePass.edgeThickness = 3 // 边缘厚度，默认1.0
      // this.outlinePass.visibleEdgeColor.set('#f01a1a')
      // this.outlinePass.hiddenEdgeColor.set('#ff3939')
      // this.outlinePass.hiddenEdgeColor = 0x98dd8f
      // const filmPass = new FilmPass(0.8, 1, 256, false)
      // this.composer.addPass(filmPass)
      this.composer.addPass(this.outlinePass)

      const fXAAShaderPass = new ShaderPass(FXAAShader)
      fXAAShaderPass.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight)
      // fXAAShaderPass.uniforms['resolution'].value.set(
      //   1 / containerWidth,
      //   1 / containerHeight
      // )
      fXAAShaderPass.renderToScreen = true
      this.composer.addPass(fXAAShaderPass)
    },
    // 加载模型GLTF /three/gltf/cj.gltf
    loadModelGLTF (
      url,
      currentPositionX = 0,
      currentPositionY = 0,
      currentPositionZ = 0,
      currentRotationX = 0,
      currentRotationY = 0,
      currentRotationZ = 0,
      parent = scene,
      currentUserData,
      isAddChildren = true,
      isRoom = false
    ) {
      const userData = {...currentUserData}
      const positionX = isNaN(Number(currentPositionX)) ? 0 : Number(currentPositionX)
      const positionY = isNaN(Number(currentPositionY)) ? 0 : Number(currentPositionY)
      const positionZ = isNaN(Number(currentPositionZ)) ? 0 : Number(currentPositionZ)
      const rotationX = isNaN(Number(currentRotationX)) ? 0 : Number(currentRotationX)
      const rotationY = isNaN(Number(currentRotationY)) ? 0 : Number(currentRotationY)
      const rotationZ = isNaN(Number(currentRotationZ)) ? 0 : Number(currentRotationZ)
      // mtlLoader.setCrossOrigin('Anonymous')
      if (isRoom) {
        this.currentModelNumber++
        const roomSize = constant.getRoomSize(userData.model)
        const room = new THREE.Mesh(new THREE.BoxGeometry(roomSize.x, roomSize.y, roomSize.z), new THREE.MeshPhongMaterial({
          color: 0x1c69d4,
          transparent: true,
          opacity: 0
        }))
        userData.ability = constant.getStatusObj(userData.type)
        room.userData = userData
        this.setPositionAndRotation(room, positionX, positionY / 2, positionZ, rotationX, rotationY, rotationZ)
        // this.setPositionAndRotation(room, 0, 0.05, 0)
        this.modelAddLabel(room, 0, 3, 0, true)
        // this.currentShowGrooup.add(room)
        // group.visible = false
         if (!this.modelList[userData.type]) {
          this.modelList[userData.type] = []
        }
        this.modelList[userData.type].push(room)
        scene.add(room)
        // this.currentShowGrooup = group
        // this.groupSceneOne.add(group)
        this.loadChildrenModel(room)
        return
      }
      return new Promise((resolve) => {
        this.gltfLoader.load(url, (gltf) => {
          // gltf.scene.traverse(child => {
          //   if (child.isMesh) {
          //     child.material.emissive = child.material.color
          //     child.material.emissiveMap = child.material.map
          //   }
          // })
          this.currentModelNumber++
          const object = gltf.scene
          userData.ability = constant.getStatusObj(userData.type)
          object.userData = userData
          // 给item.userData也赋值 保证射线检测的返回值能拿到userData数据
          object.children.forEach(item => {item.userData = userData})
          object.traverse(child => {
            if (child.isMesh) {
              child.material.emissive = child.material.color
              child.material.emissiveMap = child.material.map
              // 储存自己的颜色
              child.userData.materialColor = child.material.color.getHex()
              // child.material.side = THREE.DoubleSide
              // child.material.transparent = true
            }
          })

          // object.children[0].material.transparent = true
          this.setPositionAndRotation(object, positionX, positionY, positionZ, rotationX, rotationY, rotationZ)

          // states 0 未启用   1 启用
          // 给未启用状态 添加颜色
          if (userData.status && !userData.status.states) {
            this.modelAddColor(object, constant.getColor('unavailableStatus'))
          }
          // if (userData.type === 'cabinet') {
          this.modelAddLabel(object, 0, 2.5, 0, true)
          // }
          if (userData.model === 'cabinetBOX' || userData.model === 'cabinetBOXB') {
            object.children[0].material.transparent = true
            this.loadModelOBJ(
              constant.getConstant('CABINET_BOX_DOOR_HANDLE_MTL'),
              constant.getConstant('CABINET_BOX_DOOR_HANDLE_OBJ'),
              0.52,
              0,
              0.59,
              0,
              0,
              0,
              object,
              {
                type: 'doorHandle'
              },
              false
            )
          }
          if (userData.type === 'cage') {
            this.modelAddLabel(object, 0, 3, 0, true)
          }
          if (userData.type === 'space') {
            this.space = object
            this.loadModelOBJ(
              constant.getConstant('SPACE_WALL_MTL'),
              constant.getConstant('SPACE_WALL_OBJ'),
              0,
              0,
              0,
              0,
              0,
              0,
              object,
              {
                type: 'spaceWall'
              },
              false
            )
          }
          if (userData.model === 'cabinetAIRCONDITIONING7') {
            object.scale.set(1, 0.81, 1)
          }
          if (userData.model === 'cabinetBOXB') {
            object.children[0].material.transparent = true
          }
          if (userData.model === 'cabinetBOX') {
            object.children[0].material.transparent = true
          }
          if (userData.model === 'cabinetBAS') {
          }
          if (!this.modelList[userData.type]) {
            this.modelList[userData.type] = []
          }
          this.modelList[userData.type].push(object)
          // 添加到它的父级
          parent.add(object)
          // 继续加载它的 children
          if (isAddChildren) {
            this.loadChildrenModel(object)
          }

          resolve(gltf.scene)
        }, undefined, function (error) {
          console.error(error)
        })
      })
    },
    // 加载模型OBJ
    loadModelOBJ (
      mtlUrl,
      objUrl,
      currentPositionX = 0,
      currentPositionY = 0,
      currentPositionZ = 0,
      currentRotationX = 0,
      currentRotationY = 0,
      currentRotationZ = 0,
      parent = scene,
      currentUserData,
      isAddChildren = true,
      isRoom = false
    ) {
      const userData = {...currentUserData}
      const positionX = isNaN(Number(currentPositionX)) ? 0 : Number(currentPositionX)
      const positionY = isNaN(Number(currentPositionY)) ? 0 : Number(currentPositionY)
      // if (parent.userData.type === 'space') {
      //   positionY = positionY + 0.02
      // }
      const positionZ = isNaN(Number(currentPositionZ)) ? 0 : Number(currentPositionZ)
      const rotationX = isNaN(Number(currentRotationX)) ? 0 : Number(currentRotationX)
      const rotationY = isNaN(Number(currentRotationY)) ? 0 : Number(currentRotationY)
      const rotationZ = isNaN(Number(currentRotationZ)) ? 0 : Number(currentRotationZ)
      // mtlLoader.setCrossOrigin('Anonymous')
      if (isRoom) {
        this.currentModelNumber++
        userData.ability = constant.getStatusObj(userData.type)
        const box = new THREE.Mesh()
        this.setPositionAndRotation(box, positionX, positionY / 2, positionZ, rotationX, rotationY, rotationZ)
        box.userData = userData
        const roomSize = constant.getRoomSize(userData.model)
        const room = new THREE.Mesh(new THREE.BoxGeometry(roomSize.x, roomSize.y, roomSize.z), new THREE.MeshPhongMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0
        }))


        room.userData = userData
        // this.setPositionAndRotation(room, 0, 0.05, 0)
        this.modelAddLabel(room, 0, 3, 0, true)
        // this.currentShowGrooup.add(room)
        // group.visible = false
        if (!this.modelList[userData.type]) {
          this.modelList[userData.type] = []
        }
        this.modelList[userData.type].push(room)
        scene.add(box)
        box.add(room)
        // this.currentShowGrooup = group
        // this.groupSceneOne.add(group)
        this.loadChildrenModel(box)
        return
      }
      return new Promise((resolve) => {
        this.mtlLoader.load(mtlUrl, materials => {
          const objLoader = new OBJLoader()
          if (userData.type !== 'doorHandle') {
            objLoader.setMaterials(materials)
          }
          resolve(new Promise((resolve) => {
            objLoader.load(objUrl, object => {
              this.currentModelNumber++
              userData.ability = constant.getStatusObj(userData.type)
              object.userData = userData
              // 给item.userData也赋值 保证射线检测的返回值能拿到userData数据
              object.children.forEach(item => {item.userData = userData})
              object.traverse(child => {
                if (child.isMesh) {
                  if (userData.type === 'doorHandle') {
                    child.material.color.set(constant.getColor('doorHandleDefaultColor'))
                  }
                  child.material.emissive = child.material.color
                  child.material.emissiveMap = child.material.map
                  // 储存自己的颜色
                  child.userData.materialColor = child.material.color.getHex()
                  // child.material.side = THREE.DoubleSide
                  // child.material.transparent = true
                }
              })
              // object.children[0].material.transparent = true
              this.setPositionAndRotation(object, positionX, positionY, positionZ, rotationX, rotationY, rotationZ)
              // states 0 未启用   1 启用
              // 给未启用状态 添加颜色
              if (userData.status && !userData.status.states) {
                this.modelAddColor(object, constant.getColor('unavailableStatus'))
              }
              // if (userData.type === 'cabinet') {
              this.modelAddLabel(object, 0, 2.5, 0, true)
              // }
              if (userData.model === 'cabinetBOX' || userData.model === 'cabinetBOXB') {
                object.children[0].material.transparent = true
                this.loadModelOBJ(
                  constant.getConstant('CABINET_BOX_DOOR_HANDLE_MTL'),
                  constant.getConstant('CABINET_BOX_DOOR_HANDLE_OBJ'),
                  0.52,
                  0,
                  0.59,
                  0,
                  0,
                  0,
                  object,
                  {
                    type: 'doorHandle'
                  },
                  false
                )
              }
              if (userData.type === 'cage') {
                this.modelAddLabel(object, 0, 3, 0, true)
              }
              if (userData.type === 'space') {
                this.space = object
                this.loadModelOBJ(
                  constant.getConstant('SPACE_WALL_MTL'),
                  constant.getConstant('SPACE_WALL_OBJ'),
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  object,
                  {
                    type: 'spaceWall'
                  },
                  false
                )
              }
              // if (userData.type === 'spaceWall') {
              //   console.log('object spaceWall 2', object)
              //   object.scale.set(0.98, 1, 0.98)
              // }
              if (userData.model === 'cabinetAIRCONDITIONING4') {
                object.scale.set(1, 0.81, 1)
              }
              if (userData.model === 'cabinetAIRCONDITIONING7') {
                object.scale.set(1, 0.81, 1)
              }
              if (!this.modelList[userData.type]) {
                this.modelList[userData.type] = []
              }
              this.modelList[userData.type].push(object)
              // 添加到它的父级
              parent.add(object)
              // 继续加载它的 children
              if (isAddChildren) {
                this.loadChildrenModel(object)
              }

              resolve(object)
            })
          }))
        })
      })
    },
    // 加载模型FBX
    loadModelFBX (
      url,
      currentPositionX = 0,
      currentPositionY = 0,
      currentPositionZ = 0,
      currentRotationX = 0,
      currentRotationY = 0,
      currentRotationZ = 0,
      parent = scene,
      currentUserData,
      isAddChildren = true,
      isRoom = false
    ) {
      const userData = {...currentUserData}
      const positionX = isNaN(Number(currentPositionX)) ? 0 : Number(currentPositionX)
      const positionY = isNaN(Number(currentPositionY)) ? 0 : Number(currentPositionY)
      const positionZ = isNaN(Number(currentPositionZ)) ? 0 : Number(currentPositionZ)
      const rotationX = isNaN(Number(currentRotationX)) ? 0 : Number(currentRotationX)
      const rotationY = isNaN(Number(currentRotationY)) ? 0 : Number(currentRotationY)
      const rotationZ = isNaN(Number(currentRotationZ)) ? 0 : Number(currentRotationZ)
      // mtlLoader.setCrossOrigin('Anonymous')
      if (isRoom) {
        this.currentModelNumber++
        const roomSize = constant.getRoomSize(userData.model)
        const room = new THREE.Mesh(new THREE.BoxGeometry(roomSize.x, roomSize.y, roomSize.z), new THREE.MeshPhongMaterial({
          color: 0x1c69d4,
          transparent: true,
          opacity: 0
        }))
        userData.ability = constant.getStatusObj(userData.type)
        room.userData = userData
        this.setPositionAndRotation(room, positionX, positionY / 2, positionZ, rotationX, rotationY, rotationZ)
        // this.setPositionAndRotation(room, 0, 0.05, 0)
        this.modelAddLabel(room, 0, 3, 0, true)
        // this.currentShowGrooup.add(room)
        // group.visible = false
        if (!this.modelList[userData.type]) {
          this.modelList[userData.type] = []
        }
        this.modelList[userData.type].push(room)
        scene.add(room)
        // this.currentShowGrooup = group
        // this.groupSceneOne.add(group)
        this.loadChildrenModel(room)
        return
      }
      return new Promise((resolve) => {
        this.fbxLoader.load(url, (object) => {// 加载路径fbx文件
          this.currentModelNumber++
          userData.ability = constant.getStatusObj(userData.type)
          object.userData = userData
          // 给item.userData也赋值 保证射线检测的返回值能拿到userData数据
          object.children.forEach(item => {item.userData = userData})
          object.traverse(child => {
            if (child.isMesh) {
              // child.material.emissive = child.material.color
              // child.material.emissiveMap = child.material.map
              // 储存自己的颜色
              child.userData.materialColor = child.material.color.getHex()
              child.material.side = THREE.DoubleSide
              // child.material.transparent = true
            }
          })
          // object.children[0].material.transparent = true
          this.setPositionAndRotation(object, positionX, positionY, positionZ, rotationX, rotationY, rotationZ)

          // states 0 未启用   1 启用
          // 给未启用状态 添加颜色
          if (userData.status && !userData.status.states) {
            this.modelAddColor(object, constant.getColor('unavailableStatus'))
          }
          // if (userData.type === 'cabinet') {
          this.modelAddLabel(object, 0, 2.5, 0, true)
          // }
          if (userData.model === 'cabinetBOX' || userData.model === 'cabinetBOXB') {
            object.children[0].material.transparent = true
            this.loadModelOBJ(
              constant.getConstant('CABINET_BOX_DOOR_HANDLE_MTL'),
              constant.getConstant('CABINET_BOX_DOOR_HANDLE_OBJ'),
              0.52,
              0,
              0.59,
              0,
              0,
              0,
              object,
              {
                type: 'doorHandle'
              },
              false
            )
          }
          if (userData.type === 'cage') {
            this.modelAddLabel(object, 0, 3, 0, true)
          }
          if (userData.type === 'space') {
            this.space = object
            this.loadModelOBJ(
              constant.getConstant('SPACE_WALL_MTL'),
              constant.getConstant('SPACE_WALL_OBJ'),
              0,
              0,
              0,
              0,
              0,
              0,
              object,
              {
                type: 'spaceWall'
              },
              false
            )
          }
          if (userData.model === 'cabinetAIRCONDITIONING7') {
            object.scale.set(1, 0.81, 1)
          }
          if (userData.model === 'cabinetBOXB') {
            object.children[0].material.transparent = true
          }
          if (userData.model === 'cabinetBOX') {
            object.children[0].material.transparent = true
          }
          console.log('this.modelList ', this.modelList)
          if (!this.modelList[userData.type]) {
            this.modelList[userData.type] = []
          }
          this.modelList[userData.type].push(object)
          // 添加到它的父级
          parent.add(object)
          // 继续加载它的 children
          if (isAddChildren) {
            this.loadChildrenModel(object)
          }

          resolve(object)
        })
      })
    },
    // 动画
    animate () {
      this.render()
      requestAnimationFrame(this.animate)
    },
    // 渲染
    render (message) {
      // 跳帧优化
      if (this.skip !== 0) {
        this.skip = ++this.skip % 2
        return
      }
      this.skip = ++this.skip % 2

      // this.isDevelopment && this.Stats.begin()
      // console.log(message + '', message)
      renderer.render(scene, camera)
      labelRenderer.render(scene, camera)
      // this.composer.render()
      // this.isDevelopment && this.Stats.end()
      this.isDevelopment && this.Stats.update()
    }

  }
}
</script>

<style lang="less" scoped>
.radio {
  position: fixed;
  top: @layout-header-height + 5px;
  left: 0;
}
.button-box {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
.card {
  position: fixed;
  // top: calc(@layout-header-height + 20px);
  top: @layout-header-height;
  right: 5rem;
  /deep/ .dg.main {
    input {
      line-height: initial;
    }
  }
  &.examples {
    top: auto;
    bottom: 60px;
    left: 0;
    .finished {
      background-color: rgb(209, 228, 252);
    }
    .current {
      background-color: rgb(252, 209, 209);
    }
  }
  // color: #000000d9;
}
.bo {
  background-color: #eee;
}
canvas {
  display: block;
}
.z-index-two {
  margin-left: @gutter;
  z-index: 2;
  color: rgb(28, 105, 212);
}
.cad {
  position: fixed;
  top: 200px;
  left: 50px;
  width: 80%;
  opacity: 0.5;
}
.button {
  font-size: 14px;
  padding: 0 5px;
}
</style>
