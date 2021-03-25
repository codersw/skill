<template>
  <a-modal
    v-if="visible"
    v-model="visible"
    :title="this.$t('app.model.info.predistribution')"
    :width="800"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
  >

    <div class="create-equipment-page">
      <a-menu v-model="currentKey" style="width: 200px" mode="vertical">
        <a-menu-item key="1">
          {{ 'app.model.info.u.creat.equipment' | i18n }}
        </a-menu-item>
        <a-menu-item key="2">
          {{ 'app.model.info.u.select.equipment' | i18n }}
        </a-menu-item>
      </a-menu>
      <div class="steps-content">
        <a-form-model v-if="currentKey[0] === '1'" ref="ruleForm" :rules="rules" :model="form">
          <a-form-model-item style="display:none">
            <a-input v-model="form.equipmentId" />
          </a-form-model-item>
          <a-form-model-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            :label="this.$t('device.equipmentType')"
            name="equipmentType"
            prop="equipmentType">
            <DictSelectTag
              v-model="form.equipmentType"
              :placeholder="this.$t('device.equipmentType')"
              dictCode="sys_dict_data,dict_label,dict_value,remark='rack'"/>
          </a-form-model-item>
          <a-form-model-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            :label="this.$t('device.equipmentName')"
            name="equipmentName"
            prop="equipmentName">
            <a-input v-model="form.equipmentName" :maxLength="32" :placeholder="this.$t('device.equipmentName')"/>
          </a-form-model-item>
          <a-form-model-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="this.$t('device.unit')" prop="unit">
            <a-input v-model="form.unit" :maxLength="2" :placeholder="this.$t('device.unit')"/>
          </a-form-model-item>
          <a-form-model-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="this.$t('device.manuFacturer')">
            <DictSelectTag
              v-model="form.manuFacturer"
              :placeholder="this.$t('device.manuFacturer')"
              dictCode="manu_facturer"/>
          </a-form-model-item>
          <a-form-model-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="this.$t('device.modelName')">
            <a-input v-model="form.modelName" :maxLength="32" :placeholder="this.$t('device.modelName')"/>
          </a-form-model-item>
          <a-form-model-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="this.$t('device.partsNo')">
            <a-input v-model="form.partsNo" :maxLength="32" :placeholder="this.$t('device.partsNo')"/>
          </a-form-model-item>
          <a-form-model-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="this.$t('device.width')">
            <a-input v-model="form.width" :maxLength="4" :placeholder="this.$t('device.width')"/>
          </a-form-model-item>
          <a-form-model-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="this.$t('device.height')">
            <a-input v-model="form.height" :maxLength="4" :placeholder="this.$t('device.height')"/>
          </a-form-model-item>
          <a-form-model-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="this.$t('device.depth')">
            <a-input v-model="form.depth" :maxLength="4" :placeholder="this.$t('device.depth')"/>
          </a-form-model-item>
          <a-form-model-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="this.$t('device.weight')">
            <a-input v-model="form.weight" :maxLength="4" :placeholder="this.$t('device.weight')"/>
          </a-form-model-item>
          <a-form-model-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="this.$t('device.limitPower')">
            <a-input v-model="form.limitPower" :maxLength="9" :placeholder="this.$t('device.limitPower')"/>
          </a-form-model-item>
          <a-form-model-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="this.$t('device.installationDate')">
            <a-date-picker
              v-model="form.installationDate"
              format="YYYY-MM-DD"
              valueFormat="YYYY-MM-DD"
              style="width: 100%"
              :placeholder="this.$t('device.installationDate')"
            />
          </a-form-model-item>

        </a-form-model>
        <!-- <a-select v-if="currentKey[0] === '2'" v-model="selectedPretreatmentEquipmentId" :placeholder="$t('app.model.info.choose.equipment')" style="width: 80%" @change="handleOnChangeSelect">
          <a-select-option
            v-for="(item, index) in spareEquipmentList"
            :key="index"
            :value="item.equipmentId"
            :disabled="item.unit > currentSpareHeight">
            {{ item.equipmentName }}
          </a-select-option>
        </a-select> -->
        <a-table
          v-if="currentKey[0] === '2'"
          :row-selection="rowSelection"
          rowKey="equipmentId"
          :filter-multiple="false"
          :columns="columns"
          :data-source="spareEquipmentList">
        </a-table>
      </div>
    </div>
    <!-- 操作按钮 -->
    <template slot="footer">
      <a-button
        type="primary"
        :loading="confirmLoading"
        @click="handleSubmit"
      >
        {{ 'global.button.confirm' | i18n }}
      </a-button>
      <a-button @click="handleCancel">{{ 'global.button.close' | i18n }}</a-button>
    </template>
  </a-modal>
