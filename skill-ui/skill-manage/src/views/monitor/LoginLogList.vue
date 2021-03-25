<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <PageWrapperSearch>
        <a-form-item :label="this.$t('login.ipaddr')">
          <a-input v-model="queryParam.ipaddr" :placeholder="this.$t('login.ipaddr')"/>
        </a-form-item>
        <a-form-item :label="this.$t('login.loginName')">
          <a-input v-model="queryParam.loginName" :placeholder="this.$t('login.loginName')"/>
        </a-form-item>
        <a-form-item :label="this.$t('login.status')">
          <a-select v-model="queryParam.status" :placeholder="this.$t('login.status')" default-value="0">
            <a-select-option :value="''">全部</a-select-option>
            <a-select-option v-for="(d, index) in commonStatus" :key="index" :value="d.dictValue">{{ d.dictLabel }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="this.$t('login.loginTime')">
          <a-range-picker v-model="range"/>
        </a-form-item>
        <a-form-item slot="buttons">
          <a-button type="primary" @click="$refs.table.refresh(true)">{{ 'global.button.search' | i18n }}</a-button>
          <a-button style="margin-left: 8px" @click="reset">{{ 'global.button.reset' | i18n }}</a-button>
        </a-form-item>
      </PageWrapperSearch>
    </div>
    <div class="table-operator">
      <!-- <a-popconfirm v-has="'monitor:logininfor:remove'" title="确认清空吗？" @confirm="clean(selectedRowKeys)">
        <a-icon slot="icon" type="question-circle-o" style="color: red" />
        <a-button type="danger" ghost icon="close">{{ 'global.button.clear' | i18n }}</a-button>
      </a-popconfirm> -->
      <a-dropdown v-if="selectedRowKeys.length > 0" v-has="'monitor:logininfor:remove'">
        <a-popconfirm v-has="'monitor:logininfor:remove'" :title="this.$t('global.message.delete.ask')" @confirm="delByIds(selectedRowKeys)">
          <a-button type="danger" icon="delete" >{{ 'global.button.delete' | i18n }}</a-button>
        </a-popconfirm>
      </a-dropdown>
    </div>
    <s-table
      ref="table"
      size="default"
      rowKey="infoId"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :columns="columns"
      :data="loadData"
      :rangPicker="range"
      defaultSort="loginTime"
    >
      <span slot="status" slot-scope="text">
        {{ text | statusFilter }}
      </span>
    </s-table>
  </a-card>
</template>

<script>
import { STable } from '@/components'
// import { getLoginLogList, delLoginLog, cleanLoginLog } from '@/api/monitor'
import { getLoginLogList, delLoginLog } from '@/api/monitor'
import { getDictArray } from '../../utils/dict'
const commonStatusMap = {}
export default {
  name: 'TableList',
  components: {
    STable
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
        return getLoginLogList(Object.assign(parameter, this.queryParam))
      },
      commonStatus: [],
      selectedRowKeys: [],
      selectedRows: []

    }
  },
  filters: {
    operTypeFilter (type) {
      return commonStatusMap[type].text
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
    this.commonStatus = await getDictArray('sys_common_status')
    this.commonStatus.map(d => {
      commonStatusMap[d.dictValue] = { text: d.dictLabel }
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
    handleOk () {
      this.$refs.table.refresh(true)
    },
    delByIds (ids) {
      delLoginLog({ ids: ids.join(',') }).then(res => {
        if (res.code === 0) {
          this.$message.success(`删除成功`)
          this.handleOk()
        } else {
          this.$message.error(res.msg)
        }
        this.selectedRowKeys = []
      })
    },
    clean (ids) {
      delLoginLog({ ids: ids.join(',') }).then(res => {
        if (res.code === 0) {
          this.$message.success(`删除成功`)
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
          title: this.$t('login.infoId'),
          dataIndex: 'infoId'
        },
        {
          title: this.$t('login.loginName'),
          dataIndex: 'loginName'
        },
        {
          title: this.$t('login.ipaddr'),
          dataIndex: 'ipaddr'
        },
        {
          title: this.$t('login.loginLocation'),
          dataIndex: 'loginLocation'
        },
        {
          title: this.$t('login.browser'),
          dataIndex: 'browser'
        },
        {
          title: this.$t('login.os'),
          dataIndex: 'os'
        },
        {
          title: this.$t('login.status'),
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: this.$t('login.msg'),
          dataIndex: 'msg'
        },
        {
          title: this.$t('login.loginTime'),
          dataIndex: 'loginTime',
          sorter: true
        }
      ]
    }
  },
  watch: {
  }
}
</script>
