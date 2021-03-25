<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <PageWrapperSearch>
        <a-form-item :label="this.$t('dict.dictName')">
          <a-input v-model="queryParam.dictName" :placeholder="this.$t('dict.dictName')"/>
        </a-form-item>
        <a-form-item :label="this.$t('dict.dictType')">
          <a-input v-model="queryParam.dictType" :placeholder="this.$t('dict.dictType')"/>
        </a-form-item>
        <a-form-item :label="this.$t('dict.status')">
          <a-select v-model="queryParam.status" :placeholder="this.$t('dict.status')" default-value="0">
            <a-select-option :value="''">全部</a-select-option>
            <a-select-option :value="0">正常</a-select-option>
            <a-select-option :value="1">禁用</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item slot="buttons">
          <a-button type="primary" @click="$refs.table.refresh(true)">{{ 'global.button.search' | i18n }}</a-button>
          <a-button style="margin-left: 8px" @click="() => queryParam = {}">{{ 'global.button.reset' | i18n }}</a-button>
        </a-form-item>
      </PageWrapperSearch>
    </div>
    <div class="table-operator">
      <a-button v-if="addEnable" type="primary" icon="plus" @click="$refs.modal.add()">{{ 'global.button.new' | i18n }}</a-button>
      <a-dropdown v-if="removeEnable&&selectedRowKeys.length > 0">
        <!-- <a-button type="danger" icon="delete" @click="delByIds(selectedRowKeys)">{{ 'global.button.delete' | i18n }}</a-button> -->
        <a-popconfirm :title="deleteAsk" @confirm="delByIds(selectedRowKeys)">
          <a-button type="danger" icon="delete">{{ 'global.button.delete' | i18n }}</a-button>
        </a-popconfirm>
      </a-dropdown>
    </div>
    <s-table
      ref="table"
      size="default"
      rowKey="dictId"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :columns="columns"
      :data="loadData"
      defaultSort="createTime"
    >
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="action" slot-scope="text, record">
        <a v-if="editEnabel" @click="handleEdit(record)">{{ 'global.button.edit' | i18n }}</a>
        <a-divider v-if="editEnabel" type="vertical" />
        <a v-if="editEnabel" @click="dataModal(record.dictType)"><a-icon type="bars" />{{ 'global.button.list' | i18n }}</a>
        <a-divider v-if="removeEnable" type="vertical" />
        <!-- <a v-if="removeEnable" @click="delByIds([record.dictId])">{{ 'global.button.delete' | i18n }}</a> -->
        <a-popconfirm
          v-if="removeEnable"
          :title="deleteAsk"
          @confirm="delByIds([record.dictId])">
          <a>{{ 'global.button.delete' | i18n }}</a>
        </a-popconfirm>
      </span>
    </s-table>
    <dict-modal ref="modal" @ok="handleOk" />
    <dict-data-list-modal ref="datamodal" @ok="handleOk" />
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { getDictTypeList, delDictType } from '@/api/system'
import DictModal from './modules/DictModal.vue'
import DictDataListModal from './modules/DictDataListModal.vue'
import { checkPermission } from '@/utils/permissions'

const statusMap = {
  0: {
    status: 'success',
    text: '正常'
  },
  1: {
    status: 'default',
    text: '停用'
  }
}

export default {
  name: 'TableList',
  components: {
    STable,
    DictModal,
    DictDataListModal
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

      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getDictTypeList(Object.assign(parameter, this.queryParam))
      },
      selectedRowKeys: [],
      selectedRows: [],
      addEnable: checkPermission('system:dict:add'),
      editEnabel: checkPermission('system:dict:edit'),
      removeEnable: checkPermission('system:dict:remove')
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  created () {
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    handleAdd (parentId) {
      this.$refs.modal.add(parentId)
    },
    handleEdit (record) {
      this.$refs.modal.edit(record)
    },
    handleOk () {
      this.$refs.table.refresh(true)
      console.log('handleSaveOk')
    },
    dataModal (dictType) {
      this.$refs.datamodal.show(dictType)
    },
    delByIds (ids) {
      delDictType({ ids: ids.join(',') }).then(res => {
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
    deleteAsk () {
      return this.$t('global.message.delete.ask')
    },
    // 表头
    columns () {
      return [
        {
          title: this.$t('dict.dictName'),
          dataIndex: 'dictName'
        },
        {
          title: this.$t('dict.dictType'),
          dataIndex: 'dictType'
        },
        {
          title: this.$t('dict.list.status'),
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: this.$t('dict.remark'),
          dataIndex: 'remark'
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