</template>
<script>
import {getProjectList, getProjectListEquipment, saveUmEquipment} from '@/api/manager/equipment/umEquipment'
import pick from 'lodash.pick'
import ProjectListPopup from '@/views/manager/equipment/projectTranter/Popup'// 项目选择
import Position from '@/views/manager/components/position/index'// 场景选择
import UnitPopup from '@/views/manager/components/unitList/popup'// u位选择
import {isInteger} from '@/utils/validator'// 验证规则工具类
export default {
  name: 'UmEquipmentModal',
  props: {
    spareEquipmentList: Array, // 空余设备列表
    currentSpareHeight: Number // 当前点击的位置与上面的设备（或机柜顶部）之间的可用的u位数
  },
  components: {
    ProjectListPopup, // 项目
    Position, // 位置
    UnitPopup

  },
  data () {
    return {
      currentKey: ['1'],
      // 选中的预处理设备 id
      selectedPretreatmentEquipmentId: '',
      // 选中的空余设备id
      selectedEquipmentId: '',
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      confirmLoading: false,
      form: {}, // 表单

      locationForm: {},
      selectedEquipment: null,
      columns: [
        // {
        //   title: '名称',
        //   dataIndex: 'name',
        //   key: 'name'
        // },
        // {
        //   title: '类型',
        //   dataIndex: 'type',
        //   key: 'type'
        // }
        {
          title: '名称',
          dataIndex: 'equipmentName',
          key: 'equipmentName'
        },
        {
          title: '类型',
          dataIndex: 'equipmentTypeName',
          key: 'equipmentTypeName'
        }
      ],
      dataSource2: [
        {
          equipmentId: '1',
          equipmentName: '服务器d20210208_2',
          equipmentTypeName: '服务器'
        },
        {
          equipmentId: '2',
          equipmentName: '服务器d20210208_2',
          equipmentTypeName: '服务器'
        }
      ],
      dataSource: [
        {
          key: '1',
          name: '服务器d20210208_2',
          type: '服务器'
        },
        {
          key: '2',
          name: '服务器d20210208_2',
          type: '服务器'
        },
        {
          key: '3',
          name: '服务器d20210208_3',
          type: '服务器'
        },
        {
          key: '4',
          name: '服务器d20210208_4',
          type: '服务器'
        },
        {
          key: '5',
          name: '服务器d20210208_5',
          type: '服务器'
        },
        {
          key: '6',
          name: '服务器d20210208_6',
          type: '服务器'
        },
        {
          key: '7',
          name: '服务器d20210208_7',
          type: '服务器'
        },
        {
          key: '8',
          name: '服务器d20210208_8',
          type: '服务器'
        },
        {
          key: '9',
          name: '服务器d20210208_9',
          type: '服务器'
        },
        {
          key: '10',
          name: '服务器d20210208_10',
          type: '服务器'
        },
        {
          key: '11',
          name: '服务器d20210208_11',
          type: '服务器'
        },
        {
          key: '12',
          name: '服务器d20210208_12',
          type: '服务器'
        },
        {
          key: '13',
          name: '服务器d20210208_13',
          type: '服务器'
        },
        {
          key: '14',
          name: '服务器d20210208_14',
          type: '服务器'
        }
      ]
    }
  },
  computed: {
    // 设备是否为服务器
    isServer () {
      return this.form.equipmentType === '01' ||
      this.form.equipmentType === '02' ||
      this.form.equipmentType === '03' ||
      this.form.equipmentType === '13'
    },
    // 校验
    rules () {
      return {
        equipmentName: [
          { required: true, message: this.$t('device.equipmentName.msg'), trigger: 'blur' }
        ],
        equipment_type: [
          { required: true, message: this.$t('device.equipmentName.msg'), trigger: 'change' }
        ],
        unit: [
            { required: true, message: this.$t('device.unit.msg'), trigger: 'blur' },
            { validator: isInteger, trigger: 'blur' }
        ],
        startUnit: [
            { required: false, message: this.$t('device.startUnit.msg'), trigger: 'blur' }
        ]
      }
    },
    rowSelection () {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          this.setSelectedEquipment(selectedRows[0])
          console.log('selectedRows', selectedRows)
        },
        type: 'radio'
      }
    }
  },
  mounted () {
  },
  created () {
  },
  methods: {
    // 更新选中的设备
    setSelectedEquipment (val) {
      this.selectedEquipment = val
    },
    // 选择对话框中 切换select选项
    // handleOnChangeSelect (value) {
    //   this.selectedPretreatmentEquipment = this.spareEquipmentList.find(item => item.equipmentId === value)
    // },
    // 选择项目回调
    projectCallback (row) {
      // console.log(row, '======返回的选中项目数据=======')
      this.form = Object.assign(this.form, {'project': row.project})
      // 更新位置组件的项目ID
      this.$refs.position.setProject(row.project)
    },
    add () {
      // 添加是设置默认值
      this.edit({ equipmentId: '', states: '1', equipmentType: '01' })
    },
    edit (record) {
      // 返回第一步
      this.selectedEquipment = null
      this.visible = true
      this.form = Object.assign(record)
      // console.log(this.form, '=============编辑==============')
      // this.getProjects()
    },
    // 提交
    handleSubmit (e) {
      e.preventDefault()
      if (this.currentKey[0] === '2') {
        if (!this.selectedEquipment) {
          this.$message.warning(this.$t('app.model.info.choose.equipment'))
          return
        }
        this.$emit('ok', this.selectedEquipment)
        return
      }

      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return
        console.log('this.form', this.form)
        this.$emit('ok', this.form, true)
      })
    },
    handleCancel () {
        this.close()
    },
    close () {
      this.visible = false
    }

  },
  watch: {
  }
}
</script>
<style lang="less" scoped>
.create-equipment-page {
  display: flex;
}
.code-box-demo .ant-slider {
  margin-bottom: 16px;
}

.steps-content {
  flex: 1;
  // border: 1px dashed #e9e9e9;
  border-radius: 6px;
  // background-color: #fafafa;
  min-height: 200px;
  text-align: center;
}
.steps-action {
  margin-top: 15px;
}
</style>