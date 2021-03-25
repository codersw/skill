<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <PageWrapperSearch>
        <a-form-item :label="'app.system.table.route' | i18n">
          <a-input v-model="queryParam.menuKey" :placeholder="'global.form.placeholder.input' | i18n"/>
        </a-form-item>
        <a-form-item :label="'app.system.table.permissionName' | i18n">
          <a-input v-model="queryParam.menuName" :placeholder="'global.form.placeholder.input' | i18n"/>
        </a-form-item>
        <a-form-item :label="'global.form.status' | i18n">
          <a-select v-model="queryParam.visible" :placeholder="'global.form.placeholder.select' | i18n">
            <a-select-option value="">{{ 'app.system.table.all' | i18n }}</a-select-option>
            <a-select-option value="0">{{ 'app.system.table.show' | i18n }}</a-select-option>
            <a-select-option value="1">{{ 'app.system.table.hide' | i18n }}</a-select-option>
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
      rowKey="menuId"
      :pagination="pagination"
      :loading="loading"
      :columns="columns"
      :dataSource="data">

      <span slot="menuType" slot-scope="text">
        {{ text | menuTypeFilter | i18n }}
      </span>

      <span slot="visible" slot-scope="text">
        {{ text | statusFilter | i18n }}
      </span>

      <span slot="action" slot-scope="text, record">
        <a v-if="editEnabel" @click="handleEdit(record)">{{ 'global.button.edit' | i18n }}</a>
        <a-divider v-if="addEnable" type="vertical" />
        <a v-if="addEnable" @click="handleAdd(record.menuId+'')">{{ 'global.button.new' | i18n }}</a>
        <a-divider v-if="removeEnable" type="vertical" />
        <a-popconfirm
          v-if="removeEnable"
          :title="deleteAsk"
          @confirm="delById(record.menuId)">
          <a>{{ 'global.button.delete' | i18n }}</a>
        </a-popconfirm>
      </span>
    </a-table>

    <permission-modal ref="modal" @ok="handleOk" />
  </a-card>
</template>

<script>
import { Table as T } from 'ant-design-vue'
import { getPermissions, delPerm } from '@/api/system'
import PermissionModal from './modules/PermissionModal.vue'
import { treeData } from '@/utils/treeutil'
import { checkPermission } from '@/utils/permissions'
import { i18nRender } from '@/locales'
export default {
  name: 'TableList',
  components: {
    T,
    PermissionModal
  },
  data () {
    return {
      description: '菜单管理，只有menuKey(唯一)不为空才生效',
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
      addEnable: checkPermission('system:menu:add'),
      editEnabel: checkPermission('system:menu:edit'),
      removeEnable: checkPermission('system:menu:remove')
    }
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        '1': 'app.system.table.hide',
        '0': 'app.system.table.show'
      }
      return statusMap[status]
    },
    menuTypeFilter (type) {
      const menuMap = {
        'M': 'app.system.table.catalogue',
        'F': 'app.system.table.button',
        'C': 'app.system.table.menu'
      }
      return menuMap[type]
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
          title: this.$t('app.system.table.permissionName'),
          dataIndex: 'menuName',
          customRender: (text) => this.$t(text)
        },
        {
          title: this.$t('app.system.table.route'),
          dataIndex: 'menuKey'
        },
        {
          title: this.$t('app.system.table.widget'),
          dataIndex: 'component',
          width: '160px'
        },
        {
          title: this.$t('app.system.table.sort'),
          dataIndex: 'orderNum'
        },
        {
          title: this.$t('app.system.table.buttontype'),
          dataIndex: 'menuType',
          scopedSlots: { customRender: 'menuType' }
        },
        {
          title: this.$t('app.system.table.link'),
          dataIndex: 'path'
        },
        {
          title: this.$t('app.system.table.redirect'),
          dataIndex: 'redirect'
        },
        {
          title: this.$t('app.system.table.permissionIdentification'),
          dataIndex: 'perms'
        },
        {
          title: this.$t('app.system.table.status'),
          dataIndex: 'visible',
          scopedSlots: { customRender: 'visible' }
        },
        {
          title: this.$t('app.system.table.action'),
          width: '180px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
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
      // this.$refs.table.refresh()
      this.fetch()
      console.log('handleSaveOk')
    },
    delById (id) {
      delPerm(id).then(res => {
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
      getPermissions(Object.assign(this.queryParam)).then(res => {
        console.log(res, '==========')
        // 如果名称索索,不去构建树结构了
        // if (this.queryParam.menuKey || this.queryParam.menuName) {
        //     this.data = res.rows
        //     this.loading = false
        //     return
        // }
        this.data = treeData(res.rows, 'menuId')
        this.loading = false
      })
    }
  },
  watch: {
  }
}
</script>
