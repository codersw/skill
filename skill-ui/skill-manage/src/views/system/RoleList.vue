<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <PageWrapperSearch>
        <a-form-item :label="this.$t('role.roleName')">
          <a-input v-model="queryParam.roleName" :placeholder="this.$t('role.roleName')"/>
        </a-form-item>
        <a-form-item :label="this.$t('role.status')">
          <a-select v-model="queryParam.status" :placeholder="this.$t('role.status')" default-value="0">
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
      <!-- <a-button type="primary" icon="plus" @click="$refs.modal.add()">新建</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0"> -->
      <a-button v-if="addEnable" type="primary" icon="plus" @click="$refs.modal.add()">{{ 'global.button.new' | i18n }}</a-button>
      <a-dropdown v-if="removeEnable&&selectedRowKeys.length > 0">
        <!-- <a-menu slot="overlay">
          <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
          <a-menu-item key="2"><a-icon type="lock" />禁用</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作 <a-icon type="down" />
        </a-button> -->
        <!-- <a-button type="danger" icon="delete" @click="delByIds(selectedRowKeys)">{{ 'global.button.delete' | i18n }}</a-button> -->
        <a-popconfirm :title="deleteAsk" @confirm="delByIds(selectedRowKeys)">
          <a-button type="danger" icon="delete">{{ 'global.button.delete' | i18n }}</a-button>
        </a-popconfirm>
      </a-dropdown>
    </div>
    <s-table
      ref="table"
      size="default"
      rowKey="roleId"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :columns="columns"
      :data="loadData"
      defaultSort="createTime"
    >
      <!-- <div
        slot="expandedRowRender"
        slot-scope="record"
        style="margin: 0">
        <a-row
          :gutter="24"
          :style="{ marginBottom: '12px' }">
          <a-col :span="12" v-for="(role, index) in record.permissions" :key="index" :style="{ marginBottom: '12px' }">
            <a-col :lg="4" :md="24">
              <span>{{ role.permissionName }}：</span>
            </a-col>
            <a-col :lg="20" :md="24" v-if="role.actions.length > 0">
              <a-tag color="cyan" v-for="(action, k) in role.actions" :key="k">{{ action.describe }}</a-tag>
            </a-col>
            <a-col :span="20" v-else>-</a-col>
          </a-col>
        </a-row>
      </div> -->
      <span slot="status" slot-scope="text,record">
        <a-switch :checked="record.status==0" @change="onChangeStatus(record)"/>
      </span>
      <span slot="action" slot-scope="text, record">
        <a v-if="editEnabel" @click="handleEdit(record)">{{ 'global.button.edit' | i18n }}</a>
        <!-- <a-divider v-if="editEnabel" type="vertical" />
        <a v-if="editEnabel" @click="handleScope(record)">{{ 'global.button.permission.data' | i18n }}</a> -->
        <a-divider v-if="removeEnable" type="vertical" />
        <!-- <a v-if="removeEnable" @click="delByIds([record.roleId])">{{ 'global.button.delete' | i18n }}</a> -->
        <a-popconfirm
          v-if="removeEnable"
          :title="deleteAsk"
          @confirm="delByIds([record.roleId])">
          <a>{{ 'global.button.delete' | i18n }}</a>
        </a-popconfirm>
      </span>
    </s-table>
    <role-modal ref="modal" @ok="handleOk" />
    <role-scope-modal ref="scopemodal" @ok="handleOk" />
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { getRoleList, delRole, changRoleStatus } from '@/api/system'
import RoleModal from './modules/RoleModal.vue'
import RoleScopeModal from './modules/RoleScopeModal.vue'
import pick from 'lodash.pick'
import { checkPermission } from '@/utils/permissions'
export default {
  name: 'TableList',
  components: {
    STable,
    RoleModal,
    RoleScopeModal
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
      form: this.$form.createForm(this),
      mdl: {},
      permissions: [],
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},

      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getRoleList(Object.assign(parameter, this.queryParam))
      },
      selectedRowKeys: [],
      selectedRows: [],
      addEnable: checkPermission('system:role:add'),
      editEnabel: checkPermission('system:role:edit'),
      removeEnable: checkPermission('system:role:remove')
    }
  },
  created () {
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    handleAdd (parentId) {
      this.$refs.modal.add(parentId)
    },
    handleEdit (record) {
      this.$refs.modal.edit(record)
    },
    handleScope (record) {
      this.$refs.scopemodal.edit(record)
    },
    onChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleOk () {
      this.$refs.table.refresh(true)
      console.log('handleSaveOk')
    },
    delByIds (ids) {
      delRole({ ids: ids.join(',') }).then(res => {
        if (res.code === 0) {
          this.$message.success(`删除成功`)
          this.handleOk()
        } else {
          this.$message.error(res.msg)
        }
        // const difference = new Set(this.selectedRowKeys.filter(x => !new Set(ids).has(x)))
        // this.selectedRowKeys = Array.from(difference)
        this.selectedRowKeys = []
      })
    },
    onChangeStatus (record) {
      record.status = record.status === '0' ? '1' : '0'
      changRoleStatus(pick(record, 'roleId', 'status'))
      // 发送状态到服务器
    }
  },
  computed: {
    deleteAsk () {
      return this.$t('global.message.delete.ask')
    },
    // 表头
    columns () {
      return [
        // {
        //   title: '角色编号',
        //   dataIndex: 'roleId'
        // },
        {
          title: this.$t('role.roleName'),
          dataIndex: 'roleName'
        },
        {
          title: this.$t('role.roleKey'),
          dataIndex: 'roleKey'
        },
        {
          title: this.$t('role.roleSort'),
          dataIndex: 'roleSort'
        },
        {
          title: this.$t('role.list.status'),
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: this.$t('role.createTime'),
          dataIndex: 'createTime',
          sorter: true
        }, {
          title: this.$t('global.action'),
          width: '160px',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  watch: {
  }
}
</script>
