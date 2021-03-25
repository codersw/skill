<template>
  <div
    ref="unit"
    class="background"
    @click="handleOnClickPage"
    @contextmenu="handleOnContextmenu"
    @mouseup="handleOnMouseup">

    <!-- :getContainer="() => $refs.modal" -->
    <div class="cabinet">
      <a-modal
        v-model="visible.modelConfirm"
        :title="rightClickObj.model === 'empty' ? $t('app.model.info.predistribution.equipment') : $t('app.model.info.undercarriage.equipment')"
        :confirm-loading="loading.modelConfirm"
        :ok-text="$t('global.button.confirm')"
        :cancel-text="$t('global.button.cancel')"
        @ok="handleOnClickOkModelConfirm">
        <div v-show="rightClickObj.model === 'empty'">

          <!-- <div>{{ 'app.model.info.type' | i18n }}：{{ selectedPretreatmentEquipment.equipmentTypeName }}</div> -->
          <div>{{ 'app.model.info.name' | i18n }}：{{ selectedPretreatmentEquipment.equipmentName }}</div>
          <div>{{ 'app.model.info.ubit' | i18n }}：{{ selectedPretreatmentEquipment.unit }}</div>
          <div>{{ 'app.model.info.location' | i18n }}：{{ rightClickObj.sort }}</div>

        </div>
        <div v-show="rightClickObj.model !== 'empty'">
          <div v-for="(item, index) in rightClickObj.info" :key="index">
            <span>{{ item.label }}：</span>
            <span>{{ item.value }}</span>
          </div>
        </div>
      </a-modal>
      <create-equipment
        ref="modal"
        :spare-equipment-list="spareEquipmentList"
        :current-spare-height="currentSpareHeight"
        @ok="handleOnClickOkModelSelect"/>

      <div ref="popoverTip" class="right-click-card">
        <div @click="handleOnClickRightClickCard">{{ rightClickObj.model === 'empty' ? $t('app.model.info.predistribution') : $t('app.model.info.undercarriage') }}</div>
      </div>
      <!-- item.sort === selectedId -->
      <ul ref="unit">
        <!-- <div v-for="(item, index) in currentList" :key="index"> -->
        <a-popover
          v-for="(item, index) in currentList"
          :key="index"
          placement="left"
          trigger="click"
          overlayClassName="z-index-999"
          :visible="item.id === selectedId && isPopup"
        >
          <!-- :visible="item.id === selectedId" -->
          <template v-if="item.model !== 'empty'" slot="content">
            <p v-for="(info_item, info_index) in item.info" :key="info_index">
              <span>{{ info_item.label }}：</span>
              <span>{{ info_item.value }}</span>
            </p>
          </template>
          <template v-else slot="content">
            <p>
              {{ 'app.model.info.unused' | i18n }}
            </p>
          </template>
          <template slot="title">
            <span>{{ item.label }}</span>
          </template>
          <li
            :style="{'height': `${100 / total * item.height}%`}"
            :class="{'selected': item.id === selectedId}"
            @click="handleOnClickItem($event, item.id)"
            @mouseup="handleOnMouseup($event, item)">
            <img :src="equipmentImg[item.model] || img.u1" alt="">
            <!-- || item.status.slotState !== '02 -->
            <div

              class="light__item">
              <div
                v-for="height_item in item.height"
                :key="height_item"
                class="light__item__entity"
                :class="{
                  'white': item.unitLampState === '01',
                  'violet': item.unitLampState === '05',
                  'yellow': item.unitLampState === '07',
                  'red': item.unitLampState === '03',
                  'green': item.unitLampState === '04',
                  'navyblue': item.unitLampState === '02',
                  'blue': item.unitLampState === '06'
                }">{{ item.height }}</div>
            </div>
          </li>
        </a-popover>
        <!-- </div> -->
      </ul>
    </div>
  </div>
