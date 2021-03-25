<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <PageWrapperSearch>
        <a-form-item :label="this.$t('operLog.operName')">
          <a-input v-model="queryParam.operName" :placeholder="this.$t('operLog.operName')"/>
        </a-form-item>
        <a-form-item :label="this.$t('operLog.businessType')">
          <a-select v-model="queryParam.businessType" :placeholder="this.$t('operLog.businessType')" default-value="0">
            <a-select-option :value="''">全部</a-select-option>
            <a-select-option v-for="(b, index) in businessTypes" :key="index" :value="b.dictValue">{{ b.dictLabel }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="this.$t('operLog.status')">
          <a-select v-model="queryParam.status" :placeholder="this.$t('operLog.status')" default-value="0">
            <a-select-option :value="''">全部</a-select-option>
            <a-select-option :value="0">成功</a-select-option>
            <a-select-option :value="1">失败</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="this.$t('operLog.operTime')">
          <a-range-picker v-model="range"/>
        </a-form-item>
        <a-form-item slot="buttons">
          <a-button type="primary" @click="$refs.table.refresh(true)">{{ 'global.button.search' | i18n }}</a-button>
          <a-button style="margin-left: 8px" @click="reset">{{ 'global.button.reset' | i18n }}</a-button>
        </a-form-item>
      </PageWrapperSearch>
    </div>
    <div class="table-operator">
      <!-- <a-popconfirm v-has="'monitor:operlog:remove'" title="确认清空吗？" @confirm="clean(selectedRowKeys)">
        <a-icon slot="icon" type="question-circle-o" style="color: red" />
        <a-button type="danger" ghost icon="close">{{ 'global.button.clear' | i18n }}</a-button>
      </a-popconfirm> -->
      <a-button type="primary" icon="export" @click="exportExcel()">{{ 'global.button.export' | i18n }}</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0" v-has="'monitor:operlog:remove'">
        <a-popconfirm v-has="'monitor:operlog:remove'" :title="this.$t('global.message.delete.ask')" @confirm="delByIds(selectedRowKeys)">
          <a-button type="danger" icon="delete">{{ 'global.button.delete' | i18n }}</a-button>
        </a-popconfirm>
      </a-dropdown>
    </div>
    <s-table
      v-if="operTypeMap"
      ref="table"
      size="default"
      rowKey="operId"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :columns="columns"
      :data="loadData"
      :rangPicker="range"
      defaultSort="operTime"
    >
      <span slot="businessType" slot-scope="text">
        {{ text | operTypeFilter }}
      </span>
      <span slot="status" slot-scope="text">
        {{ text | statusFilter }}
      </span>
      <span slot="operTime" slot-scope="text">
        {{ text | fromNow }}
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="handleDetail(record)">{{ 'global.button.detail' | i18n }}</a>
      </span>
    </s-table>
    <operLog-modal v-if="operTypeMap" ref="modal" :operTypeMap="operTypeMap"/>
  </a-card>
</template>

<script>
import { STable } from '@/components'
// import { getOperLogList, delOperLog, cleanOperLog, operLogExport } from '@/api/monitor'
import { getOperLogList, delOperLog, operLogExport } from '@/api/monitor'
import OperLogModal from './modules/OperLogModal.vue'
import { getDictArray } from '@/utils/dict'
import { exportExcel } from '@/utils/download'
import {delUmEquipmentSensor} from '@/api/manager/sensor/umEquipmentSensor'
const operTypeMap = {}
export default {
  name: 'TableList',
  components: {
    STable,
    OperLogModal
  },
  data () {
    return {
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      form: this.$form.createForm(this),
      mdl: {},
      permissions: [],
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},

      range: null,
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getOperLogList(Object.assign(parameter, this.queryParam))
      },
      operTypeMap,
      businessTypes: [],
      selectedRowKeys: [],
      selectedRows: []

    }
  },
  filters: {
    operTypeFilter (type) {
      return operTypeMap[type].text
    },
    statusFilter (status) {
      const statusMap = {
        '1': '失败',
        '0': '成功'
      }
      return statusMap[status]
    }
  },
  beforeCreate () {

  },
  async created () {
    // 字典两种用法，各有优缺点
    // operTypeMap = await getDictMap('sys_oper_type')
    // this.operTypeMap = operTypeMap
    // this.operTypeMap.forEach((value, key, mymap) => {
    //   this.businessTypes.push({ code: key, label: value })
    // })
    this.businessTypes = await getDictArray('sys_oper_type')
    this.businessTypes.map(d => {
      operTypeMap[d.dictValue] = { text: d.dictLabel }
    })
  },
  methods: {
    reset () {
      this.queryParam = {}
      this.range = null
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleDetail (record) {
      this.$refs.modal.detail(record)
    },
    handleOk () {
      this.$refs.table.refresh(true)
    },
    exportExcel () {
      exportExcel(operLogExport, this.queryParam)
    },
    delByIds (ids) {
      delOperLog({ ids: ids.join(',') }).then(res => {
        if (res.code === 0) {
          this.$message.success(this.$t('global.message.delete.success'))
          this.handleOk()
        } else {
          this.$message.error(res.msg)
        }
        this.selectedRowKeys = []
      })
    },
    clean (ids) {
      delOperLog({ ids: ids.join(',') }).then(res => {
        if (res.code === 0) {
          this.$message.success(this.$t('global.message.delete.success'))
          this.handleOk()
        } else {
          this.$message.error(res.msg)
        }
        this.selectedRowKeys = []
      })
    }
  },
  computed: {
      // 表头
      columns () {
        return [
          {
            title: this.$t('operLog.operId'),
            dataIndex: 'operId'
          },
          {
            title: this.$t('operLog.title'),
            dataIndex: 'title'
          },
          {
            title: this.$t('operLog.businessType'),
            dataIndex: 'businessType',
            scopedSlots: { customRender: 'businessType' }
          },
          {
            title: this.$t('operLog.operName'),
            dataIndex: 'operName'
          },
          {
            title: this.$t('operLog.operIp'),
            dataIndex: 'operIp'
          },
          {
            title: this.$t('operLog.operLocation'),
            dataIndex: 'operLocation'
          },
          {
            title: this.$t('operLog.status'),
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: this.$t('operLog.operTime'),
            dataIndex: 'operTime',
            sorter: true,
            scopedSlots: { customRender: 'operTime' }
          },
          {
            title: this.$t('global.action'),
            width: '75px',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' }
          }
        ]
      }

  },
  watch: {
  }
}
</script>
