<template>
  <a-card :bordered="false">
    <a-page-header
      :title="this.$t('job.log.title')"
      @back="() => $router.go(-1)"
    />
    <div class="table-page-search-wrapper">
      <PageWrapperSearch>
        <a-form-item :label="this.$t('job.log.jobName')">
          <a-input v-model="queryParam.jobName" :placeholder="this.$t('job.log.jobName')"/>
        </a-form-item>
        <a-form-item :label="this.$t('job.log.jobGroup')">
          <DictSelectTag
            v-model="queryParam.jobGroup"
            :placeholder="this.$t('job.log.jobGroup')"
            dictCode="sys_job_group"/>
        </a-form-item>
        <a-form-item :label="this.$t('job.log.status')">
          <DictSelectTag
            v-model="queryParam.status"
            :placeholder="this.$t('job.log.status')"
            dictCode="sys_job_log_status"/>
        </a-form-item>
        <a-form-item :label="this.$t('job.log.createTime')">
          <a-range-picker v-model="range"/>
        </a-form-item>
        <a-form-item slot="buttons">
          <a-button type="primary" @click="$refs.table.refresh(true)">{{ 'global.button.search' | i18n }}</a-button>
          <a-button style="margin-left: 8px" @click="() => queryParam = {}">{{ 'global.button.reset' | i18n }}</a-button>
        </a-form-item>
      </PageWrapperSearch>
    </div>
    <div class="table-operator">
      <a-dropdown v-if="deleteEnable&&selectedRowKeys.length > 0">
        <a-popconfirm :title="deleteAsk" @confirm="delByIds(selectedRowKeys)">
          <a-button type="danger" icon="delete">{{ 'global.button.delete' | i18n }}</a-button>
        </a-popconfirm>
      </a-dropdown>
    </div>
    <s-table
      ref="table"
      size="default"
      rowKey="jobLogId"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :columns="columns"
      :rangPicker="range"
      :data="loadData"
    >
      <span slot="action" slot-scope="text, record">
        <a v-if="handlerEnable" @click="handleDetail(record)">{{ 'global.button.detail' | i18n }}</a>
        <a-divider v-if="deleteEnable" type="vertical" />
        <a-popconfirm v-if="deleteEnable" :title="deleteAsk" @confirm="delByIds([record.jobLogId])">
          <a>{{ 'global.button.delete' | i18n }}</a>
        </a-popconfirm>
      </span>
    </s-table>
    <sysJobLog-modal ref="modal" @ok="handleOk"/>
  </a-card>
</template>
<script>
import { STable } from '@/components'
import { getSysJobLogList, delSysJobLog } from '@/api/sysJobLog'
import SysJobLogModal from './modules/SysJobLogModal.vue'
import { checkPermission } from '@/utils/permissions'

export default {
  name: 'TableList',
  components: {
    STable,
    SysJobLogModal
  },
  data () {
    return {
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
      range: null,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},

      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getSysJobLogList(Object.assign(parameter, this.queryParam))
      },
      selectedRowKeys: [],
      selectedRows: [],
      handlerEnable: checkPermission('system:job:handler'),
      deleteEnable: checkPermission('system:job:delete')
    }
  },
  filters: {
  },
  created () {
  },
  methods: {
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleAdd () {
      this.$refs.modal.add()
    },
    handleDetail (record) {
      this.$refs.modal.edit(record)
    },
    handleOk () {
      this.$refs.table.refresh(true)
      console.log('handleSaveOk')
    },
    delByIds (ids) {
      delSysJobLog(ids.join(',')).then(res => {
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
    deleteAsk () {
      return this.$t('global.message.delete.ask')
    },
    // 表头
    columns () {
      return [
        {
          title: this.$t('job.log.jobName'),
          dataIndex: 'jobName'
        },
        {
          title: this.$t('job.log.jobGroup'),
          dataIndex: 'jobGroupName'
        },
        {
          title: this.$t('job.log.invokeTarget'),
          dataIndex: 'invokeTargetName'
        },
        {
          title: this.$t('job.log.jobMessage'),
          dataIndex: 'jobMessage'
        },
        {
          title: this.$t('job.log.status'),
          dataIndex: 'statusName'
        },
        {
          title: this.$t('job.log.createTime'),
          dataIndex: 'createTime'
        },
        {
          title: this.$t('global.action'),
          width: '200px',
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
