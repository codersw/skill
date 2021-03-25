<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <PageWrapperSearch>
        <a-form-item :label="this.$t('job.jobName')">
          <a-input v-model="queryParam.jobName" :placeholder="this.$t('job.jobName')"/>
        </a-form-item>
        <a-form-item :label="this.$t('job.jobGroup')">
          <DictSelectTag
            v-model="queryParam.jobGroup"
            :placeholder="this.$t('job.jobGroup')"
            dictCode="sys_job_group"/>
        </a-form-item>
        <a-form-item :label="this.$t('job.status')">
          <DictSelectTag
            v-model="queryParam.status"
            :placeholder="this.$t('job.status')"
            dictCode="sys_job_status"/>
        </a-form-item>
        <a-form-item slot="buttons">
          <a-button type="primary" @click="$refs.table.refresh(true)">{{ 'global.button.search' | i18n }}</a-button>
          <a-button style="margin-left: 8px" @click="() => queryParam = {}">{{ 'global.button.reset' | i18n }}</a-button>
        </a-form-item>
      </PageWrapperSearch>
    </div>
    <div class="table-operator">
      <a-button v-if="addEnable" type="primary" icon="plus" @click="$refs.modal.add()">{{ 'global.button.new' | i18n }}</a-button>
      <a-button v-if="logEnable" type="info" icon="book" @click="() => $router.push({path: '/system/log'})">{{ 'job.button.log'| i18n }}</a-button>
      <a-dropdown v-if="deleteEnable&&selectedRowKeys.length > 0">
        <a-popconfirm :title="deleteAsk" @confirm="delByIds(selectedRowKeys)">
          <a-button type="danger" icon="delete">{{ 'global.button.delete' | i18n }}</a-button>
        </a-popconfirm>
      </a-dropdown>
    </div>
    <s-table
      ref="table"
      size="default"
      rowKey="jobId"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :columns="columns"
      :data="loadData"
    >
      <span slot="status" slot-scope="text,record">
        <a-switch :checked="record.status==='0'" @change="onChangeStatus(record)"/>
      </span>
      <span slot="action" slot-scope="text, record">
        <a-popconfirm v-if="handlerEnable" :title="executeAsk" @confirm="runJob(record)">
          <a>{{ 'job.button.execute' | i18n }}</a>
        </a-popconfirm>
        <a-divider v-if="editEnable" type="vertical" />
        <a v-if="editEnable" @click="handleEdit(record)">{{ 'global.button.edit' | i18n }}</a>
        <a-divider v-if="deleteEnable" type="vertical" />
        <a-popconfirm v-if="deleteEnable" :title="deleteAsk" @confirm="delByIds([record.jobId])">
          <a>{{ 'global.button.delete' | i18n }}</a>
        </a-popconfirm>
      </span>
    </s-table>
    <sysJob-modal ref="modal" @ok="handleOk"/>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { getSysJobList, delSysJob, changeStatus, runSysJob } from '@/api/sysJob'
import pick from 'lodash.pick'
import SysJobModal from './modules/SysJobModal.vue'
import { checkPermission } from '@/utils/permissions'

export default {
  name: 'TableList',
  components: {
    STable,
    SysJobModal
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
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getSysJobList(Object.assign(parameter, this.queryParam))
      },
      selectedRowKeys: [],
      selectedRows: [],
      handlerEnable: checkPermission('system:job:handler'),
      logEnable: checkPermission('system:job:log'),
      addEnable: checkPermission('system:job:add'),
      editEnable: checkPermission('system:job:edit'),
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
    handleEdit (record) {
      this.$refs.modal.edit(record)
    },
    handleOk () {
      this.$refs.table.refresh(true)
      console.log('handleSaveOk')
    },
    delByIds (ids) {
      delSysJob(ids.join(',')).then(res => {
        if (res.code === 0) {
          this.$message.success(this.$t('global.message.delete.success'))
          this.handleOk()
        } else {
          this.$message.error(res.msg)
        }
        this.selectedRowKeys = []
      })
    },
    onChangeStatus (record) {
      record.status = record.status === '0' ? '1' : '0'
      changeStatus(pick(record, 'jobId', 'status')).then(res => {
        if (res.code === 0) {
          this.$message.success('操作成功')
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    runJob (record) {
      runSysJob(record).then(res => {
        if (res.code === 0) {
          this.$message.success('执行成功')
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  computed: {
    executeAsk () {
      return this.$t('job.button.execute.msg')
    },
    deleteAsk () {
      return this.$t('global.message.delete.ask')
    },
     // 表头
      columns () {
        return [
          {
            title: this.$t('job.jobId'),
            dataIndex: 'jobId'
          },
          {
            title: this.$t('job.jobName'),
            dataIndex: 'jobName'
          },
          {
            title: this.$t('job.jobGroup'),
            dataIndex: 'jobGroupName'
          },
          {
            title: this.$t('job.invokeTarget'),
            dataIndex: 'invokeTargetName'
          },
          {
            title: this.$t('job.cronExpression'),
            dataIndex: 'cronExpression'
          },
          {
            title: this.$t('job.status'),
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' }
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
