<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <PageWrapperSearch>
        <a-form-item :label="this.$t('dept.deptName')" >
          <a-input v-model="queryParam.deptName" :placeholder="this.$t('dept.deptName')"/>
        </a-form-item>
        <a-form-item :label="this.$t('dept.status')">
          <a-select v-model="queryParam.status" :placeholder="this.$t('dept.status')">
            <a-select-option value="">全部</a-select-option>
            <a-select-option value="0">正常</a-select-option>
            <a-select-option value="1">停用</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item slot="buttons">
          <a-button type="primary" @click="this.fetch">{{ 'global.button.search' | i18n }}</a-button>
          <a-button style="margin-left: 8px" @click="() => queryParam = {}">{{ 'global.button.reset' | i18n }}</a-button>
        </a-form-item>
      </PageWrapperSearch>
    </div>
    <div class="table-operator">
      <a-button v-if="addEnable" type="primary" icon="plus" @click="$refs.modal.add()">{{ 'global.button.new' | i18n }}</a-button>
    </div>
    <a-table
      ref="table"
      rowKey="deptId"
      :pagination="pagination"
      :loading="loading"
      :columns="columns"
      :dataSource="data">

      <span slot="menuType" slot-scope="text">
        {{ text | menuTypeFilter }}
      </span>

      <span slot="status" slot-scope="text">
        {{ text | statusFilter }}
      </span>

      <span slot="action" slot-scope="text, record">
        <a v-if="editEnabel" @click="handleEdit(record)">{{ 'global.button.edit' | i18n }}</a>
        <a-divider v-if="addEnable" type="vertical" />
        <a v-if="addEnable" @click="handleAdd(record.deptId+'')">{{ 'global.button.new' | i18n }}</a>
        <a-divider v-if="removeEnable" type="vertical" />
        <a-popconfirm
          v-if="removeEnable"
          :title="deleteAsk"
          @confirm="delById(record.deptId)">
          <a>{{ 'global.button.delete' | i18n }}</a>
        </a-popconfirm>
      </span>
    </a-table>

    <dept-modal ref="modal" @ok="handleOk"/>
  </a-card>
</template>

<script>
import { Table as T } from 'ant-design-vue'
import { getDeptList, delDept } from '@/api/system'
import DeptModal from './modules/DeptModal.vue'
import { treeData } from '@/utils/treeutil'
import { checkPermission } from '@/utils/permissions'
export default {
  name: 'TableList',
  components: {
    T,
    DeptModal
  },
  data () {
    return {
      description: '列表使用场景：后台管理中的权限管理以及角色管理，可用于基于 RBAC 设计的角色权限控制，颗粒度细到每一个操作类型。',
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      form: null,
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      data: [],
      pagination: false,
      loading: false,
      addEnable: checkPermission('system:dept:add'),
      editEnabel: checkPermission('system:dept:edit'),
      removeEnable: checkPermission('system:dept:remove')
    }
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        '1': '停用',
        '0': '正常'
      }
      return statusMap[status]
    },
    menuTypeFilter (type) {
      const menuMap = {
        'M': '目录',
        'F': '按钮',
        'C': '菜单'
      }
      return menuMap[type]
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    handleAdd (parentId) {
      this.$refs.modal.add(parentId)
    },
    handleEdit (record) {
      this.$refs.modal.edit(record)
    },
    handleOk () {
      this.fetch()
    },
    delById (id) {
      delDept(id).then(res => {
        if (res.code === 0) {
          this.$message.success(`删除成功`)
          this.handleOk()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    fetch () {
      this.loading = true
      getDeptList(Object.assign(this.queryParam)).then(res => {
        // 如果名称索索,不去构建树结构了
        if (this.queryParam.deptName) {
            this.data = res.rows
            this.loading = false
            return
        }
        this.data = treeData(res.rows, 'deptId')
        this.loading = false
        console.log(this.data)
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
            title: this.$t('dept.deptName'),
            dataIndex: 'deptName'
          },
          {
            title: this.$t('dept.orderNum'),
            dataIndex: 'orderNum'
          },
          {
            title: this.$t('dept.status'),
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' }
          },
          // {
          //   title: '创建时间',
          //   dataIndex: 'createTime'
          // },
          {
            title: this.$t('global.action'),
            width: '180px',
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