</template>
<script>
import img from '@/assets/model'
import { unitUpdate, addEquipment } from '@/api/model'
import createEquipment from '@/views/unit/components/model/createEquipment'
// import createEquipment from '@/views/manager/equipment/modules/UmEquipmentModal'
import { checkPermission } from '@/utils/permissions'
import { saveUmEquipment } from '@/api/manager/equipment/umEquipment'
export default {
  name: 'UnitComponentsModelU',
  components: {
    'create-equipment': createEquipment
  },
  props: {
    // 机柜上的 设备和u位列表
    list: {
      type: Array,
      default: () => [
      ]
    },
    // 定位的设备id
    selectedIdProp: {
      type: [Number, String],
      default: () => ''
    },
    // 空余设备列表
    spareEquipmentList: Array,
    // 机柜id
    rackId: String
  },
  data () {
    return {
      checkPermission,
      img, // 引用的图片
      total: 41, // slots总数
      selectedId: '-1', // 选中的设备或者u位 id
      isPopup: false, // 是否走了 mounted
      // 右击的对象
      rightClickObj: {
        model: '' // 型号
      },
      // 对话框 开关
      visible: {
        modelSelect: false, // 选择对话框
        modelConfirm: false // 确认提示对话框
      },
      // loading 状态
      loading: {
        modelConfirm: false // 确认提示对话框
      },
      // 选中的预处理设备
      selectedPretreatmentEquipment: {
        equipmentId: '' // 设备id
      },
      currentSpareHeight: 0, // 当前点击的位置与上面的设备（或机柜顶部）之间的可用的u位数
      // 选中的预处理设备 id
      // selectedPretreatmentEquipmentId: '',
      // 设备图片对象
      equipmentImg: {
        'empty': img.uc, // 挡板
        'wireRack': img.u1, // 理线架
        'server': img.u2 // 服务器
      }
    }
  },
  watch: {
    selectedIdProp () {
      this.selectedId = this.selectedIdProp || this.selectedId
    }
    // spareEquipmentList () {
    //   if (this.spareEquipmentList.length) {
    //     this.selectedPretreatmentEquipmentId = this.spareEquipmentList[0].equipmentId || this.selectedPretreatmentEquipmentId
    //     this.selectedPretreatmentEquipment = this.spareEquipmentList[0]
    //   }
    // }
  },
  computed: {
    currentList () {
      return [...this.list].reverse()
      // let list = []
      // for (let i = 0; i < this.total; i++) {
      //   list.push({
      //     type: '空余u位',
      //     imgUrl: img.uc,
      //     sort: i,
      //     height: 1
      //   })
      // }
      // for (let i = 0; i < this.list.length; i++) { // [0,1,{2,2},3,4,{5,2},6,7,8,9]
      //   list[this.list[i].sort] = this.list[i]
      //   for (let j = 0; j < this.list[i].height - 1; j++) {
      //     list[this.list[i].sort + j + 1].isRemove = true
      //   }
      // }
      // list = list.filter(item => !item.isRemove)
      // return list
    }
  },
  created () {
    this.initData()
  },
  mounted () {
    setTimeout(() => {this.isPopup = true}, 1000)
  },
  methods: {
    // 初始化数据
    initData () {
      this.selectedId = this.selectedIdProp || this.selectedId
      // if (this.spareEquipmentList.length) {
      //   this.selectedPretreatmentEquipmentId = this.spareEquipmentList[0].equipmentId || this.selectedPretreatmentEquipmentId
      //   this.selectedPretreatmentEquipment = this.spareEquipmentList[0]
      // }
    },
    // 新建设备成功时
    // handleOnClickOkModelSelect () {
    //   // 告诉父组件 更新空闲设备列表
    //   this.$emit('query-spare-equipment')
    // },
    // 预上架 预下架 接口
    requestUnitUpdate () {
      unitUpdate({
        rackEquipmentId: this.selectedPretreatmentEquipment.equipmentId, // 预分配时选择的设备id
        rackId: this.rackId, // 机柜ID
        rackUnitId: this.selectedId, // U位id或者设备ID
        unitLampState: this.rightClickObj.model === 'empty' ? '02' : '07' // U位指示灯情况 02深蓝色 预分配，07黄色 预下架）
      }).then(res => {
        this.loading.modelConfirm = false
        this.visible.modelConfirm = false
        if (res.success) {
          this.$message.success(this.$t('global.message.success'))
          // 告诉父组件 更新空闲设备列表
          this.$emit('query-spare-equipment')
          return
        }
        this.$message.error(this.$t('global.message.fail'))
      }).catch(() => {
        this.loading.modelConfirm = false
        this.visible.modelConfirm = false
      })
    },
    // 新建设备预上架
    requestAddEquipment (form) {
      addEquipment({
        equipmentName: form.equipmentName, // 设备名称
        equipmentType: form.equipmentType, // 设备类型(01服务器,13理线架)
        rackId: this.rackId, // 机柜ID
        rackUnitId: this.selectedId, // U位id或者设备ID
        unit: form.unit, // U位数
        depth: form.depth, // 深度
        height: form.height, // 高度
        installationDate: form.installationDate, // 安装日期
        limitPower: form.limitPower, // 电源额定功率
        modelName: form.modelName, // 型号
        partsNo: form.partsNo, // 部件号
        weight: form.weight, // 重量
        width: form.width // 宽度
      }).then(res => {
        this.loading.modelConfirm = false
        this.visible.modelConfirm = false
        if (res.success) {
          this.$message.success(this.$t('global.message.success'))
          // 告诉父组件 更新空闲设备列表
          this.$emit('query-spare-equipment')
          return
        }
        // this.$message.error(this.$t('global.message.fail'))
        this.$message.error(res.message)
      }).catch(() => {
        this.loading.modelConfirm = false
        this.visible.modelConfirm = false
      })
    },
    // 选择对话框中 点击确认
    handleOnClickOkModelSelect (selectedEquipment, isNew) {
      this.visible.modelSelect = false
      this.$refs.modal.close()
      this.isCreatEquipment = isNew
      this.selectedPretreatmentEquipment = selectedEquipment
      if (this.selectedPretreatmentEquipment.unit > this.currentSpareHeight) {
        this.$message.warning(this.$t('global.message.notEnoughUBitSpace'))
        return
      }

      this.visible.modelConfirm = true
    },
    // 确认提示对话框中 点击确认
    handleOnClickOkModelConfirm () {
      this.loading.modelConfirm = true
      // 新增设备预上架
      if (this.isCreatEquipment && this.rightClickObj.model === 'empty') {
        console.log('form', this.selectedPretreatmentEquipment)
        console.log('rightClickObj', this.rightClickObj)
        this.requestAddEquipment(this.selectedPretreatmentEquipment)
        return
      }

      // 空余设备预上架 或 u位上的设备预下架
      this.requestUnitUpdate()
    },
    // 选择对话框中 切换select选项
    // handleOnChangeSelect (value) {
    //   this.selectedPretreatmentEquipment = this.spareEquipmentList.find(item => item.equipmentId === value)
    // },
    // 点击右击后的卡片
    handleOnClickRightClickCard () {
      // 打开预分配对话框
      if (this.rightClickObj.model === 'empty') {
        // this.visible.modelSelect = true
        this.$refs.modal.add()
        return
      }
      // 打开提示对话框
      this.visible.modelConfirm = true
    },
    // 点击页面
    handleOnClickPage () {
      this.$refs.popoverTip.style.display = 'none'
      this.isPopup = false
      // this.selectedId = '-1'
    },
    // 点击机器
    handleOnClickItem (e, id) {
      console.log('spareEquipmentList', this.spareEquipmentList)
      console.log('spareEquipmentList', this.spareEquipmentList.map(item => item.equipmentId))
      e.stopPropagation()
      this.isPopup = true
      this.$refs.popoverTip.style.display = 'none'
      // if (this.selectedId === id) {
      //   this.selectedId = '-1'
      //   return
      // }
      this.selectedId = id
    },
    // 元素的上下文菜单
    handleOnContextmenu (e) {
      // 这一步是为了阻止右击时系统默认的弹出框
      e.preventDefault()
    },
    // 鼠标抬起事件
    handleOnMouseup (e, item) {
      if (!e) e = window.event
      if (e.button === 2) {
        console.log('右击21')
        if (!item || !checkPermission('manager:factory:unit')) {
          this.$refs.popoverTip.style.display = 'none'
          this.selectedId = '-1'
          return
        }
        if (this.selectedId !== item.id) {
          this.isPopup = false
        }
        e.stopPropagation()
        // 当前点击的位置
        const currentSort = (item.sort + item.height - 1)
        // 上面的设备 slotState 02 是空闲 item.unitLampState === '05' || item.status.slotState !== '02' 也认为是空闲
        const obj = this.list.find(item =>
          item.sort > currentSort &&
          item.unitLampState !== '01'
        )
        // 当前点击的位置与上面的设备（或机柜顶部）之间的可用的u位数
        this.currentSpareHeight = obj ? obj.sort - currentSort : 42 - currentSort
        this.selectedId = item.id
        this.rightClickObj = item
        this.$refs.popoverTip.style.display = 'block'
        this.$refs.popoverTip.style.top = (e.y || e.clientY) + 1 + 'px'
        this.$refs.popoverTip.style.left = (e.x || e.clientX) + 1 + 'px'
      }
    }
  }
}
</script>
<style lang='less' scoped>
@cabinet-height: 89vh;
// @cabinet-width: @cabinet-height * 0.4075;
@cabinet-width: @cabinet-height * 0.46;
.background {
  // height: 90px;
  .cabinet {
    margin: 60px 0 0 32%;
    // padding: @cabinet-height * 0.086 @cabinet-width * 0.192 @cabinet-height * 0.12 @cabinet-width * 0.189;
    padding: @cabinet-height * 0.0765 @cabinet-width * 0.233 @cabinet-height * 0.146 @cabinet-width * 0.21;
    height: @cabinet-height;
    width: @cabinet-width;
    background-image: url('~@/assets/model/bg.png');
    background-repeat: no-repeat;
    background-size: contain;
    // background-image: './jg.png';

    ul {
      margin: 0;
      padding: 0;
      height: 100%;
      li {
        position: relative;
        // height: 19px;
        box-sizing: border-box;
        border: 1.5px solid;
        font-size: 0;
        // -moz-user-select:none;
        // -webkit-user-select:none;/*webkit浏览器*/
        // -ms-user-select:none;/*IE10*/
        // -khtml-user-select:none;/*早期浏览器*/
        // user-select:none
        &:hover {
          border-color: #3877ff;
          background-color: #3877ff;
          // -moz-opacity:0.6;
          // opacity:0.6;
          // -webkit-filter: #3877ff(10px); /* Chrome, Opera */
          // -ms-filter: #3877ff(10px);
          // filter: #3877ff(10px);
          animation-name: shine;
          animation-duration: 3s;
          animation-iteration-count: infinite;
          -webkit-animation-name: shine;
          -webkit-animation-duration: 3s;
          -webkit-animation-iteration-count: infinite;
        }
        img {
          width: 100%;
          height: 100%;
          &:hover {
            opacity: 0.8
          }
        }
        &.selected {
          background-color: #3877ff;
          img {
            opacity: 0.4;
          }
        }

        .light__item {
          display: flex;
          flex-flow: column;
          position: absolute;
          top: 0;
          right: -@cabinet-height * 0.02;
          height: 100%;
          width: @cabinet-height * 0.015;
          &__entity {
            margin: auto;
            height: @cabinet-height * 0.007;
            width: @cabinet-height * 0.007;
            border-radius: 50%;
            color: #ffffff;
            background-color: rgb(221, 221, 221);
            &.violet {
              background-color: #7030a0;
            }
            &.yellow {
              background-color: #ffc000;
            }
            &.navyblue {
              background-color: #1f4e78;
            }
            &.red {
              background-color: #ff0000;
            }
            &.green {
              background-color: #92d050;
            }
            &.blue {
              background-color: #00ffff;
            }

            // box-shadow: 0 0 @cabinet-height * 0.007 * 0.15 @cabinet-height * 0.007 * 0.2 #bbb;
          }
        }
      }
    }
  }
  .right-click-card {
    display: none;
    z-index: 3;
    position: absolute;

    background-color: #fff;
    &:hover {
      cursor: pointer;
    }
    div {
      padding: 4px 15px;
      &:hover {
        background-color: lightblue;
      }
    }
  }
}
.popover {
  // 1030 => 999
  z-index: 999;
}
.ant-modal-mask {
  z-index: 1031;
}
.display-flex {
  display: flex;
}
@keyframes shine {
  0% { box-shadow: 0 0 5px 1px #bbb; }
  20%, 80% { box-shadow: 0 0 10px 3px #2808d8; }
  100% { box-shadow: 0 0 5px 1px #bbb; }
}
@-webkit-keyframes shine {
  0% { -webkit-box-shadow: 0 0 5px 1px #bbb; }
  20%, 80% { -webkit-box-shadow: 0 0 10px 3px #2808d8; }
  100% { -webkit-box-shadow: 0 0 5px 1px #bbb; }
}

</style>